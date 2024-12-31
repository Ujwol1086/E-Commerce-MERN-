// implement the khalti api in this
import axios from "axios";
import Order from "../models/OrderModel.js";
import orderItem from "../models/OrderItemModel.js";
import Product from "../models/productModel.js";
import jwt from "jsonwebtoken";
import UserToken from "../models/usertokenModel.js";
export const initializePayment = async (req, res) =>
{
    const token = req.headers.authorization.split(" ")[1];
    const isTokenExists = await UserToken.findOne({ jwt: token });
    if (!isTokenExists)
    {
        return res.status(401).json({ message: "Access Denied please login" });
    }
    const decoded = jwt.verify(token, process.env.JWT);
    const user = await UserToken.findOne({ user: decoded.id });
    if (!user)
    {
        return res.status(404).json({ message: "User not found" });
    }
    console.log(decoded.id);
    try
    {
        const {
            items,
            firstName,
            lastName,
            email,
            shippingAddress,
            city,
            phone,
            zipcode,
        } = req.body;

        let totalAmount = 0;
        const orderItems = [];

        for (const item of items)
        {
            const product = await Product.findById(item.product);
            if (!product)
            {
                return res.status(404).json({ message: "Product not found" });
            }

            totalAmount += product.price * item.quantity;

            const orderitem = new orderItem({
                product: item.product,
                firstName,
                lastName,
                email,
                shippingAddress,
                city,
                phone,
                zipcode,
                quantity: item.quantity,
                user: decoded.id,
            });
            await orderitem.save();
            orderItems.push(orderitem._id);
        }
        totalAmount *= 100;

        const neworder = new Order({
            user: decoded.id,
            paymentStatus: "pending",
            purchase_order_id: `Order-${new Date().getTime()}`,
            payment_token: "",
        });

        await neworder.save();

        const payload = {
            return_url: "http://localhost:3000/payment/verify",
            website_url: "http://localhost:3000",
            amount: totalAmount,
            purchase_order_id: neworder.purchase_order_id,
            purchase_order_name: `Order-${neworder._id}`,
            customer_info: {
                name: `${firstName} ${lastName}`,
                email: email,
                phone: phone,
            },
        };

        const header = {
            Authorization: `Key ${process.env.KHALTI_KEY}`,
            "Content-Type": "application/json",
        };

        // Khalti payment gateway
        const response = await axios.post(
            "https://a.khalti.com/api/v2/payment/initialize/",
            payload,
            { headers: header }
        );

        if (response.status === 200)
        {
            const responseData = response.data;
            neworder.payment_token = responseData.token;
            await neworder.save();
            return res.status(200).json({ token: response.data.token });
        }
        return res.status(response.status).json({ message: response.data });
    } catch (e)
    {
        res.status(400).json({ message: e.message });
    }
};

export const verifyPayment = async (req, res) =>
{
    try
    {
        const { pxid } = req.query;
        if (!pxid)
        {
            return res.status(400).json({ message: "Payment token is required" });
        }

        const payload = {
            pxid,
        };

        const header = {
            Authorization: `Key ${process.env.KHALTI_KEY}`,
            "Content-Type": "application/json",
        };
        const response = await axios.post(
            "https://a.khalti.com/api/v2/payment/verify/",
            payload,
            { headers: header }
        );
        if (response.status === 200)
        {
            const responseData = response.data;
            const order = await Order.findOne({ payment_token: pxid });
            if (!order)
            {
                return res.status(404).json({ message: "Order not found" });
            }
            order.paymentStatus = "completed";
            await order.save();
        }
        return res.status(response.status).json({ message: response.data });
    } catch (e)
    {
        res.status(400).json({ message: e.message });
    }
};