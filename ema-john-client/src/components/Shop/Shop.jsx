import React, { useEffect, useState } from 'react';
import { addToLocalStorage, clearLocalStorage, getShoppingCart } from '../../utilities/addToLocalStorage';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';

import './Shop.css';
import { Link, useLoaderData } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const { totalProducts } = useLoaderData();
    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    // console.log('totalpages: ', totalPages);
    const pageNumbers = [...Array(totalPages).keys()];

    const options = [5, 10, 20];


    /**
     * Step 1: Determine the total numbers of item
     * step 2: Decide on the number of page per item
     * step 3: Calculate the total number of pages
     */

    useEffect(() => {
        fetch('http://localhost:5000/products')
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
            const addedProduct = products.find(product => product._id === id);

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
        addToLocalStorage(product._id);
    }

    const handleClearCart = () => {
        setCart([]);
        clearLocalStorage();
    }

    const handleSelectChange = event => {
        // console.log(typeof event.target.value)
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(0);
    }

    return (
        <div>
            <div className='shopContainer'>
                <div className="productsContainer">
                    {
                        products.map(product => <Product
                            key={product._id}
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
            <div className='paginationContainer'>
                <span>Current page : {currentPage} of {totalPages - 1} [Items / page: {itemsPerPage}] &nbsp; Filter: </span>
                <select onChange={handleSelectChange}>
                    {
                        options.map(option =>
                            <option 
                            key={option} 
                            value={option}
                            >
                                {option}
                            </option>)
                    }
                </select><br />

                {
                    pageNumbers.map(number =>
                        <button
                            className={currentPage === number ? 'paginationSelected btn btn-outline-warning border-0 text-lg text-white' : 'btn btn-outline-warning border-0 text-lg'}
                            key={number}
                            onClick={() => setCurrentPage(number)}
                        >
                            {number}
                        </button>)
                }

            </div>
        </div>
    );
};

export default Shop;