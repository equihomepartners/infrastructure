import React from 'react';
import { Camera } from 'lucide-react';
import type { Images } from '../../types';

interface Props {
  images: Images;
  address: string;
}

const PropertyGallery: React.FC<Props> = ({ images, address }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <div className="flex items-center mb-6">
        <Camera className="h-6 w-6 text-indigo-600 mr-2" />
        <h3 className="text-xl font-semibold">Property Gallery</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2">
          <img
            src={images.exterior}
            alt="Property Exterior"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        {images.interior.map((image, index) => (
          <div key={index} className="col-span-1">
            <img
              src={image}
              alt={`Interior ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyGallery;