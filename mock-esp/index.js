const express = require('express');
const app = express();
const port = 80;

// Middleware to allow CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/temp', (req, res) => {
    res.json({ value: Math.random() * (30 - 20) + 20 });
});

app.get('/pressure', (req, res) => {
    res.json({ value: Math.random() * (1050 - 950) + 950 });
});

app.get('/humid', (req, res) => {
    res.json({ value: Math.random() * (60 - 40) + 40 });
});

app.get('/light', (req, res) => {
    res.json({ value: Math.random() * (2000 - 0) + 0 });
});

app.listen(port, () => {
    console.log(`Mock server listening at http://localhost:${port}`);
});
