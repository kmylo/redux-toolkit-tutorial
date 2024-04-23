import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';

import { useDispatch, useSelector } from 'react-redux';
import { calculateTotals, getCartItems } from './features/cart/cartSlice';
import { useEffect } from 'react';
import Modal from './components/Modal';

const mockedData = [{ "id": "rec1JZlfCIBOPdcT2", "title": "Samsung Galaxy S8", "price": "399.99", "img": "https://www.course-api.com/images/cart/phone-1.png", "amount": 1 }, { "id": "recB6qcHPxb62YJ75", "title": "google pixel", "price": "499.99", "img": "https://www.course-api.com/images/cart/phone-2.png", "amount": 1 }, { "id": "recdRxBsE14Rr2VuJ", "title": "Xiaomi Redmi Note 2", "price": "699.99", "img": "https://www.course-api.com/images/cart/phone-3.png", "amount": 1 }, { "id": "recwTo160XST3PIoW", "title": "Samsung Galaxy S7", "price": "599.99 ", "img": "https://www.course-api.com/images/cart/phone-4.png", "amount": 1 }]

export const API_URL = "https://course-api.com/react-useReducer-cart-project"
function App() {
  const { cartItems, isLoading } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('log something');
    const fetchData = () => new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockedData)
        // resolve("foo");
        // fetch("https://course-api.com/react-useReducer-cart-project")

      }, 300);

    })
    fetchData().then(res => console.log(res));
    // const fetchData = fetch(API_URL)
    //   .then((res) => res.json())
    //   .then(
    //     (data) => {
    //       console.log({ data })
    //       // setIsLoaded(true);
    //       // setItems(data.results);
    //     },
    //     (error) => {
    //       console.log({ error })
    //       // setIsLoaded(true);
    //       // setError(error);
    //     }
    //   );
    // fetchData();

  }, [])

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems('random'));
  }, []);

  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
