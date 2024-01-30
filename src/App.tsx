import { useState } from 'react';
//import DateSelector from './DateSelector';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { formatLocalDateTime, calcFridayRushFee, calculateFee } from './calculations';



const App = () => {
  const [cart, setCart] = useState(0);
  const [distance, setDistance] = useState(0);
  const [items, setItems] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [date, setDate] = useState(new Date());
  const [inputErrors, setInputErrors] = useState({
    cart: false,
    distance: false,
    items: false,
  });

  const calculate = () => {

    const errors = {
      cart: isNaN(cart) || cart <= 0,
      distance: isNaN(distance) || distance <= 0 || !Number.isInteger(distance),
      items: isNaN(items) || items <= 0 || !Number.isInteger(items)
    };

    setInputErrors(errors);

    if (errors.cart || errors.distance || errors.items) {
      setDeliveryFee(0);
      return;
    }
    else {
      const delivery = calculateFee(cart, distance, items, date);
      setDeliveryFee(delivery);
    }
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    setDate(selectedDate);
    calcFridayRushFee(selectedDate);
  }

  const handleReset = () => {
    setInputErrors({
      cart: false,
      distance: false,
      items: false
    });
    setCart(0);
    setDistance(0);
    setItems(0);
    setDate(new Date());
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
            value={cart}
            className='form-control'
            min={0}
            data-test-id="cartValue"
            onChange={(e) => {
              setCart(parseFloat(e.target.value));
              setInputErrors({ ...inputErrors, cart: false });
            }} />
        </div>
        <div className='col-sm-8'>
          <span>€</span>
        </div>
        {inputErrors.cart && <div id='error-message'>Please enter a valid number</div>}
      </div>
      <div className="row mb-3">
        <label className='col-sm-2 col-form-label'>
          Delivery distance
        </label>
        <div className='col-sm-2'>
          <input
            type="number"
            value={distance}
            className='form-control'
            min={0}
            data-test-id="deliveryDistance"
            onChange={(e) => {
              setDistance(Number(e.target.value));
              setInputErrors({ ...inputErrors, distance: false });
            }} /></div>
        <div className='col-sm-8'>
          <span>m</span>
        </div>
        {inputErrors.distance && <div id='error-message'>Please enter a valid number</div>}
      </div>
      <div className="row mb-3">
        <label className='col-sm-2 col-form-label'>
          Amount of items
        </label>
        <div className='col-sm-2'>
          <input
            type="number"
            value={items}
            className='form-control'
            min={0}
            data-test-id="numberOfItems"
            onChange={(e) => {
              setItems(Number(e.target.value));
              setInputErrors({ ...inputErrors, items: false });
            }} />
        </div>
        {inputErrors.items && <div id='error-message'>Please enter a valid number</div>}
      </div>
      <div className="row mb-3">
        <label className='col-sm-2 col-form-label'>
          Date and time
        </label>
        <div className='col-sm-2'>
          <input type='datetime-local'
            data-test-id='orderTime'
            value={formatLocalDateTime(date)}
            onChange={handleDateChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className='col-sm-3'>
          <button
            type='button'
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
          {deliveryFee}
        </div>
      </div>
    </div>
  )
}

export default App
