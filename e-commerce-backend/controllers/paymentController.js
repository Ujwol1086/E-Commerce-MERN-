import request from "request";
import jwt from "jsonwebtoken";
import Order from "../models/OrderModel.js";
import OrderItem from "../models/OrderItemModel.js";
import Product from "../models/productModel.js";
import UserToken from "../models/usertokenModel.js";

export const initializePayment = async (req, res) =>
{
    try
    {
        const tokenHeader = req.headers.authorization;
        if (!tokenHeader)
        {
            return res.status(401).json({ message: "No authorization header found" });
        }

        const token = tokenHeader.split(" ")[1];
        const isTokenExists = await UserToken.findOne({ jwt: token });
        if (!isTokenExists)
        {
            return res.status(401).json({ message: "Access Denied. Please login." });
        }

        const decoded = jwt.verify(token, process.env.JWT);
        const user = await UserToken.findOne({ user: decoded.id });
        if (!user)
        {
            return res.status(404).json({ message: "User not found" });
        }

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

        for (const item of items)
        {
            const product = await Product.findById(item.product);
            if (!product)
            {
                return res.status(404).json({ message: "Product not found" });
            }
            totalAmount += product.price * item.quantity;

            const orderItemDoc = new OrderItem({
                product: [item.product],
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
            await orderItemDoc.save();
        }

        totalAmount *= 100;

        const newOrder = new Order({
            user: decoded.id,
            paymentStatus: "pending",
            purchase_order_id: `Order-${Date.now()}`,
            payment_token: "",
        });
        await newOrder.save();

        const payload = {
            return_url: "http://localhost:3000/payment/verify",
            website_url: "http://localhost:3000",
            amount: totalAmount,
            purchase_order_id: newOrder.purchase_order_id,
            purchase_order_name: `Order-${newOrder._id}`,
            customer_info: {
                name: `${firstName} ${lastName}`,
                email,
                phone,
            },
        };

        const options = {
            method: "POST",
            url: "https://a.khalti.com/api/v2/epayment/initiate/",
            headers: {
                Authorization: `Key ${process.env.KHALTI_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        };

        request(options, async (error, response) =>
        {
            if (error)
            {
                console.error("Khalti API error:", error);
                return res.status(400).json({ message: error.message });
            }

            if (response.statusCode === 200)
            {
                const responseData = JSON.parse(response.body);

                newOrder.payment_token = responseData.pidx;
                await newOrder.save();

                return res.status(200).json({
                    pidx: responseData.pidx,
                    payment_url: responseData.payment_url,
                    message: "Pyament successful",
                });
            } else
            {
                return res.status(response.statusCode).json({ message: response.body });
            }
        });
    } catch (e)
    {
        console.error(e);
        return res.status(400).json({ message: e.message });
    }
};

export const verifyPayment = async (req, res) =>
{
    try
    {
        const { pidx } = req.query;
        if (!pidx)
        {
            return res
                .status(400)
                .json({ message: "pidx is required for verification." });
        }

        const order = await Order.findOne({ payment_token: pidx });
        if (!order)
        {
            return res
                .status(404)
                .json({ message: "Order not found with given pidx." });
        }

        const options = {
            method: "POST",
            url: "https://a.khalti.com/api/v2/epayment/lookup/",
            headers: {
                Authorization: `Key ${process.env.KHALTI_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ pidx }),
        };

        request(options, async (error, response) =>
        {
            if (error)
            {
                console.error("Khalti verification error:", error);
                return res.status(400).json({ message: error.message });
            }

            if (response.statusCode === 200)
            {
                const responseData = JSON.parse(response.body);

                if (
                    responseData.data &&
                    responseData.data.status &&
                    responseData.data.status.toLowerCase() === "completed"
                )
                {
                    order.paymentStatus = "completed";
                    await order.save();

                    return res.status(200).json({
                        message: "Payment verified successfully",
                        khaltiResponse: responseData.data,
                    });
                } else
                {
                    return res.status(200).json({
                        message: responseData.data,
                        khaltiResponse: responseData.data,
                    });
                }
            } else
            {
                return res.status(response.statusCode).json({ message: response.body });
            }
        });
    } catch (e)
    {
        return res.status(400).json({ message: e.message });
    }
};