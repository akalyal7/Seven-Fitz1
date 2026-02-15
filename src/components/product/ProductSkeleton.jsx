import React from 'react';

const ProductSkeleton = () => (
    <div className="bg-white rounded-lg overflow-hidden animate-pulse">
        <div className="aspect-3/4 bg-gray-200"></div>
        <div className="p-6 space-y-4">
            <div className="flex justify-between">
                <div className="h-3 w-1/4 bg-gray-200 rounded"></div>
                <div className="h-3 w-1/6 bg-gray-200 rounded"></div>
            </div>
            <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
            <div className="h-5 w-1/3 bg-gray-200 rounded"></div>
            <div className="flex gap-2">
                {[1, 2, 3].map(i => (
                    <div key={i} className="w-4 h-4 rounded-full bg-gray-200"></div>
                ))}
            </div>
        </div>
    </div>
);

export default ProductSkeleton;
