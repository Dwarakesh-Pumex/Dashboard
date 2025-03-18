import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const WeatherMetricsContext = createContext();

export const WeatherMetricsProvider = ({ children }) => {
  const [metrics, setMetrics] = useState(null);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);      

  const token = localStorage.getItem('jwtToken')?.trim();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/profile/weather/Tukwila", {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setMetrics(response.data); 
      } catch (error) {
        console.error("Error fetching metrics:", error);
        setError(error.message);   
      } finally {
        setLoading(false);        
      }
    };

    if (token) {
      fetchData();
      const interval = setInterval(fetchData, 10000);  
      return () => clearInterval(interval);            
    }
  }, [token]);

  return (
    <WeatherMetricsContext.Provider value={{ metrics, loading, error }}>
      {children}
    </WeatherMetricsContext.Provider>
  );
};

export const useWeatherMetrics = () => useContext(WeatherMetricsContext);
