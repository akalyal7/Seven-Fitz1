import React from "react";
import { useProducts } from "../../context/ProductContext";

const EpicCollection = () => {
    const { products, loading } = useProducts();

    if (loading) return <p className="text-center py-12">Loading...</p>;

    return (
        <div className="px-6 py-12">
            {/* Section Heading */}
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold">Our Epic Collection</h2>
                <p className="text-gray-500">Up to 50% off on top categories</p>
            </div>

            {/* Main Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Banner - Sticky */}
                <div className="relative">
                    <div className="sticky top-20">
                        <img
                            // src="https://images.unsplash.com/photo-1719552979950-f35958f97ebe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            src="https://i.pinimg.com/736x/db/06/2b/db062bacb67a156c1bd855693d55d9c0.jpg"
                            alt="Dress Collection"
                            className="w-full h-[80vh] object-cover rounded-lg shadow-md"
                        />
                        <div className="absolute bottom-6 left-6 bg-white/80 p-4 rounded-lg">
                            <h3 className="text-2xl font-bold">Dress Collection</h3>
                            <p className="text-gray-500 text-sm">347 products</p>
                            <button className="mt-3 px-5 py-2 bg-black text-white rounded-full hover:bg-gray-800">
                                Shop now →
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Feed Scroll */}
                <div className="h-[80vh] overflow-y-scroll pr-2">
                    <div className="flex flex-col gap-10">
                        {products.slice(0, 7).map((product) => (
                            <div
                                key={product.id}
                                className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
                            >
                                <img
                                    src={product.images?.[0] || ""}
                                    alt={product.name}
                                    className="w-full h-75 object-cover"
                                />
                                <div className="p-4">
                                    <h4 className="font-semibold">{product.name}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EpicCollection;
