import { render, screen } from "@testing-library/react";

import Options from "../Options";

test('displays the images', async () => {
    render(<Options optionType={'scoops'}/>);

    const imgs = await screen.findAllByRole('img', { name : /scoop$/i});

    expect(imgs).toHaveLength(2);

    const altText = imgs.map(el => el.alt);
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);

})