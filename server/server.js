const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// API Endpoint for Calculation
app.post('/calculate', (req, res) => {
    const { firstNumber, operator, secondNumber } = req.body;
    let result;

    try {
        result = eval(`${firstNumber} ${operator} ${secondNumber}`);
        res.status(200).json({ result });
    } catch (error) {
        res.status(400).json({ error: 'Invalid operation' });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
