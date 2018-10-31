import React, {Component} from 'react';
import './product.css';
 
class Product extends Component{
	render(){
		return(
		<div className="card">
		<img className="img-card-top" atl="Product"></img>
			
		<div className="card-block">
			<h4 className="card-title"></h4>
			<p className="card-text">Price: $</p>
			<a href="#" button="btn btn-primary">Add to wishlist</a>
			</div>
		</div>
			);
	}
}

export default Product;
