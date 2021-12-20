import { findAllByRole, render, screen } from "@testing-library/react";

import Options from "../Options";

test('displays the images', async () => {
    render(<Options optionType={'scoops'}/>);

    const imgs = await screen.findAllByRole('img', { name : /scoop$/i});

    expect(imgs).toHaveLength(2);

    const altTexts = imgs.map(el => el.alt);
    expect(altTexts).toEqual(['Chocolate scoop', 'Vanilla scoop']);

});

test('displays images for toppings', async () => {
    render(<Options optionType={'toppings'} />);

    const toppingsImgs = await screen.findAllByRole('img', {name: /topping$/i} );

    expect(toppingsImgs).toHaveLength(3);

    const altTexts = toppingsImgs.map(el => el.alt);
    expect(altTexts).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping']);
})