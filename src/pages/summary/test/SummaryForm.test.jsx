import { fireEvent, render, screen } from "@testing-library/react";
import SummaryForm from '../SummaryForm';
import App from '../../../App'

describe('SummaryForm component', () => {

    test('initial conditions', () => {
        render(<SummaryForm />);
        const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i});
        const confirmButton = screen.getByRole('button', { name: /confirm order/i });

        expect(checkbox).not.toBeChecked();
        expect(confirmButton).toBeDisabled();
    })

    test('button enabled on first click and disabled on second click', () => {
        render(<SummaryForm />);
        const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i});
        const confirmButton = screen.getByRole('button', { name: /confirm order/i });;

        fireEvent.click(checkbox);
        expect(confirmButton).toBeEnabled();

        fireEvent.click(checkbox);
        expect(confirmButton).toBeDisabled();

    })

})