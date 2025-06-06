import express from "express";
import orderModel from "../models/orderModel.js";

const orderRouter = express.Router();

orderRouter.post("/new", async (req, res) => {
  try {
    const { user, products, orderValue } = req.body;

    if (!user || !products || !orderValue) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newOrder = new orderModel({
      user,
      products,
      orderValue,
      status: "pending",
    });

    const savedOrder = await newOrder.save();
    return res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

export default orderRouter;
