const addToLocalStorage = (id) => {

    // Check whether exists or not
    let shoppingCart = getShoppingCart();

    // Add quantity in the object properties
    const quantity = shoppingCart[id];
    if (quantity) {
        const newQuantity = quantity + 1;
        shoppingCart[id] = newQuantity;
    } else {
        shoppingCart[id] = 1;
    }

    localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
}

const getShoppingCart = () => {

    let shoppingCart;
    const getShoppingCart = localStorage.getItem('shopping-cart');

    if (getShoppingCart) {
        return shoppingCart = JSON.parse(getShoppingCart);
    } else {
        return shoppingCart = {};
    }

}

const removeItemFromLocalStorage = id => {
    const shoppingCart = getShoppingCart();
    if(id in shoppingCart) {
        delete shoppingCart[id];
        localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
    }

}

const clearLocalStorage = () => {
    localStorage.removeItem('shopping-cart');
}


export {addToLocalStorage, getShoppingCart, removeItemFromLocalStorage, clearLocalStorage};