import { render } from "@testing-library/react";
import { OrderDeatilsProvider } from "../contexts/orderDetails";

const renderWithContext = (ui, Options) => render(ui, { wrapper: OrderDeatilsProvider, ...Options});

export * from '@testing-library/react';

export { renderWithContext as render };