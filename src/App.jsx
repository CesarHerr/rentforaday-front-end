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
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Splash />,
      },
      {
        path: 'items',
        element: <Item />,
      },
      {
        path: 'items/:itemId',
        element: <ItemDetail />,
      },
      {
        path: 'registration',
        element: <Registration />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'delete_item',
        element: <DeleteItem />,
      },
      {
        path: 'add_item',
        element: <AddItem />,
      },
      {
        path: 'add_reserve',
        element: <AddReserve />,
      },
      {
        path: 'reservation_list',
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
