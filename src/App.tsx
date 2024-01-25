import { useState } from 'react';
import { DateSelector } from './DateSelector';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


export function calcCardFee(cart: number) {
  if (cart < 10) {
    return 10 - cart;
  }
  else {
    return 0;
  }
}

export function calcDistanceFee(distance: number) {
  if (distance > 1000) {
    return 2 + Math.ceil((distance - 1000) / 1000 * 2)
  }
  else {
    return 2;
  }
}

export function calcItemsFee(items: number) {
  if (items >= 5) {
    let extraFee = 0;
    if (items > 12) {
      extraFee = 1.2;
    }
    return (items - 4) * 0.5 + extraFee;
  }
  else {
    return 0;
  }
}

export function calcFridayRushFee(date: Date) {
  if (date.getDay() === 5 && date.getHours() >= 15 && date.getHours() < 19) {
    return 1.2;
  }
  else if (date.getHours() === 19 && date.getMinutes() === 0) {
    return 1.2;
  }
  else {
    return 1;
  }
}


export function calculateFee(cart: number, distance: number, items: number, date: Date) {

  if (cart <= 0) throw Error("Negative cart value");
  if (distance <= 0) throw Error("Negative cart value");
  if (items <= 0) throw Error("Negative cart value");


  if (cart < 200) {
    const cardFee = calcCardFee(cart);
    const distanceFee = calcDistanceFee(distance);
    const itemsFee = calcItemsFee(items);
    const fridayRushFee = calcFridayRushFee(date);
    const fee = (cardFee + distanceFee + itemsFee) * fridayRushFee;

    return Math.min(fee, 15);

  }
  else {
    return 0;
  }

}


const App = () => {
  const [cart, setCart] = useState(0);
  const [distance, setDistance] = useState(0);
  const [items, setItems] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [date, setDate] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState("");

  const calculate = () => {
    if (isNaN(cart) || isNaN(distance) || isNaN(items) || cart <= 0 || distance <= 0 || items <= 0) {
      setCart(0)
      setDistance(0)
      setItems(0)
      setErrorMessage("Please enter a valid number");
    }
    else {
      const delivery = calculateFee(cart, distance, items, date);
      setDeliveryFee(delivery);
    }
  }
  const handleDateChange = (date: Date) => {
    setDate(date);
    calcFridayRushFee(date);
  }

  const handleReset = () => {
    setErrorMessage("")
  }
  return (
    <div className='container mt-5'>
      <form>
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
              placeholder='0'
              className='form-control'
              id='inputCartValue'
              min={0}
              data-test-id="cartValue"
              onChange={(e) => setCart(Number(e.target.value))} />
          </div>
          <div className='col-sm-8'>
            <span>€</span>
          </div>
          <div id='error-message'>{cart ? null : errorMessage}</div>
        </div>
        <div className="row mb-3">
          <label className='col-sm-2 col-form-label'>
            Delivery distance
          </label>
          <div className='col-sm-2'>
            <input
              type="number"
              placeholder='0'
              className='form-control'
              id='inputDistanceValue'
              min={0}
              data-test-id="deliveryDistance"
              onChange={(e) => setDistance(Number(e.target.value))} /></div>
          <div className='col-sm-8'>
            <span>m</span>
          </div>
          <div id='error-message'>{distance ? null : errorMessage}</div>
        </div>
        <div className="row mb-3">
          <label className='col-sm-2 col-form-label'>
            Amount of items
          </label>
          <div className='col-sm-2'>
            <input
              type="number"
              placeholder='0'
              className='form-control'
              id='inputItemsValue'
              min={0}
              data-test-id="numberOfItems"
              onChange={(e) => setItems(Number(e.target.value))} />
          </div>
          <div id='error-message'>{items ? null : errorMessage}</div>
        </div>
        <div className="row mb-3">
          <label className='col-sm-2 col-form-label'>
            Date and time
          </label>
          <div className='col-sm-3'>
            <DateSelector
              dateChange={handleDateChange}
              id='inputDateValue'
              data-test-id='orderTime' />
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
      </form >
    </div>
  )
}

export default App
