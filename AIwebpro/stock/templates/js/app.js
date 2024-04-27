const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


const stocks = {
    AAPL: {
        price: 145.12,
        company_name: "Apple Inc.",
        exchange: "NASDAQ",
        last_updated: new Date().toISOString()
    },
    GOOGL: {
        price: 2800.50,
        company_name: "Alphabet Inc.",
        exchange: "NASDAQ",
        last_updated: new Date().toISOString()
    },
    MSFT: {
        price: 330.25,
        company_name: "Microsoft Corporation",
        exchange: "NASDAQ",
        last_updated: new Date().toISOString()
    }
};


app.get('/api/stock/:symbol', (req, res) => {
    const symbol = req.params.symbol.toUpperCase();
    const stock = stocks[symbol];

    if (stock) {
        res.json({
            stock_symbol: symbol,
            price: stock.price,
            company_name: stock.company_name,
            exchange: stock.exchange,
            last_updated: stock.last_updated
        });
    } else {
        res.status(404).json({ error: "Stock not found" });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
