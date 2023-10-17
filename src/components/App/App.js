import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import AppLayout from './AppLayout';
import Cards from "./Cards/Cards";
import CardDetails from './CardDetails/CardDetails';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadContent } from './Cards/cardsSlice'; // Import the action

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<AppLayout />}>
      <Route index element={<Cards />} />
      <Route path='card/:id' element={<CardDetails />} />
    </Route>
  )
)

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the action to load content when the component mounts
    dispatch(loadContent());
  }, [dispatch]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
