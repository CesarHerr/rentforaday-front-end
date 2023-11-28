import { useSelector, useDispatch } from 'react-redux';
import Spinner from './Spinner';
import { postItem } from '../redux/items/itemSlice';
import '../styles/AddItem.css';

function AddItem() {
  const { isLoading, message } = useSelector((state) => state.item);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    formData.append('item[name]', form.name.value);
    formData.append('item[city]', form.city.value);
    formData.append('item[description]', form.description.value);
    formData.append('item[price]', form.price.value);
    formData.append('item[image]', form.image.value);
    dispatch(postItem(formData));
  };

  if (isLoading) {
    return (
      <div className="container text-center d-flex justify-content-center align-items-center min-vh-100">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="addItemCotent d-flex flex-column justify-content-center align-items-center">
        <h1 className="formTitle z-1 w-25">New Item</h1>
        <div className="d-flex p-3">
          <form className="div-form d-flex flex-column justify-content-center align-items-center gap-1">
            <div>
              <label htmlFor="name" className="form-label" aria-label="Name">
                <input type="text" id="name" name="name" placeholder="Name" className="form-control" />
              </label>
            </div>
            <div>
              <label htmlFor="city" className="form-label" aria-label="City">
                <input type="text" id="city" name="city" placeholder="City" className="form-control" />
              </label>
            </div>
            <div>
              <label htmlFor="description" className="form-label" aria-label="Description">
                <input type="text" id="description" name="description" placeholder="Description" className="form-control" />
              </label>
            </div>
            <div>
              <label htmlFor="price" className="form-label" aria-label="Price">
                <input type="text" id="price" name="price" placeholder="Price" className="form-control" />
              </label>
            </div>
            <div>
              <label htmlFor="image" className="form-label" aria-label="Image">
                <input type="text" id="image" name="image" placeholder="Image" className="form-control" />
              </label>
            </div>
            <button type="submit" className="btn btn-primary" onClick={() => handleSubmit()}>Add Item</button>
          </form>
        </div>
        <div className="div-message">
          {message && <p>{message}</p>}
        </div>
      </div>
    </>
  );
}

export default AddItem;
