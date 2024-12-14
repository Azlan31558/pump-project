// Import required modules
const express = require("express");
const app = express();
app.use(express.json());

// Example in-memory database
let orders = [];

// Place a new order
app.post("/api/orders", (req, res) => {
    const { userId, fuelType, quantity, address } = req.body;

    if (!userId || !fuelType || !quantity || !address) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    const order = {
        orderId: orders.length + 1,
        userId,
        fuelType,
        quantity,
        address,
        status: "Pending",
    };
    orders.push(order);
    res.status(201).json({ message: "Order placed successfully!", order });
});

// Get order details
app.get("/api/orders/:orderId", (req, res) => {
    const orderId = parseInt(req.params.orderId);
    const order = orders.find((o) => o.orderId === orderId);

    if (!order) {
        return res.status(404).json({ error: "Order not found!" });
    }

    res.json(order);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
