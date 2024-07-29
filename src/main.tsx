import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Pages/App.tsx'
import ErrorPage from './Pages/ErrorPage.tsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Search, { searchLoader } from './Pages/Search.tsx';
import AppIndex from './Pages/AppIndex.tsx';
import Users, { savedMovieLoader } from './Pages/Users.tsx';
import SavedMovies, { displaySavedMovieLoader } from './Pages/SavedMovies.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <AppIndex />},
      {
        path: "/search",
        element: <Search></Search>,
        loader: searchLoader,
      },
      {
        path: "/users",
        element: <Users/>,
        errorElement: <ErrorPage/>,
        loader: savedMovieLoader,
      },
      {
        path: "/saved/:userID",
        errorElement: <ErrorPage/>,
        element: <SavedMovies/>,
        loader: displaySavedMovieLoader
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
