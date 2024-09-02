const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

// Add order
router.post("/add", async (req, res) => {
  const { cartItems, total, email } = req.body;

  if (!cartItems || !total || !email) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newOrder = new Order({
      cartItems,
      total,
      email,
    });

    await newOrder.save();

    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
    console.error("Order created successfully at backend.");
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders." });
  }
});

module.exports = router;
