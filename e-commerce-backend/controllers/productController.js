import path from "path";
import Product from "./../models/productModel.js";
import fs from "fs";
import Category from "../models/categoryModel.js";
const addProduct = async (req, res) =>
{
    try
    {
        let { name, description, categoryName, quantity, price, brand, image } =
            req.body;

        if (req.file)
        {
            image = req.file.path;
        }

        const category = await Category.findOne({ name: { $regex: new RegExp(categoryName, "i") } });
        if (!category)
        {
            return res.status(404).json({ error: "Category not found" });
        }
        let newProduct = new Product({
            name,
            description,
            category,
            quantity,
            price,
            brand,
            image: image,
        });

        await newProduct.save();
        res.send(newProduct);
    } catch (e)
    {
        res.send(e.message);
    }
};
const updateProductDetails = async (req, res) =>
{
    try
    {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(product);
    } catch (error)
    {
        res.status(400).json({ message: error.message });
    }
};
const removeProduct = async (req, res) =>
{
    try
    {
        const products = await Product.deleteMany();
        res.status(202).json(products);
    } catch (e)
    {
        res.status(400).json({ message: e.message });
    }
}
const removeProductById = async (req, res) =>
{
    try
    {
        const product = await Product.findById(req.params.id);
        if (!product)
        {
            return res.status(404).json({ error: "Product not found" });
        }
        const imagePath = product.image;

        if (imagePath)
        {
            fs.unlinkSync(imagePath);
            // fs.unlink(path.resolve(imagePath), (err) =>
            // {
            //     if (err)
            //     {
            //         console.log("Error deleting image:", err);
            //     } else
            //     {
            //         console.log("Image deleted successfully");
            //     }
            // });
        }

        await Product.findByIdAndDelete(req.params.id);

        res.json(product);
    } catch (error)
    {
        res.status(400).json({ message: error.message });
    }
};
const fetchProducts = async (req, res) =>
{
    try
    {
        const product = await Product.find();
        res.json(product);
    } catch (error)
    {
        res.status(400).json({ message: error.message });
    }
};
const fetchProductById = async (req, res) =>
{
    try
    {
        const product = await Product.findById(req.params.id);
        if (product)
        {
            res.json(product);
        } else
        {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (error)
    {
        res.status(400).json({ message: error.message });
    }
};
const searchProductByTitle = async (req, res) =>
{
    const { name } = req.query;
    if (!name)
    {
        return res.status(400).json({ message: "Name is required" });
    }
    try
    {
        const products = await Product.find({
            name: { $regex: name, $options: "i" },
        });
        if (products.length == 0)
        {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(products);
    } catch (e)
    {
        res.status(400).json({ message: e.message });
    }
};
const getProductsByCategory = async (req, res) =>
{
    try
    {
        const products = await Product.find({ category: req.params.category });
        res.status(200).json(products);
    } catch (error)
    {
        res.status(400).json({ message: error.message });
    }
};
export
{
    addProduct,
    updateProductDetails,
    removeProduct,
    fetchProducts,
    fetchProductById,
    searchProductByTitle,
    getProductsByCategory,
    removeProductById
}