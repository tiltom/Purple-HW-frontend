import React, {useEffect, useState} from "react";
import { backendApiBaseUrl } from "./apiconfig.json";

const statisticsBaseUrl = `${backendApiBaseUrl}/statistics`;

export interface IStatistics {
    readonly shouldLoadNewStatistics: boolean;
}

export const Statistics: React.FC<IStatistics> = ({shouldLoadNewStatistics}) => {
    const [mostConverted, setMostConverted] = useState('');
    const [totalUsd, setTotalUsd] = useState('');
    const [numberOfRequests, setNumberOfRequests] = useState('');

    useEffect(() => {
        fetch(`${statisticsBaseUrl}/total-usd`)
            .then(response => response.json())
            .then(data => setTotalUsd(data.result));
    }, [shouldLoadNewStatistics]);

    useEffect(() => {
        fetch(`${statisticsBaseUrl}/conversion-requests`)
            .then(response => response.json())
            .then(data => setNumberOfRequests(data.result));
    }, [shouldLoadNewStatistics]);

    useEffect(() => {
        fetch(`${statisticsBaseUrl}/most-converted`)
            .then(response => response.json())
            .then(data => setMostConverted(data.currency));
    }, [shouldLoadNewStatistics]);

    return (
      <div className="statistics">
          <h2>Statistics</h2>
          <p>The most converted currency: <b>{mostConverted}</b></p>
          <p>Total USD converted: <b>{totalUsd}</b></p>
          <p>Number of successful converting requests: <b>{numberOfRequests}</b></p>
      </div>
    );
}
