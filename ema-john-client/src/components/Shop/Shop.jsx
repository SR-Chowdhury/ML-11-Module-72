import React, { useEffect, useState } from 'react';
import { addToLocalStorage, clearLocalStorage, getShoppingCart } from '../../utilities/addToLocalStorage';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';

import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('./products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.log(err))
    }
        , []);

    useEffect(() => {
        // console.log(products);
        const localCart = getShoppingCart();
        // console.log(localCart);
        const savedCart = [];

        // Step 1: Find the id form local Storage
        for (const id in localCart) {
            // Step 2: Find particular product from products [] / state using id
            const addedProduct = products.find(product => product.id === id);

            // Step 3: Set quantity to the addedProduct []
            if (addedProduct) {
                const quantity = localCart[id];
                addedProduct.quantity = quantity;

                // Step 4: add the addedProduct to our savedCart Array
                savedCart.push(addedProduct);
            }

            // Step 5: Finally, Change the cart state 
            setCart(savedCart);

            // console.log('added product, ', addedProduct);

        }

    }
        , [products]);

    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        addToLocalStorage(product.id);
    }

    const handleClearCart = () => {
        setCart([]);
        clearLocalStorage();
    }

    return (
        <div className='shopContainer'>
            <div className="productsContainer">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    />)
                }
            </div>
            <div className="cartContainer">
                <Cart cart={cart} handleClearCart={handleClearCart}>
                    <Link to={'/orders'}>
                        <div>
                            <button className='review-cart-btn'>Review Order</button>
                        </div>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;