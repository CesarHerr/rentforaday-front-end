import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import { setFormData, setIsAdded } from '../redux/items/itemSlice';
import { postItem } from '../redux/items/apiItem';
import '../styles/AddItem.css';

function AddItem() {
  const {
    isLoading, error, formData, isAdded,
  } = useSelector((state) => state.items);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(setFormData({ ...formData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postItem(formData));
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isAdded) {
      navigate('/rentforaday-front-end/items');
      dispatch(setIsAdded());
    }
  }, [isAdded, navigate, dispatch]);

  if (isLoading) {
    return (
      <div className="deleteItemContent">
        <div className="div-list">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="addItemCotent d-flex flex-column justify-content-center align-items-center">
        <h1 className="formTitle z-1 w-25">Add a house to rent</h1>
        <div className="d-flex p-3">
          <form className="div-form d-flex flex-column justify-content-center align-items-center gap-1">
            <div>
              <label htmlFor="name" className="form-label" aria-label="Name">
                <input type="text" id="name" name="name" placeholder="Name" className="form-control" onChange={handleChange} />
              </label>
            </div>
            <div>
              <label htmlFor="city" className="form-label" aria-label="City">
                <input type="text" id="city" name="city" placeholder="City" className="form-control" onChange={handleChange} />
              </label>
            </div>
            <div>
              <label htmlFor="description" className="form-label" aria-label="Description">
                <input type="text" id="description" name="description" placeholder="Description" className="form-control" onChange={handleChange} />
              </label>
            </div>
            <div>
              <label htmlFor="price" className="form-label" aria-label="Price">
                <input type="text" id="price" name="price" placeholder="Price" className="form-control" onChange={handleChange} />
              </label>
            </div>
            <div>
              <label htmlFor="image" className="form-label" aria-label="Image">
                <input type="text" id="image" name="image" placeholder="http://image.com" className="form-control" onChange={handleChange} />
              </label>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Add Item</button>
          </form>
        </div>
        <div className="div-message">
          {error && <p>{error}</p>}
        </div>
      </div>
    </>
  );
}

export default AddItem;
