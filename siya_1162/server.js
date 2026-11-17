const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

let products = [
  { id: 301, name: 'Wireless Mouse', category: 'Electronics', price: 799, quantity: 25, inStock: true },
  { id: 302, name: 'Notebook', category: 'Stationery', price: 60, quantity: 100, inStock: true },
  { id: 303, name: 'USB Keyboard', category: 'Electronics', price: 999, quantity: 0, inStock: false },
];

app.get('/products', (req, res) => {
    res.json(products);
});

//READ product data by ID
app.get('//:id',(req,res)=>{
    const id=Number(req.params.id);

    const product=products.find(
        product=>product.id===id
    );
        
    if(!product){
        return res.status(404).json({
            message:"product not Found"
        });
    }

    res.json(product);
});