


export function calcCardFee(cart: number) {
    if (cart < 10) {
      return Number((10 - cart).toFixed(1));
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