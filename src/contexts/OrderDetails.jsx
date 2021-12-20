import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { pricePerItem } from '../constants';

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(amount)
}

const OrderDetails = createContext();

//create the custom hook

export function useOrderDetails() {
    const context = useContext(OrderDetails);

    if(!context) {
        throw new Error(
            'use order datails must be used inside orderDetailsProvider'
        )
    }

    return context;
}

function calculateSubTotal(optionType, optionCounts) {
    let optionCount = 0;
    for( const count of optionCounts[optionType].values()) {
        optionCount += count;
    }

    return optionCount * pricePerItem[optionType];
}

export function OrderDeatilsProvider( props ) {

    const [optionCounts, setOptionCounts] = useState({
        scoops: new Map(),
        toppings: new Map()
    });
    const zeroCurrency = formatCurrency(0);
    const [totals, setTotals] = useState({
        scoops: zeroCurrency,
        toppings: zeroCurrency,
        grandTotal: zeroCurrency
    })

    useEffect(() => {
        const scoopsSubTotal = calculateSubTotal('scoops', optionCounts);
        const toppingsSubTotal = calculateSubTotal('toppings', optionCounts);
        const grandTotal = scoopsSubTotal + toppingsSubTotal;

        setTotals({
            scoops: formatCurrency(),
            toppings: formatCurrency(toppingsSubTotal),
            grandTotal: formatCurrency(grandTotal)
        })
        
    }, [optionCounts]);

    const value = useMemo(()=>{
        function updateItemCount(itemName, newItemCount, optionType) {
            const newOptionCounts = { ...optionCounts };

            const optionTypeMap = optionCounts[optionType];
            optionTypeMap.set(itemName, parseInt(newItemCount));

            setOptionCounts(newOptionCounts);
        }
        //getter: to get scoops, toppings, sub total and total
        //setter: update optionCount
        return [{ ...optionCounts, totals }, updateItemCount]
    },[optionCounts, totals])

    return <OrderDetails.Provider value={value} { ...props } />
}