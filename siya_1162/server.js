const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

let products = [
    {
        id: 301,
        name: 'Wireless Mouse',
        category: 'Electronics',
        price: 799,
        quantity: 25,
        inStock: true
    },
    {
        id: 302,
        name: 'Notebook',
        category: 'Stationery',
        price: 60,
        quantity: 100,
        inStock: true
    },
    {
        id: 303,
        name: 'USB Keyboard',
        category: 'Electronics',
        price: 999,
        quantity: 0,
        inStock: false
    },
];


let nextId = 304;

function isValidProduct(body) {
    return (
        body &&
        typeof body.name === 'string' && body.name.trim() !== '' &&
        typeof body.category === 'string' && body.category.trim() !== '' &&
        typeof body.price === 'number' && !isNaN(body.price) &&
        typeof body.quantity === 'number' && !isNaN(body.quantity) &&
        typeof body.inStock === 'boolean'
    );
}


// READ all products
app.get('/api/products', (req, res) => {
    res.status(200).json(products);
});


// FILTER products by category (must be above /:id route)
app.get('/api/products/filter', (req, res) => {
    const category = req.query.category;

    if (!category) {
        return res.status(400).json({
            message: "category query parameter is required"
        });
    }

    const filtered = products.filter(
        product => product.category.toLowerCase() === category.toLowerCase()
    );

    
    res.status(200).json(filtered);
});


// READ product by ID
app.get('/api/products/:id', (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(
        product => product.id === id
    );

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.status(200).json(product);
});


// CREATE add product
app.post('/api/products', (req, res) => {
    if (!isValidProduct(req.body)) {
        return res.status(400).json({
            message: "Invalid input. name & category must be strings, price & quantity must be numbers, inStock must be boolean"
        });
    }

    const newProduct = {
        id: nextId++,
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        quantity: req.body.quantity,
        inStock: req.body.inStock
    };

    products.push(newProduct);

    res.status(201).json(newProduct);
});


// UPDATE product
app.put('/api/products/:id', (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(
        product => product.id === id
    );

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    if (!isValidProduct(req.body)) {
        return res.status(400).json({
            message: "Invalid input. name & category must be strings, price & quantity must be numbers, inStock must be boolean"
        });
    }

    product.name = req.body.name;
    product.category = req.body.category;
    product.price = req.body.price;
    product.quantity = req.body.quantity;
    product.inStock = req.body.inStock;

    res.status(200).json(product);
});


// DELETE product
app.delete('/api/products/:id', (req, res) => {
    const id = Number(req.params.id);

    const productIndex = products.findIndex(
        product => product.id === id
    );

    if (productIndex === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const deletedProduct = products.splice(productIndex, 1);

    res.status(200).json({
        message: "Product deleted successfully",
        product: deletedProduct[0]
    });
});


app.listen(PORT, () => {
    console.log(
        `Server running on http://localhost:${PORT}`
    );
});