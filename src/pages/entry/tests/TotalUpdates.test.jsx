import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Options from '../Options';

import { OrderDeatilsProvider } from '../../../contexts/OrderDetails';
import OrderEntry from '../OrderEntry';

test('updates the subtotal in the right way', () => {
    render(<Options optionType='scoope' />, { wrapper: OrderDeatilsProvider });
    const scoopsSubTotal = screen.getByText('Scoop total $', {exact: false});  
    expect(scoopsSubTotal).toHaveTextContent('0.00');

    const vanillaInput = screen.getByRole('spinButton', {name: 'Vanilla'});
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');
    expect(scoopsSubTotal).toHaveTextContent('2.00');

    const chocolateInput = screen.getByRole('spinButton', {name: 'Chocolate'});
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, '2');
    expect(scoopsSubTotal).toHaveTextContent('6.00');

});

describe('grand total test', () => {
    test('grand total starts at 0.00', () => {
        render(<OrderEntry />);
        const gTotal = screen.getByRole('heading', {name: /grand total: \$/i});
        expect(gTotal).toHaveTextContent('0.00');
    })

    test('grand total updates properly if scoop is added first', async () => {
        render(<OrderEntry />);
        const gTotal = screen.getByRole('heading', {name: /grand total: \$/i});

        const vanillaSub = await screen.findByRole('spinbutton', {
            name: 'Vanilla'
        });

        userEvent.clear(vanillaSub);
        userEvent.type(vanillaSub,'2');
        expect(gTotal).toHaveTextContent('4.00');

        const cherriesCheckbox = await screen.findByRole('checkbox', {
            name: 'cherries'
        })

        userEvent.click(cherriesCheckbox);
        expect(gTotal).toHaveTextContent('5.50');
    })
})