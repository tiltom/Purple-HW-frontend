import React, {useEffect, useState} from "react";
import * as CSS from "csstype";
import Select from "react-select";

export type OptionType = {
    readonly value: string,
    readonly label: string,
};

const customStyles = {
    control: (provided: CSS.Properties<string | number>) => ({
        ...provided,
        width: 200,
    }),
    menuList: (provided: CSS.Properties<string | number>) => ({
        ...provided,
        width: 200,
    }),
    container: (provided: CSS.Properties<string | number>) => ({
        ...provided,
        display: "inline-block",
    })
}

const currenciesUrl = 'http://localhost:5001/purplehw-ed218/us-central1/app/api/currencies';

export interface ICurrencySelectDropdownOptions {
    readonly onChange: (e: OptionType) => void;
}

export const CurrencySelect: React.FC<ICurrencySelectDropdownOptions> = ({onChange}) => {
    const [options, setOptions] = useState<ReadonlyArray<OptionType>>([]);

    useEffect(() => {
        fetch(currenciesUrl)
            .then(response => response.json())
            .then(data => setOptions(data));
    }, []);

    return (
        <Select
            styles={customStyles}
            options={options}
            isMulti={false}
            onChange={selected => onChange(selected as OptionType)}
        />
    );
}
