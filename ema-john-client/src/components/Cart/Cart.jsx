import React from 'react';
import { clearLocalStorage } from '../../utilities/addToLocalStorage';
import './Cart.css';

const Cart = ({cart, handleClearCart, children}) => {
    // Option 1
    // const cart = props.cart; 

    // Option 2
    // const {cart} = props;

    // console.log(cart);
    let quantity = 0;
    let totalPrice = 0;
    let shippingCharge = 0;

    for (const product of cart) {
        product.quantity = product.quantity || 1;
        quantity = quantity + product.quantity;
        totalPrice = totalPrice + product.price * product.quantity;
        shippingCharge = shippingCharge + product.shipping * product.quantity;
    }

    const tax = totalPrice * 7 / 100;
    const grandTotal = totalPrice + shippingCharge + tax;

    return (
        <div>
            <h1 className="text-center cart-summary-heading">Order Summary</h1>
            <div className="cart-info">
                <h3>Selected Item: {quantity}</h3>
                <h3>Total Price: ${totalPrice}</h3>
                <h3>Total Shipping Charge: ${shippingCharge}</h3>
                <h3>Tax: ${tax.toFixed(2)}</h3>
                <h2>Grand Total: ${grandTotal.toFixed(2)}</h2>

                <div>
                    <button onClick={handleClearCart} className='clear-cart-btn'>Clear Cart</button>
                </div>
                {
                    children
                }
            </div>
        </div>
    );
};

export default Cart;