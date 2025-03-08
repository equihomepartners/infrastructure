import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Camera } from 'lucide-react';
const PropertyGallery = ({ images, address }) => {
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-8", children: [_jsxs("div", { className: "flex items-center mb-6", children: [_jsx(Camera, { className: "h-6 w-6 text-indigo-600 mr-2" }), _jsx("h3", { className: "text-xl font-semibold", children: "Property Gallery" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsx("div", { className: "col-span-1 md:col-span-2", children: _jsx("img", { src: images.exterior, alt: "Property Exterior", className: "w-full h-64 object-cover rounded-lg" }) }), images.interior.map((image, index) => (_jsx("div", { className: "col-span-1", children: _jsx("img", { src: image, alt: `Interior ${index + 1}`, className: "w-full h-64 object-cover rounded-lg" }) }, index)))] })] }));
};
export default PropertyGallery;
