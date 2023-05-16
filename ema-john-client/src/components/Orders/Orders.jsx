import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Order.css';
import { clearLocalStorage, removeItemFromLocalStorage } from '../../utilities/addToLocalStorage';

const Orders = () => {

    const savedCart = useLoaderData();
    const [cart, setCart] = useState(savedCart);
    // console.log(cart);

    const handleRemoveItem = (id) => {
        // console.log(id);
        const remainingItem = cart.filter(item => item.id !== id);
        setCart(remainingItem);
        removeItemFromLocalStorage(id);
    }

    const handleClearCart = () => {
        setCart([]);
        clearLocalStorage();
    }

    return (
        <div className='shopContainer'>
            <div className="reviewContainer">
                {
                    cart.map(item => <ReviewItem
                        key={item.id}
                        item={item}
                        handleRemoveItem={handleRemoveItem}
                        handleClearCart={handleClearCart} />)
                }
            </div>
            <div className="cartContainer">
                <Cart cart={cart} handleClearCart={handleClearCart}>
                    <Link to={'/checkout'}>
                        <div>
                            <button className='review-cart-btn'>Proceed Checkout</button>
                        </div>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;