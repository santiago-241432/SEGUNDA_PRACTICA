import productsc from "../DAO/controllers/products.js";
import { Router } from 'express';

const router = Router();

router.get('/', async(req, res) => {

    try {
        const limit = parseInt(req.query.limit) || 10;

        const products = productsc.slice(0, limit);
        
        res.json(products);

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

const itemsPerPage = 10;

router.get('/', async(req, res) => {

    try {
        const page = parseInt(req.query.page) || 1;
  
        const startIndex = (page - 1) * itemsPerPage;

        const endIndex = startIndex + itemsPerPage;
  
        const products = productsc.slice(startIndex, endIndex);

        res.json(products);

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/:title', async (req, res) => {
    try {
        const products = await productsc.getAll({});
        const productTitle = parseInt(req.params.title);
        const producto = products.find(products => products.title === productTitle)
        if(!producto){
            res.json(products)
        }else{
            res.json(producto)
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/', async (req, res) => {
    try {
        const sortOrder = req.query.sortOrder || 'asc';
  
         const sortedProducts = productsc.slice().sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.price - b.price;
        } else {
             return b.price - a.price;
    }
    
  });
    res.json(sortedProducts);
  
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


router.get('/:id', async (req, res) => {
    try {
        const product = await productsc.getById(req.params.id);
        res.status(200).render('product',  {products : product});
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const product = await productsc.create(req.body);
        res.json(product);
        res.redirect('/');
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


router.delete('/:id', async (req, res) => {
    try {
        const product = await productsc.delete(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})




export default router;