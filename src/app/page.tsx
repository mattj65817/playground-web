"use client"

import {AircraftPositionProvider, useAircraftPosition} from "@mattj65817/flight-react";
import {freeze} from "immer";

const moreyModeSCodes = freeze<Lowercase<string>[]>([
    "a3daa1",
    "a5414a",
    "a54501",
    "a5de70",
    "a60631",
    "a6b340",
    "a97172",
    "aa3681",
    "acfacb"
]);

function Positions() {
    const positions = useAircraftPosition();
    return (
        <pre>
            {JSON.stringify(positions, null, "  ")}
        </pre>
    );
}

export default function Home() {
    return (
        <AircraftPositionProvider modeSCodes={moreyModeSCodes} config={{
            provider: "opensky",
            auth: {
                username: "mattj65816",
                password: "C3kX$RpaB2D1"
            }
        }}>
            <Positions/>
        </AircraftPositionProvider>
    );
}
