/**
 * @type {(phase: string) => import("next").NextConfig}
 */
module.exports = phase => {
    if ("phase-development-server" !== phase) {
        return {
            output: "export"
        }
    }
    return {
        rewrites: async () => [{
            source: "/api/adsbfi/:path*",
            destination: "https://opendata.adsb.fi/api/v2/:path*"
        }, {
            source: "/api/aircraftclubs/:path*",
            destination: "https://www.aircraftclubs.com/:path*"
        }, {
            source: "/api/faa/nfdc/:path*",
            destination: "https://nfdc.faa.gov/:path*"
        }]
    };
};
