import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import icons from '../assets/icons';
import { fetchItems } from '../redux/items/itemSlice';
import Spinner from './Spinner';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import '../styles/ItemList.css';
import '../styles/reservationList.css';

const Item = () => {
  const { items, isLoading } = useSelector((state) => state.item);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let itemContent;

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  if (items.length === 0) {
    itemContent = (
      <div className="container text-center d-flex justify-content-center align-items-center min-vh-100">
        <h2>No items available</h2>
      </div>
    );
  } else {
    itemContent = (
      <>
        <div className="itemTitle d-flex flex-column align-items-center justify-content-center position-absolute start-50 translate-middle-x">
          <h1 className="text-center titleAvailable">Available Accommodations</h1>
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
            {items.map((item, index) => (
              <SwiperSlide key={item.id} virtualIndex={index} className="d-flex justify-content-center align-items-center min-vh-100">
                <li key={item.id}>
                  <p className="fs-3 fw-bold">{item.name}</p>
                  <img src={`${item.image}`} alt={item.name} />
                  <div className="reserveCity d-flex fw-bold justify-content-around mx-auto">
                    <p className="text-center">{item.city}</p>
                    <p>{item.date}</p>
                  </div>
                  <p className="dots">...........</p>
                  <p className="reserveDescription">{item.description}</p>
                  <button type="button" className="btn" onClick={() => navigate(`/rentforaday-front-end/items/${item.id}`)}>
                    More info
                  </button>
                </li>

              </SwiperSlide>
            ))}
          </Swiper>
          <img className="custom-next-button" src={icons.ButtonGreen} alt="left" />
        </section>
      </>
    );
  }

  if (isLoading) {
    return (
      <div className="container text-center d-flex flex-column justify-content-center align-items-center min-vh-100">
        <div className="animation">Retrieving info from the server...</div>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {itemContent}
      <button type="button" className="btn position-fixed back"><img className="backa" src={icons.ButtonGreen} alt="left" /></button>
    </>
  );
};

export default Item;
