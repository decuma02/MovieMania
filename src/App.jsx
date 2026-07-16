import Home from './pages/Home'
import {Toaster} from 'react-hot-toast';

export default function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Home/>
    </>
  )
}
