import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {Statistics} from "./Statistics";
import {ConvertSection} from "./ConvertSection";

function App() {
    const [isConversionSuccessful, setIsConversionSuccessful] = useState(false);

    useEffect(() => {
        if(isConversionSuccessful) {
            setIsConversionSuccessful(false);
        }
    });

    const onConvertSuccessCallback = useCallback(() => setIsConversionSuccessful(true), []);

    return (
        <div className="container">
            <h1>This app allows you to convert currencies.</h1>
            <div className="hint">
                Just choose correct amount, source and destination currency and hit "Convert".
            </div>
                <div className="content">
                    <div className="convert__section">
                        <ConvertSection onConvertSuccess={onConvertSuccessCallback} />
                    </div>

                    <div className="statistics__section">
                        <Statistics shouldLoadNewStatistics={isConversionSuccessful} />
                    </div>
                </div>
        </div>
    );
}

export default App;
