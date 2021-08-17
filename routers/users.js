const express = require("express");
const router = express.Router();
const {User} = require('../models/user')
const bcrypt = require('bcryptjs')

router.get(`/`, async (req,res) =>{

    const usersList = await User.find()
    if(!usersList)
    return res.status(400).json({sucess:false, message :'users not found'})

    res.send(usersList);
})

router.post('/', async (req,res)=>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    })
    user = await user.save();

    if(!user)
    return res.status(400).send('the user cannot be created!')

    res.send(user);
})


module.exports = router;