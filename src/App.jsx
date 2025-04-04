import { RouterProvider } from 'react-router-dom';
import { router } from './routes/index';
import { BookingProvider } from './context/BookingContext';

function App() {
  return (
    <BookingProvider>
      <RouterProvider router={router} />
    </BookingProvider>
  );
}

export default App;