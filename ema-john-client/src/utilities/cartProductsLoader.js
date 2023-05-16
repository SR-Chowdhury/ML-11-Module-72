import { getShoppingCart } from "./addToLocalStorage";

const cartProductsLoader = async () => {

    // [updated] Step 1: Fetch data from Local Storage 
    const localCart = getShoppingCart();
    // console.log('localCart: ', Object.keys(localCart));

    // [updated] Step 2: Fetch API data
    const loadedProducts = await fetch('http://localhost:5000/productsByIds', {
        method: 'POST',
        headers: {
            'content-type' : 'application/json',
        },
        body: JSON.stringify(Object.keys(localCart))
    });
    // console.log('loaded products: ', loadedProducts);

    const products = await loadedProducts.json();

    console.log('products on client', products);

    const savedCart = [];

    // Step 2-1: Find the id form local Storage
    for (const id in localCart) {

        // Step 2-2: Find particular product from products [] / state using localCart's id
        const addedProduct = products.find(product => product._id === id);

        // Step 2-3: Set quantity to the addedProduct []
        if (addedProduct) {
            const quantity = localCart[id];
            addedProduct.quantity = quantity;

            // Step 2-4: add the addedProduct to our savedCart Array
            savedCart.push(addedProduct);
        } 
    }

    // console.log(localCart);
    return savedCart;

    /**
     * N>B> if we want to return two things at a time we have two options:
     * 1) return [savedCart, products]
     * 2) return {savedCart, products}
     */
}

export default cartProductsLoader;