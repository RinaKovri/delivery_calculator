import { validateCart, validateDate, validateDistance, validateItems } from './validation';
import { currentDate } from './util';

jest.mock('./util') // mock date for pass validation

describe('validate cart', () => {
    test('cart value null', () => {
        const cart = validateCart(null)
        expect(cart).toBeTruthy()
    });
    test('invalid cart value NaN', () => {
        const cart = validateCart(NaN)
        expect(cart).toBeFalsy()
    });
    test('invalid cart value negative', () => {
        const cart = validateCart(-1)
        expect(cart).toBeFalsy()
    });
    test('invalid cart value 0', () => {
        const cart = validateCart(0)
        expect(cart).toBeFalsy()
    });
    test('valid cart value 1', () => {
        const cart = validateCart(1)
        expect(cart).toBeTruthy()
    });
})

describe('validate date', () => {
    test('date value null', () => {
        const cart = validateDate(null)
        expect(cart).toBeTruthy()
    });

    test('invalid date same date', () => {
        const mockedAdd = currentDate as jest.MockedFunction<typeof currentDate>;
        mockedAdd.mockImplementation(() => new Date('01/29/2024 08:50'));

        const cart = validateDate(new Date('01/29/2024 08:50'))
        expect(cart).toBeFalsy()
    });
    test('invalid date, date in past', () => {
        const mockedAdd = currentDate as jest.MockedFunction<typeof currentDate>;
        mockedAdd.mockImplementation(() => new Date('01/29/2024 08:50'));

        const cart = validateDate(new Date('01/29/2024 08:49'))
        expect(cart).toBeFalsy()
    });
    test('valid date, date in future', () => {
        const mockedAdd = currentDate as jest.MockedFunction<typeof currentDate>;
        mockedAdd.mockImplementation(() => new Date('01/29/2024 08:50'));

        const cart = validateDate(new Date('01/29/2024 08:51'))
        expect(cart).toBeTruthy()
    });
})

describe('validate distance', () => {
    test('distance value null', () => {
        const cart = validateDistance(null)
        expect(cart).toBeTruthy()
    });
    test('invalid distance value NaN', () => {
        const cart = validateDistance(NaN)
        expect(cart).toBeFalsy()
    });
    test('invalid distance value negative', () => {
        const cart = validateDistance(-1)
        expect(cart).toBeFalsy()
    });
    test('invalid distance value 0', () => {
        const cart = validateDistance(0)
        expect(cart).toBeFalsy()
    });
    test('invalid distance value float', () => {
        const cart = validateDistance(1.02)
        expect(cart).toBeFalsy()
    });
    test('valid distance value 1', () => {
        const cart = validateDistance(1)
        expect(cart).toBeTruthy()
    });
})

describe('validate items', () => {
    test('items value null', () => {
        const cart = validateItems(null)
        expect(cart).toBeTruthy()
    });
    test('invalid items value NaN', () => {
        const cart = validateItems(NaN)
        expect(cart).toBeFalsy()
    });
    test('invalid items value negative', () => {
        const cart = validateItems(-1)
        expect(cart).toBeFalsy()
    });
    test('invalid items value 0', () => {
        const cart = validateItems(0)
        expect(cart).toBeFalsy()
    });
    test('invalid items value float', () => {
        const cart = validateItems(1.02)
        expect(cart).toBeFalsy()
    });
    test('valid items value 1', () => {
        const cart = validateItems(1)
        expect(cart).toBeTruthy()
    });
})
