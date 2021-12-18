import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import SummaryForm from '../SummaryForm';

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

        userEvent.click(checkbox);
        expect(confirmButton).toBeEnabled();

        userEvent.click(checkbox);
        expect(confirmButton).toBeDisabled();

    })

    test('popover respons to hove', async () => {
        render(<SummaryForm />);
        // const nullPopover = screen.queryByText(/no icescreems will be delivered/i);
        // expect(nullPopover).toBeNull();

        // //make the hover action
        // const termNConditions = screen.getByText(/Terms and Conditions/i);
        // userEvent.hover(termNConditions);
        // // const popover = screen.getByText(/no icescreems will be delivered/i);
        // expect(popover).toBeInTheDocument();

        // //make unhover action test
        // userEvent.unhover(termNConditions);

        // await waitForElementToBeRemoved(() => {
        //     return screen.queryByText(/no icescreems will be delivered/i);
        // })
    })

})