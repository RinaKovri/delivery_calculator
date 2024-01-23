import { calcCardFee, calcDistanceFee } from "./App";


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

test('distance fee calculation when distance eq 1000 then fee eq 2', () => {
  const fee = calcDistanceFee(1000)
  expect(fee).toEqual(2)
});
test('distance fee calculation when distance eq 1499 then fee eq 3', () => {
  const fee = calcDistanceFee(1499)
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