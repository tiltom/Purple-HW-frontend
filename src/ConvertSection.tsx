import {CurrencySelect, OptionType} from "./CurrencySelect";
import React, {useCallback, useRef, useState} from "react";
import { backendApiBaseUrl } from "./apiconfig.json";

const isRequestValid = (amount: string, sourceCurrency: string, destinationCurrency: string) => {
    if (amount === '' || amount === '0')
        return false;

    if (sourceCurrency === '' || destinationCurrency === '')
        return false;

    return sourceCurrency !== destinationCurrency;
}

const convertApiUrl = `${backendApiBaseUrl}/convert`;

export interface IConvertSection {
    readonly onConvertSuccess: () => void;
}

export const ConvertSection: React.FC<IConvertSection> = ({onConvertSuccess}) => {
    const [sourceCurrency, setSourceCurrency] = useState('');
    const [destinationCurrency, setDestinationCurrency] = useState('');
    const [amount, setAmount] = useState('0');
    const [convertedValue, setConvertedValue] = useState('');
    const [isConversionInvalid, setIsConversionInvalid] = useState(false);

    const convertedAmount = useRef('');
    const convertedSourceCurrency = useRef('');
    const convertedDestinationCurrency = useRef('');

    const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => e.target.validity.valid && setAmount(e.target.value);

    const onConvertClick = useCallback(() => {
        if (!isRequestValid(amount, sourceCurrency, destinationCurrency)) {
            setIsConversionInvalid(true);
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({from: sourceCurrency, to: destinationCurrency, amount: amount})
        };

        fetch(convertApiUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                setConvertedValue(data.result);
                setIsConversionInvalid(false);
                onConvertSuccess();
            })
            .catch(() => setIsConversionInvalid(true));

        convertedSourceCurrency.current = sourceCurrency;
        convertedDestinationCurrency.current = destinationCurrency;
        convertedAmount.current = amount;
    }, [amount, destinationCurrency, onConvertSuccess, sourceCurrency]);

    return (
        <>
            <div className="convert__section-inputs">
                <input type="text" className="convert__amount-input" pattern="[0-9]*" value={amount}
                       onChange={onAmountChange}/>

                <CurrencySelect onChange={(e: OptionType) => setSourceCurrency(e.value)}/>
                <span className="convert__separator">
                    To:
                </span>
                <CurrencySelect onChange={(e: OptionType) => setDestinationCurrency(e.value)}/>

                <button onClick={onConvertClick} className="convert__confirmation-button">Convert</button>
            </div>

            {!isConversionInvalid && convertedValue && (
                <div className="convert__result convert__result-success">
                    Congrats, you successfully
                    converted {convertedAmount.current} {convertedSourceCurrency.current} to {convertedValue} {convertedDestinationCurrency.current}!
                </div>
            )}

            {isConversionInvalid && (
                <div className="convert__result convert__invalid-input">
                    The provided input is invalid, check if you entered correct amount and set distinct source and
                    destination currencies.
                </div>
            )}
        </>
    );
}
