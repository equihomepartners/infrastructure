import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PropTrackReport from './PropTrackReport';
const PropTrackDemo = () => {
    const sampleData = {
        propertyDetails: {
            address: "102 HOLTERMANN ST CROWS NEST NSW 2065",
            suburb: "Crows Nest",
            postcode: "2065",
            bedrooms: 4,
            bathrooms: 2,
            parking: 0,
            landSize: 164,
            propertyType: "House",
            lotPlan: "1/516265",
            council: "North Sydney"
        },
        valuation: {
            estimatedValue: 2715145,
            lowRange: 2540000,
            highRange: 2890000,
            confidence: 85,
            date: "24 May 2024",
            applicationAmount: 2000000,
            loanAmount: 1500000
        },
        comparableSales: [
            {
                address: "24 Devonshire Street, Crows Nest, NSW 2065",
                price: 2875000,
                saleDate: "11 Apr 2024",
                bedrooms: 3,
                bathrooms: 2,
                parking: 1,
                landSize: 184,
                propertyType: "House"
            },
            {
                address: "47 Colin Street, Cammeray, NSW 2062",
                price: 3300000,
                saleDate: "13 Dec 2023",
                bedrooms: 3,
                bathrooms: 2,
                parking: 1,
                landSize: 247,
                propertyType: "House"
            },
            {
                address: "77 Holtermann Street, Crows Nest, NSW 2065",
                price: 3850000,
                saleDate: "15 Apr 2024",
                bedrooms: 4,
                bathrooms: 2,
                parking: 1,
                landSize: 215,
                propertyType: "House"
            }
        ],
        propertyHistory: [
            {
                date: "18 Jul 2013",
                price: 1400000,
                party: "McGrath - Crows Nest"
            },
            {
                date: "10 May 2006",
                price: 730000,
                party: "-"
            },
            {
                date: "16 Jun 1999",
                price: 420000,
                party: "-"
            }
        ]
    };
    return (_jsx("div", { className: "p-8 bg-gray-100 min-h-screen", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsx("div", { className: "mb-8", children: _jsx("div", { className: "bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg", children: _jsxs("div", { className: "flex", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx("svg", { className: "h-5 w-5 text-yellow-400", viewBox: "0 0 20 20", fill: "currentColor", children: _jsx("path", { fillRule: "evenodd", d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }) }), _jsx("div", { className: "ml-3", children: _jsx("p", { className: "text-sm text-yellow-700", children: "This is a demo implementation of the PropTrack AVM report interface. In production, this would use real PropTrack API data." }) })] }) }) }), _jsx(PropTrackReport, { ...sampleData })] }) }));
};
export default PropTrackDemo;
