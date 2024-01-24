import { useState } from 'react';
import { DateSelector } from './DateSelector';



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
  else if (date.getHours() === 19 && date.getMinutes() === 0){
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
  if (isNaN(cart) || isNaN(distance) || isNaN(items)) throw Error("Is not a number");

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

  const calculate = () => {
    const delivery = calculateFee(cart, distance, items, date);
    setDeliveryFee(delivery);

  }
  const handleDateChange = (date: Date) => {
    setDate(date);
    calcFridayRushFee(date);
  }
  return (
    <>
      <form>
        <table>
          <thead>
            <tr>
              <th colSpan={3}>Delivery Fee Calculator</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Cart Value</th>
              <td><input type="text" onChange={(e) => setCart(Number(e.target.value))} /></td>
              <td>€</td>
            </tr>
            <tr>
              <th>Delivery distance</th>
              <td><input type="text" onChange={(e) => setDistance(Number(e.target.value))} /></td>
              <td>m</td>
            </tr>
            <tr>
              <th>Amount of items</th>
              <td><input type="text" onChange={(e) => setItems(Number(e.target.value))} /></td>
            </tr>
            <tr>
              <DateSelector dateChange={handleDateChange} />
            </tr>
            <tr>
              <td>
                <button type='button' onClick={calculate}>Calculate delivery price</button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>Delivery price: {deliveryFee}</th>
            </tr>
          </tfoot>
        </table>
      </form>
    </>
  )
}

export default App
