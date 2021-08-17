const express = require("express")
const app = express();
const morgan = require("morgan");
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.options('*',cors());


//middleware
app.use(express.json())
app.use(morgan('tiny'))

//routes
const productRoutes = require('./routers/products')
const orderRoutes = require('./routers/orders')
const userRoutes = require('./routers/users')
const categoryRoutes = require('./routers/categories')

const api = process.env.API_URL;

app.use(`${api}/products` , productRoutes)
app.use(`${api}/orders` , orderRoutes)
app.use(`${api}/users` , userRoutes)
app.use(`${api}/categories` , categoryRoutes)

//database connection
mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true})
.then(() =>{
    console.log("Database Connected")
})
.catch((e) =>{
    console.log("Database not connected",e)
})

//server
app.listen(3000 , ()=>{
    console.log("server is rinning http://localhost:3000")
})

