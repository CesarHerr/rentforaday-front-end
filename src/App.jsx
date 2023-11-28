import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// to use toast notifications in the app
import { Toaster } from 'react-hot-toast';

// Elements for the router.
import Root from './routes/root';
import ErrorPage from './routes/error-page';
import Splash from './components/Splash';
import Item from './components/ItemList';
import Registration from './components/auth/Registration';
import Login from './components/auth/Login';
import ReservationsList from './components/ReservationsList';
import AddItem from './components/AddItem';
import AddReserve from './components/AddReserve';
import ItemDetail from './components/itemDetail';
import DeleteItem from './components/DeleteItem';

const router = createBrowserRouter([
  {
    path: '/rentforaday-front-end',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/rentforaday-front-end',
        element: <Splash />,
      },
      {
        path: '/rentforaday-front-end/items',
        element: <Item />,
      },
      {
        path: '/rentforaday-front-end/items/:itemId',
        element: <ItemDetail />,
      },
      {
        path: '/rentforaday-front-end/registration',
        element: <Registration />,
      },
      {
        path: '/rentforaday-front-end/login',
        element: <Login />,
      },
      {
        path: '/rentforaday-front-end/delete_item',
        element: <DeleteItem />,
      },
      {
        path: '/rentforaday-front-end/add_item',
        element: <AddItem />,
      },
      {
        path: '/rentforaday-front-end/add_reserve',
        element: <AddReserve />,
      },
      {
        path: '/rentforaday-front-end/reservation_list',
        element: <ReservationsList />,
      },
    ],
  },
]);

const App = () => (
  <>
    <Toaster />
    <RouterProvider router={router} />
  </>
);

export default App;
