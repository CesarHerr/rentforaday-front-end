import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { fetchReserves, deleteReserve } from '../redux/reserves/apiReserves';
import { fetchItems } from '../redux/items/apiItem';
import { setIsDeleting } from '../redux/reserves/reserveSlice';
import icons from '../assets/icons';
import Spinner from './Spinner';
import '../styles/reservationList.css';
import 'swiper/css';
import 'swiper/css/pagination';

const ReservationsList = () => {
  const dispatch = useDispatch();
  const {
    reserves, isDeleting, isLoading,
  } = useSelector((state) => state.reserves);
  const { items } = useSelector((state) => state.items);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  let reserveContent;

  useEffect(() => {
    dispatch(fetchReserves());
    if (isDeleting) {
      dispatch(setIsDeleting());
    }
  }, [dispatch, isDeleting]);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchItems());
    }
  }, [dispatch, items.length]);

  const handleClick = (reserveId) => {
    dispatch(deleteReserve(reserveId));
  };

  const handleBack = () => {
    navigate(-1);
  };

  const itemName = (itemId) => {
    const item = items.find((item) => item.id === itemId);
    return item ? item.name : 'Unknown';
  };

  const itemImage = (itemId) => {
    const item = items.find((item) => item.id === itemId);
    return item ? item.image : 'Unknown';
  };

  if (isLoading) {
    reserveContent = (
      <div className="container text-center d-flex justify-content-center align-items-center min-vh-100">
        <Spinner />
      </div>
    );
  } else if (user !== null) {
    if (reserves.length > 0) {
      reserveContent = (
        <>
          <div className="myTitle d-flex flex-column align-items-center justify-content-center position-absolute start-50 translate-middle-x">
            <h1 className="text-center container">My Reservations</h1>
            <p>............</p>
          </div>
          <section className="reserves d-flex align-items-center min-vh-100">
            <img className="custom-prev-button" src={icons.ButtonGreen} alt="left" />
            <Swiper
              className=""
              modules={[Virtual, Navigation, Pagination]}
              centeredSlides
              pagination={{
                type: 'progressbar',
              }}
              navigation={{
                nextEl: '.custom-next-button',
                prevEl: '.custom-prev-button',
              }}
              virtual
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 400,
                  allowTouchMove: true,
                },
                890: {
                  slidesPerView: 2,
                  spaceBetween: 200,
                  allowTouchMove: false,
                },
                1180: {
                  slidesPerView: 2,
                  spaceBetween: 200,
                  allowTouchMove: false,
                },
              }}
            >
              {reserves.map((reserve, index) => (
                <SwiperSlide key={reserve.id} virtualIndex={index} className="d-flex justify-content-center align-items-center min-vh-100">
                  <li key={reserve.id}>
                    <p className="fs-3 fw-bold">{itemName(reserve.item_id)}</p>
                    <img src={`${itemImage(reserve.item_id)}`} alt={itemName(reserve.item_id)} />
                    <div className="reserveCity d-flex fw-bold justify-content-around mx-auto">
                      <p>{reserve.city}</p>
                      <p>{reserve.date}</p>
                    </div>
                    <p className="dots">...........</p>
                    <button type="button" className="btn" onClick={() => handleClick(reserve.id)} disabled={isDeleting}>
                      {`Delete ${reserve.id}`}
                    </button>
                  </li>
                </SwiperSlide>
              ))}
            </Swiper>
            <img className="custom-next-button" src={icons.ButtonGreen} alt="left" />
          </section>
        </>
      );
    } else {
      reserveContent = (<h1 className="container text-center">No Reserves yet</h1>);
    }
  } else {
    reserveContent = (<h1 className="container text-center">Sign in!! 👈</h1>);
  }

  return (
    <>
      {reserveContent}
      <button type="button" className="btn position-fixed back" onClick={() => handleBack()}><img className="backa" src={icons.ButtonGreen} alt="left" /></button>
    </>
  );
};

export default ReservationsList;
