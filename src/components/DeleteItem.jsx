import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, deleteItem } from '../redux/items/apiItem';
import { setIsDelete } from '../redux/items/itemSlice';
import '../styles/deleteItem.css';
import Spinner from './Spinner';

const DeleteItem = () => {
  const { isLoading, items, isDelete } = useSelector((state) => state.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems());
    if (isDelete) {
      dispatch(setIsDelete());
    }
  }, [dispatch, isDelete]);

  const handleDelete = (itemId) => {
    dispatch(deleteItem(itemId));
  };

  return (
    <>
      {isLoading
        ? (
          <div className="deleteItemContent">
            <div className="div-list">
              <Spinner />
            </div>
          </div>
        )
        : (
          <div className="deleteItemContent d-flex flex-column justify-content-center align-items-center w-100">
            <div className="div-list d-flex flex-column justify-content-center align-items-center gap-2 w-50">
              {items.map((item) => (
                <div key={item.id} className="item d-flex justify-content-between align-items-center w-75">
                  <span>{item.name}</span>
                  <button type="submit" onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}
    </>
  );
};

export default DeleteItem;
