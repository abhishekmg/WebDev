var restful = require('node-restful');
var mongoose = restful.mongoose;

//schema

var productSchema = new mongoose.Schema({
    name: String,
    sku: String,
    price: Number
});

//modele

module.exports = restful.model('Product', productSchema);
