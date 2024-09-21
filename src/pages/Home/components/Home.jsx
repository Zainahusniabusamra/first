import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';  
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Home.css'; 


export default function Home() {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [Loader, setLoader] = useState([]);
  const [error, setError] = useState([]);



  const navigate = useNavigate(); 
  const getSearchCategories = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/categories/search?q=${searchQuery}`);
    const data = await response.json();
    setCategories(data.categories.slice(0, 10));
  }

  useEffect(() => {
    if (searchQuery) {
      getSearchCategories();
    }
  }, [searchQuery]);

  const getInitialCategories = async () => {
    try{
      const response = await fetch(`${import.meta.env.VITE_API_URL}/categories/active?limit=9`);
      const data = await response.json();
      console.log(data);
      setCategories(data.categories.slice(0, 10));
      setError('');
    } catch(error){
      setError('error cant load data');
    } finally{
      setLoader(false);
    }
  }

  useEffect(() => {
    getInitialCategories();
  }, []);

  const settings = {
    dots: true,
    infinite: categories.length > 4,
    speed: 500,
    slidesToShow: Math.min(4, categories.length),
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, categories.length),
          slidesToScroll: 1,
          infinite: categories.length > 3,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(2, categories.length),
          slidesToScroll: 1,
          infinite: categories.length > 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  if(Loader){
    return <p>Loading....</p>
  }

  return (
    <>
      <p>{error}</p>
      <div className="container">
        <div className="search-bar">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for category..."
          />
          <i className="search-icon fas fa-search"></i>
        </div>

        {categories.length > 0 && (
          <Slider {...settings} className="slider">
            {categories.map(category =>
              <div 
                className={`category ${categories.length === 1 ? 'single-category' : ''}`} 
                key={category._id}
                onClick={() => navigate(`/products/${category._id}`)}
              >
                <img src={category.image.secure_url} alt={category.name} className="category-image" />
              </div>
            )}
          </Slider>
        )}
      </div>
    </>
  );
}

