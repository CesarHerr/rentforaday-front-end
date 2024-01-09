import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import { postReserve } from '../redux/reserves/apiReserves';
import { fetchItems } from '../redux/items/apiItem';
import {
  setSelectedItem, setSelectedCity, setSelectedDate, setIsReserved, setStatus,
} from '../redux/reserves/reserveSlice';
import { setItemDetail } from '../redux/items/itemSlice';
import '../styles/addReserve.css';

const AddReserve = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let showSelect;
  let itemContent;

  const {
    isLoading, selectedItem, selectedCity, selectedDate, status,
    itemId, isReserved,
  } = useSelector((state) => state.reserves);

  const { items, itemsByCity, itemDetail } = useSelector((state) => state.items);

  // get item city by id
  const itemCity = itemId ? items.find((item) => item.id === itemId)?.city : null;

  // options select city, save city state, reset isReserved state
  const handleSelectCity = (event) => {
    dispatch(setSelectedCity(event.target.value));
  };

  // options select item, save item state, set item details by id, reset isReserved state
  const handleSelectItem = (event) => {
    const selectedItemID = Number(event.target.value);
    const selectedItemDetail = items.find((item) => item.id === selectedItemID);
    dispatch(setSelectedItem(selectedItemID));
    dispatch(setItemDetail(selectedItemDetail));
  };

  // options select date, save date state, reset status state
  const handleSelectedDate = (event) => {
    dispatch(setSelectedDate(event.target.value));
    dispatch(setStatus());
  };

  // post reserve
  const handleSubmit = () => {
    dispatch(postReserve({
      item_id: itemId ?? selectedItem,
      date: selectedDate,
      city: itemCity ?? selectedCity,
    }));
  };

  useEffect(() => {
    if (isReserved) {
      navigate('/rentforaday-front-end/reservation_list');
      dispatch(setIsReserved());
    }
  }, [isReserved, dispatch, navigate]);

  // fetch items and reserves
  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchItems());
    }
  }, [items.length, dispatch]);

  // show item detail if itemDetail is true,and if status and isLoading are false
  if (status) {
    itemContent = (
      <p>{status}</p>
    );
  } else if (isLoading) {
    itemContent = (<Spinner />);
  } else if (itemDetail) {
    itemContent = (
      <div className="itemContent d-flex align-items-center justify-content-center">
        <img src={itemDetail.image} alt={itemDetail.name} />
        <div className="text-center">
          <h2 className="fs-4 text-start w-75 mx-auto">{itemDetail.name}</h2>
          <p className="fs-6 text-start w-75 mx-auto">
            {itemDetail.description}
          </p>
          <p className="fw-bold">
            Price: $
            {itemDetail.price}
          </p>
        </div>
      </div>
    );
  } else {
    itemContent = (
      <>
        <p>Selected Reserve</p>
      </>
    );
  }

  // show select city and item if itemId is 0, else show select item
  if (itemId) {
    showSelect = (
      <input className="form-control mb-3" type="date" placeholder="Date" aria-label="date" value={selectedDate} onChange={handleSelectedDate} />
    );
  } else {
    showSelect = (
      <>
        <div className="input-group mb-3">
          <select className="form-select" id="inputGroupSelect01" value={selectedCity} onChange={handleSelectCity}>
            <option value="">Select a City</option>
            {itemsByCity.map((city) => (
              <option value={city.city} key={city.id}>{city.city}</option>
            ))}
          </select>
        </div>
        <div className="input-group mb-3">
          <select className="form-select" id="inputGroupSelect02" value={selectedItem} onChange={handleSelectItem}>
            <option value="">Select an Item</option>
            {items.filter((city) => city.city === selectedCity).map((city) => (
              <option value={city.id} key={city.id}>{city.name}</option>
            ))}
          </select>
        </div>
        <input className="input-group mb-3" type="date" placeholder="Date" aria-label="date" value={selectedDate} onChange={handleSelectedDate} />
      </>
    );
  }

  return (
    <>
      {user !== null
        ? (
          <section className="addReserve">
            <h1>Add a Reserve</h1>
            <form>
              {showSelect}

              <button className="btn " type="button" onClick={() => handleSubmit()}>Reserve Now</button>
            </form>
            <div className="item text-center">
              {itemContent}
            </div>
          </section>
        )
        : <h1 className="container-sm text-center">Sign in!! 👈</h1>}
    </>
  );
};

export default AddReserve;
