import { render, fireEvent, screen, configure } from '@testing-library/react';
import App from './App';
import { formatLocalDateTime } from './calculations';


configure({
    testIdAttribute: 'data-test-id',
});

describe('App Component', () => {
    test('renders without errors', () => {
        render(<App />);
        expect(screen.getByText(/Delivery Fee Calculator/i)).toBeInTheDocument();
    });

    test('calculates delivery fee correctly', () => {
        render(<App />);

        fireEvent.change(screen.getByTestId('cartValue'), { target: { value: '100' } });
        fireEvent.change(screen.getByTestId('deliveryDistance'), { target: { value: '500' } });
        fireEvent.change(screen.getByTestId('numberOfItems'), { target: { value: '3' } });
        fireEvent.change(screen.getByTestId('orderTime'), { target: { value: new Date('01/02/2024 09:50') } });

        fireEvent.click(screen.getByText(/Calculate delivery fee/i));

        expect(screen.getByTestId('fee')).toHaveTextContent('2');
    });

    test('calculates delivery fee correctly', () => {
        render(<App />);

        fireEvent.change(screen.getByTestId('cartValue'), { target: { value: '8.9' } });
        fireEvent.change(screen.getByTestId('deliveryDistance'), { target: { value: '500' } });
        fireEvent.change(screen.getByTestId('numberOfItems'), { target: { value: '3' } });
        fireEvent.change(screen.getByTestId('orderTime'), { target: { value: new Date('01/02/2024 09:50') } });

        fireEvent.click(screen.getByText(/Calculate delivery fee/i));

        expect(screen.getByTestId('fee')).toHaveTextContent('3.1');
    });

    test('resets values correctly', () => {
        render(<App />);

        fireEvent.change(screen.getByTestId('cartValue'), { target: { value: '100' } });
        fireEvent.change(screen.getByTestId('deliveryDistance'), { target: { value: '500' } });
        fireEvent.change(screen.getByTestId('numberOfItems'), { target: { value: '3' } });
        fireEvent.change(screen.getByTestId('orderTime'), { target: { value: new Date('01/02/2024 09:50') } });

        fireEvent.click(screen.getByText(/Reset values/i));

        expect(screen.getByTestId('cartValue')).toHaveValue(0);
        expect(screen.getByTestId('deliveryDistance')).toHaveValue(0);
        expect(screen.getByTestId('numberOfItems')).toHaveValue(0);
        expect(screen.getByTestId('orderTime')).toHaveValue(formatLocalDateTime(new Date()));
    });
});