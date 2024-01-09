import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setItemId, setSelectedCity, setSelectedItem } from '../redux/reserves/reserveSlice';
import { setItemDetail } from '../redux/items/itemSlice';
import '../styles/itemDetail.css';

const ItemDetail = () => {
  const { itemId } = useParams();
  const numericItemId = parseInt(itemId, 10);
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.items);

  const item = useSelector((state) => state.items.items.find((item) => item.id === numericItemId));

  const handleItemId = () => {
    dispatch(setItemId(Number(numericItemId)));
    dispatch(setSelectedCity(item.city));
    const selectedItemDetail = items.find((item) => item.id === Number(numericItemId));
    dispatch(setSelectedItem(Number(numericItemId)));
    dispatch(setItemDetail(selectedItemDetail));
  };

  return (
    <>
      {item ? (
        <div className="itemDetail d-flex justify-content-center align-items-center">
          <img src={item.image} alt={item.name} />
          <div className="itemContent d-flex flex-column justify-content-center align-items-center">
            <h2>{item.name}</h2>
            <table className="table table-borderless">
              <tbody>
                <tr className="table-secondary">
                  <td><strong>Price:</strong></td>
                  <td>{item.price}</td>
                </tr>
                <tr>
                  <td><strong>Description:</strong></td>
                  <td>{item.description}</td>
                </tr>
                <tr className="table-secondary">
                  <td><strong>Location:</strong></td>
                  <td>{item.city}</td>
                </tr>
              </tbody>
            </table>
            <div className="itemPanel w-100 d-flex flex-row justify-content-between align-items-center">
              <Link to="/rentforaday-front-end/add_reserve" className="d-flex flex-column justify-content-center reserve-buttom" onClick={handleItemId}>Reserve</Link>
              <Link to="/rentforaday-front-end/items" className="d-flex flex-column justify-content-center back-buttom">Back to items</Link>
            </div>
          </div>
        </div>
      ) : (
        <p>Item not found</p>
      )}
    </>
  );
};

export default ItemDetail;
