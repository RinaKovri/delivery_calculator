import { calcCardFee, calcDistanceFee, calcItemsFee, calcFridayRushFee, calculateFee } from "./App";

//testing card fee
test('card fee calculation when cart eq 1 then fee eq 9', () => {
  const fee = calcCardFee(1)
  expect(fee).toEqual(9)
});
test('card fee calculation when cart eq 9 then fee eq 1', () => {
  const fee = calcCardFee(9)
  expect(fee).toEqual(1)
});
test('card fee calculation when cart eq 10 then fee eq 0', () => {
  const fee = calcCardFee(10)
  expect(fee).toEqual(0)
});
test('card fee calculation when cart eq 11 then fee eq 0', () => {
  const fee = calcCardFee(11)
  expect(fee).toEqual(0)
});
test('card fee calculation when cart eq -1 then fee eq 11', () => {
  const fee = calcCardFee(-1)
  expect(fee).toEqual(11)
});

//testing distance fee
test('distance fee calculation when distance eq 30 then fee eq 2', () => {
  const fee = calcDistanceFee(30)
  expect(fee).toEqual(2)
});
test('distance fee calculation when distance eq 1000 then fee eq 2', () => {
  const fee = calcDistanceFee(1000)
  expect(fee).toEqual(2)
});
test('distance fee calculation when distance eq 1001 then fee eq 2', () => {
  const fee = calcDistanceFee(1001)
  expect(fee).toEqual(3)
});
test('distance fee calculation when distance eq 1500 then fee eq 3', () => {
  const fee = calcDistanceFee(1500)
  expect(fee).toEqual(3)
});
test('distance fee calculation when distance eq 1501 then fee eq 4', () => {
  const fee = calcDistanceFee(1501)
  expect(fee).toEqual(4)
});
test('distance fee calculation when distance eq -1 then fee eq 2', () => {
  const fee = calcDistanceFee(-1)
  expect(fee).toEqual(2)
});

//testing items fee

test('items fee calculation when items eq 0 then fee eq 0', () => {
  const fee = calcItemsFee(0)
  expect(fee).toEqual(0)
});
test('items fee calculation when items eq 5 then fee eq 0.5', () => {
  const fee = calcItemsFee(5)
  expect(fee).toEqual(0.5)
});
test('items fee calculation when items eq 12 then fee eq 4', () => {
  const fee = calcItemsFee(12)
  expect(fee).toEqual(4)
});
test('items fee calculation when items eq 13 then fee eq 5.7', () => {
  const fee = calcItemsFee(13)
  expect(fee).toEqual(5.7)
});

//testing friday rush fee
test('friday rush fee calculation when date eq 24.01.2024 16:00 then fee eq 1', () => {
  const testDate = new Date(2024, 0, 24, 16, 0)
  const fee = calcFridayRushFee(testDate)
  expect(fee).toEqual(1)
});
test('friday rush fee calculation when date eq 26.01.2024 14:59 then fee eq 1', () => {
  const testDate = new Date(2024, 0, 26, 14, 59)
  const fee = calcFridayRushFee(testDate)
  expect(fee).toEqual(1)
});
test('friday rush fee calculation when date eq 26.01.2024 15:00 then fee eq 1.2', () => {
  const testDate = new Date(2024, 0, 26, 15, 0)
  const fee = calcFridayRushFee(testDate)
  expect(fee).toEqual(1.2)
});
test('friday rush fee calculation when date eq 26.01.2024 18:59 then fee eq 1.2', () => {
  const testDate = new Date(2024, 0, 26, 18, 59)
  const fee = calcFridayRushFee(testDate)
  expect(fee).toEqual(1.2)
});
test('friday rush fee calculation when date eq 26.01.2024 19:00 then fee eq 1.2', () => {
  const testDate = new Date(2024, 0, 26, 19, 0)
  const fee = calcFridayRushFee(testDate)
  expect(fee).toEqual(1.2)
});
test('friday rush fee calculation when date eq 26.01.2024 19:01 then fee eq 1', () => {
  const testDate = new Date(2024, 0, 26, 19, 1)
  const fee = calcFridayRushFee(testDate)
  expect(fee).toEqual(1)
});

//testing the total fee calculation function
test('total fee calculation when cart eq 200 then fee eq 0', () => {
  const testDate = new Date(2024, 0, 26, 19, 0)
  const fee = calculateFee(200, 500, 4, testDate)
  expect(fee).toEqual(0)
})
test('total fee calculation when cart eq 9, distance eq 2500, items eq 14, date eq 26.01.2024 19:00 then fee eq 15', () => {
  const testDate = new Date(2024, 0, 26, 19, 0)
  const fee = calculateFee(9, 3500, 14, testDate)
  expect(fee).toEqual(15)
})
test('total fee calculation when cart eq 0 then error', () => {
  const testDate = new Date(2024, 0, 26, 19, 0)
  const exec = () => calculateFee(0, 3500, 14, testDate)
  expect(exec).toThrow(Error);
  expect(exec).toThrow("Negative cart value")
})
test('total fee calculation when distance eq 0 then error', () => {
  const testDate = new Date(2024, 0, 26, 19, 0)
  const exec = () => calculateFee(10, 0, 14, testDate)
  expect(exec).toThrow(Error);
  expect(exec).toThrow("Negative cart value")
})
test('total fee calculation when items eq 0 then error', () => {
  const testDate = new Date(2024, 0, 26, 19, 0)
  const exec = () => calculateFee(10, 3500, 0, testDate)
  expect(exec).toThrow(Error);
  expect(exec).toThrow("Negative cart value")
})