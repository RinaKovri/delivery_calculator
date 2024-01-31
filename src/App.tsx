import { useEffect, useState } from 'react';
import { formatLocalDateTime, calcFridayRushFee, calculateFee } from './calculations';
import { validateCart, validateDate, validateDistance, validateItems } from './validation';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [cart, setCart] = useState<null | number>(null);
  const [distance, setDistance] = useState<null | number>(null);
  const [items, setItems] = useState<null | number>(null);
  const [date, setDate] = useState<null | Date>(null);
  const [disable, setDisable] = useState(true);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [inputErrors, setInputErrors] = useState({
    cart: false,
    distance: false,
    items: false,
    date: false
  });

  useEffect(() => {
    const error = {
      cart: !validateCart(cart),
      distance: !validateDistance(distance),
      items: !validateItems(items),
      date: !validateDate(date)
    }
    setInputErrors(error);
    if (cart == null || distance == null || items == null || date == null || error.cart || error.distance || error.items || error.date) {
      setDisable(true);
    }
    else {
      setDisable(false);
    }
  }, [cart, distance, items, date]);

  const calculate = () => {
    if (cart && distance && items && date &&
      validateCart(cart) && validateDistance(distance) && validateItems(items) && validateDate(date)) {
      const delivery = calculateFee(cart, distance, items, date);
      setDeliveryFee(delivery);
    }
  }

  const handleCartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCart(parseFloat(e.target.value));
  }

  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDistance(parseFloat(e.target.value));
  }
  const handleItemsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItems(parseFloat(e.target.value));
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    setDate(selectedDate);
  }

  const handleReset = () => {
    setInputErrors({
      cart: false,
      distance: false,
      items: false,
      date: false
    });
    setCart(null);
    setDistance(null);
    setItems(null);
    setDate(null);
    setDeliveryFee(0);
    console.log("Values after reset:", cart, distance, items, date);
  }

  return (
    <div className='container mt-5'>
      <div>
        <h3>Delivery Fee Calculator</h3>
      </div>
      <div className="row mb-3 mt-5">
        <label className='col-sm-2 col-form-label'>
          Cart Value
        </label>
        <div className='col-sm-2'>
          <input
            type="number"
            value={cart == null ? "" : cart}
            className='form-control'
            min={0}
            data-test-id="cartValue"
            onChange={handleCartChange} />
        </div>
        <div className='col-sm-8'>
          <span>€</span>
        </div>
        {inputErrors.cart && <div className='error-message'>The cart value must be greater than 0</div>}
      </div>
      <div className="row mb-3">
        <label className='col-sm-2 col-form-label'>
          Delivery distance
        </label>
        <div className='col-sm-2'>
          <input
            type="number"
            value={distance == null ? "" : distance}
            className='form-control'
            min={0}
            data-test-id="deliveryDistance"
            onChange={handleDistanceChange} /></div>
        <div className='col-sm-8'>
          <span>m</span>
        </div>
        {inputErrors.distance && <div className='error-message'>The distance value must be an integer greater than 0</div>}
      </div>
      <div className="row mb-3">
        <label className='col-sm-2 col-form-label'>
          Amount of items
        </label>
        <div className='col-sm-2'>
          <input
            type="number"
            value={items == null ? "" : items}
            className='form-control'
            min={0}
            data-test-id="numberOfItems"
            onChange={handleItemsChange} />
        </div>
        {inputErrors.items && <div className="error-message">The items value should be an integer greater than 0</div>}
      </div>
      <div className="row mb-3">
        <label className='col-sm-2 col-form-label'>
          Date and time
        </label>
        <div className='col-sm-2'>
          <input type='datetime-local'
            data-test-id='orderTime'
            value={date == null ? "" : formatLocalDateTime(date)}
            onChange={handleDateChange}
          />
        </div>
        {inputErrors.date && <div className="error-message">Delivery is available only in the future date</div>}
      </div>
      <div className="row mb-3">
        <div className='col-sm-3'>
          <button
            type='button'
            disabled={disable}
            className='btn custom-color mt-3'
            onClick={calculate}>
            Calculate delivery fee
          </button>
        </div>
        <div className='col-sm-9'>
          <button
            type='reset'
            className='btn btn-secondary mt-3'
            onClick={handleReset}
            style={{ height: '55px' }}>Reset values</button>
        </div>
      </div>
      <div className="row mb-3 mt-5">
        <div className='col-sm-2'>
          <span style={{ fontSize: '20px' }}>Delivery price:</span>
        </div>
        <div
          data-test-id="fee"
          className='col-sm-10'
          style={{ fontSize: '20px' }}>
          {deliveryFee} €
        </div>
      </div>
    </div>
  )
}

export default App

