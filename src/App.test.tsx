import { render, fireEvent, screen, configure } from '@testing-library/react';
import App from './App';
import { currentDate } from './util';

configure({
    testIdAttribute: 'data-test-id', // change default data test id
});

jest.mock('./util') // mock date for pass validation

describe('App Component', () => {
    test('renders without errors', () => {
        render(<App />);

        expect(screen.getByText(/Delivery Fee Calculator/i)).toBeInTheDocument();
        expect(screen.getByTestId('cartValue')).toHaveValue(null);
        expect(screen.getByTestId('deliveryDistance')).toHaveValue(null);
        expect(screen.getByTestId('numberOfItems')).toHaveValue(null);
        expect(screen.getByTestId('orderTime')).toHaveValue("");
    });

    test('calculates delivery fee correctly', () => {
        const mockedAdd = currentDate as jest.MockedFunction<typeof currentDate>;
        mockedAdd.mockImplementation(() => new Date('01/29/2024 08:50'));

        render(<App />);

        fireEvent.change(screen.getByTestId('cartValue'), { target: { value: '100' } });
        fireEvent.change(screen.getByTestId('deliveryDistance'), { target: { value: '500' } });
        fireEvent.change(screen.getByTestId('numberOfItems'), { target: { value: '3' } });
        fireEvent.change(screen.getByTestId('orderTime'), { target: { value: "2024-01-30T20:17:46" } });

        fireEvent.click(screen.getByText(/Calculate delivery fee/i));

        expect(screen.getByTestId('fee')).toHaveTextContent('2');
    });

    test('calculates delivery fee correctly', () => {
        const mockedAdd = currentDate as jest.MockedFunction<typeof currentDate>;
        mockedAdd.mockImplementation(() => new Date('01/29/2024 08:50'));

        render(<App />);

        fireEvent.change(screen.getByTestId('cartValue'), { target: { value: '8.9' } });
        fireEvent.change(screen.getByTestId('deliveryDistance'), { target: { value: '500' } });
        fireEvent.change(screen.getByTestId('numberOfItems'), { target: { value: '3' } });
        fireEvent.change(screen.getByTestId('orderTime'), { target: { value: "2024-01-30T20:17:46" } });

        fireEvent.click(screen.getByText(/Calculate delivery fee/i));

        expect(screen.getByTestId('fee')).toHaveTextContent('3.1');
    });

    test('resets values correctly', () => {
        const mockedAdd = currentDate as jest.MockedFunction<typeof currentDate>;
        mockedAdd.mockImplementation(() => new Date('01/29/2024 08:50'));

        render(<App />);

        fireEvent.change(screen.getByTestId('cartValue'), { target: { value: '100' } });
        fireEvent.change(screen.getByTestId('deliveryDistance'), { target: { value: '500' } });
        fireEvent.change(screen.getByTestId('numberOfItems'), { target: { value: '3' } });
        fireEvent.change(screen.getByTestId('orderTime'), { target: { value: "2024-01-30T20:17:46" } });

        fireEvent.click(screen.getByText(/Reset values/i));

        expect(screen.getByTestId('cartValue')).toHaveValue(null);
        expect(screen.getByTestId('deliveryDistance')).toHaveValue(null);
        expect(screen.getByTestId('numberOfItems')).toHaveValue(null);
        expect(screen.getByTestId('orderTime')).toHaveValue("");
    });
});
