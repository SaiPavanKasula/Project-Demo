const express = require("express");
const router = express.Router();
const {Category} = require('../models/category')

//Getting category list
router.get(`/`, async (req,res) => {
    const categoryList = await Category.find()
    if(!categoryList){
        res.status(500).json({sucess :false});
    }
    res.status(200).send(categoryList);

}) 

//Getting category by ID
router.get(`/:id`,async (req,res) =>{
    const category = await Category.findById(req.params.id)
    if(!category){
        res.status(400).json({sucess : false, message: "Category Not Found"})
    }

    res.status(200).send(category);
})

//Updating a category
router.put(`/:id`, async (req,res)=> {
    const category = await Category.findByIdAndUpdate( 
        req.params.id,
        {
            name : req.body.name,
            color : req.body.color,
            icon : req.body.icon
        },
        {
            new:true
        }
    )
    if(!category)
    return res.status(400).send('the category cannot be created!')

    res.send(category);
})

//Adding a new category
router.post('/', async (req,res)=>{
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    category = await category.save();

    if(!category)
    return res.status(400).send('the category cannot be created!')

    res.send(category);
})

//Deleting a Category
router.delete('/:id', (req,res)=>{
    Category.findByIdAndRemove(req.params.id).then(category =>{
        if(category){
            res.status(200).json({sucess:true , message : "Category Deleted"})
        }else{
            res.status(400).json({sucess:false , message : "Category Not Found"})
        }
    }).catch(e=>{
        res.status(400).json({sucess:false , error : e})
    })
})

module.exports = router;