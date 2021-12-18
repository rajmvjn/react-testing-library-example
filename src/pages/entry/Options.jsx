import { useState, useEffect } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';

import ScoopOption from './ScoopOption';

export default function Options({optionType}) {

    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3030/${optionType}`)
        .then(res => setItems(res.data))
        .catch(err => {
            // TODO: error handling..
        })
    }, [optionType])

    const ItemComponent = optionType === 'scoops'? ScoopOption : null;

    const optionItems = items.map( item => (
        <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />
    ))
    
    return (
        <Row>
            { optionItems }
        </Row>
    )
}