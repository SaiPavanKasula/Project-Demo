const express = require("express");
const { Category } = require("../models/category");
const router = express.Router();
const {Product} = require("../models/product")
const mongoose =  require('mongoose')

//Getting Products list by category
router.get(`/`, async (req,res) => {

    let filter = {}
    if(req.query.categories)
    {
        filter = {category: req.query.categories.split(',')}
    }
    const productList = await Product.find(filter).populate('category')

    if(!productList)
    return res.status(400).json({sucess : false })
    res.send(productList)
})



//getting a product using id
router.get(`/:id`, async (req,res) => {
    const product = await Product.findById(req.params.id)

    if(!product)
    return res.status(400).json({sucess : false })
    
    res.send(product)
})

// Adding new product with category
router.post(`/`, async (req,res) =>{

    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send("Invalid Category")

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    })

    product = await product.save();

    if(!product)
    return res.status(400).json({sucess:false , message:"Product not Created"})
    
    res.send(product);
})

//Updating a product
router.put(`/:id`, async (req,res)=> {
    if(!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send('Invalid Product ID')

    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send("Invalid Category")

    const product = await Product.findByIdAndUpdate( 
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        },
        {
            new:true
        }
    )
    if(!product)
    return res.status(400).send('the product cannot be updated!')

    res.send(product);
})

//Deleteing a Product
router.delete('/:id', (req,res)=>{
    Product.findByIdAndRemove(req.params.id).then(product =>{
        if(product){
            res.status(200).json({sucess:true , message : "product Deleted"})
        }else{
            res.status(400).json({sucess:false , message : "product Not Found"})
        }
    }).catch(e=>{
        res.status(400).json({sucess:false , error : e})
    })
})

//Count of Product
router.get(`/get/count`, async (req,res) => {
    const productCount = await Product.countDocuments((count) => count)

    if(!productCount)
    return res.status(400).json({sucess : false })
    
    res.send({
        productCount: productCount
    })
})

//Getting Featured Product
router.get(`/get/featured/:count`, async (req,res) => {
    const count = req.params.count ? req.params.count: 0;
    const products = await Product.find({isFeatured : true}).limit(+count);

    if(!products)
    return res.status(400).json({sucess : false })
    
    res.send(products)
})

module.exports = router;