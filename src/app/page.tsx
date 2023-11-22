"use client"

import Axios from "axios";
import {freeze, produce} from "immer";
import {useCallback, useEffect, useMemo, useState} from "react";
import {TrackingProvider, isModeSCode, useTrackingPositions} from "@mattj65817/flight-react";

import type {ChangeEvent} from "react";
import type {ModeSCode, TrackingProviderProps} from "@mattj65817/flight-react";

function Flights() {
    const positions = useTrackingPositions();
    return (
        <code>
            {JSON.stringify(positions)}
        </code>
    );
}

export default function Home() {
    const [{id, tailNumber}, updateState] = useState<HomeState>(freeze({
        tailNumber: "",
        id: null
    }));
    const config = useMemo<TrackingProviderProps>(() => freeze({
        config: {
            kind: "adsbx",
            axiosFactory: Axios.create,
            baseURL: new URL("http://localhost:3000/api/adsbfi/")
        },
        ids: null == id ? [] : [id],
        nonTrackingInterval: {minute: 2},
        trackingInterval: {minute: 1}
    }), [id]);

    useEffect(() => {
        console.log("config", config);
    }, [config]);

    const onChangeTailNumber = useCallback(({target: {value}}: ChangeEvent<HTMLInputElement>) => {
        updateState(previous =>
            produce(previous, draft => {
                draft.tailNumber = value;
                const lowercaseValue = value.toLowerCase();
                if (isModeSCode(lowercaseValue)) {
                    draft.id = lowercaseValue;
                }
            }));
    }, [updateState]);

    return (
        <div>
            <input type="text" value={tailNumber} onChange={onChangeTailNumber}/>
            <TrackingProvider {...config}>
                <Flights/>
            </TrackingProvider>
        </div>
    );
}

interface HomeState {
    tailNumber: string;
    id: null | ModeSCode;
}
