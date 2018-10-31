var express = require('express');
var router = express.Router();

//models
var Product = require('../models/product');




//routes
Product.methods(['get', 'put', 'post', 'delete']);
Product.register(router, '/products');


//return Router
module.exports = router;
