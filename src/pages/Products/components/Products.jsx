import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Products.css';  

export default function Products() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${id}`);
        setProducts(data.products);
      } catch (error) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProducts();
    }
  }, [id]);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  const addToCart= async (id)=>{
    const token = localStorage.getItem('userToken');
    const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/cart` , {
      productId:id
    } , {
      headers:{
        Authorization:`Tariq__${token}`
      }
    });
  }

  return (
    <div className="products-container">
      <h2>Products</h2>
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.mainImage.secure_url} alt={product.name} className="product-image" />
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">Price: ${product.price}</p>
              </div>
              <button onClick={()=>addToCart(product._id)} className='btn btn-outline-danger'> add to cart </button>
            </div>
          ))
        ) : (
          <p>No products available in this category.</p>
        )}
      </div>
    </div>
  );
}


