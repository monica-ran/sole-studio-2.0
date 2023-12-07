
//app.js

const express = require('express');
const bodyParser = require('body-parser');
const orders = require('./orders');

const app = express();

app.use(bodyParser.json());

app.get('/orders', (req, res) => {
    res.json(orders.getAllOrders());
});

app.get('/orders/:id', (req, res) => {
    const order = orders.getSingleOrder(req.params.id);
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
});

app.post('/orders', (req, res) => {
    const order = orders.postOrder(req.body);
    res.status(201).json(order);
});

app.patch('/orders/:id', (req, res) => {
    const order = orders.patchOrder(req.params.id, req.body);
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
});

app.delete('/orders/:id', (req, res) => {
    const order = orders.getOrder(req.params.id);
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }

    const index = orders.indexOf(order);
    orders.splice(index, 1);

    res.status(204).end();
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));