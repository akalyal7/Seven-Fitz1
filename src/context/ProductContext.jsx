import { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

                const [productsRes, categoriesRes, colorsRes] = await Promise.all([
                    fetch(`${baseUrl}/products`),
                    fetch(`${baseUrl}/categories`),
                    fetch(`${baseUrl}/colors`)
                ]);

                const productsData = await productsRes.json();
                const categoriesData = await categoriesRes.json();
                const colorsData = await colorsRes.json();

                setProducts(productsData);
                setCategories(categoriesData);
                setColors(colorsData);
            } catch (error) {
                console.error("API Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <ProductContext.Provider value={{ products, categories, colors, loading }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);
