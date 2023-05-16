import React from 'react';
import './ReviewItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ReviewItem = ({ item, handleRemoveItem }) => {
    return (
        <div className='reviewItemContainer'>
            <div className="itemImg">
                <img src={item.img} alt="" />
            </div>
            <div className="itemInfo">
                <h1>{item.name}</h1>
                <h2>Price: <span>${item.price}</span></h2>
                <h2>Shipping Charge: <span>${item.shipping}</span></h2>
                <h2>Item Quantity: <span>{item.quantity > 1 ? item.quantity+' pices': item.quantity+' pice'}</span></h2>
            </div>
            <button onClick={() => handleRemoveItem(item.id)} className='deleteItemBtn'>
                <FontAwesomeIcon className='trashIcon' icon={faTrashAlt} />
            </button>
        </div>
    );
};

export default ReviewItem;