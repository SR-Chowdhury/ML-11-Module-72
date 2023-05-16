import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Product = (props) => {
    // console.log(props);
    const { id, name, img, price, seller, ratings } = props.product;
    const handleAddToCart = props.handleAddToCart;

    return (
        <div className="single-product h-100">
            <div className="product-image">
                <img src={img} alt="Product Image" />
            </div>
            <div className="product-info">
                <h2 className="product-title">{name}</h2>
                <h4 className="product-price">Price: ${price}</h4>
                <h5 className='product-manufacturer'>Manufacturer: {seller}</h5>
                <h5 className='product-rating'>Rating: {ratings} star</h5>
            </div>
            <button onClick={ () => handleAddToCart(props.product)} className='add-to-cart'>Add to cart <FontAwesomeIcon icon={faShoppingCart} /></button>
        </div>
    );
};



export default Product;