import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [allMarkets,setAllMarkets] = useState([]);
  const [markets,setMarkets] = useState([])

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem('supply_token');
      const savedUser = localStorage.getItem('supply_user');
      const savedRole = localStorage.getItem('supply_user_role');

      if (savedToken && savedUser && savedRole) {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
        setRole(savedRole);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Failed to parse auth data from localStorage", error);
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  }, []);

  // 🚀 Fetch products only if role is manufacturer
  useEffect(() => {
    const fetchManProducts = async () => {
      if (role=="Retailer" &&  token) {
        try {
          const res = await axios.get('http://localhost:3000/api/products', {
          });
          if(res){
            console.log(res.data)
          }
          setProducts(res.data.products || []);
        } catch (error) {
          console.error("Failed to fetch manufacturer products:", error);
        }
      }
    };

    fetchManProducts();

  }, [role, token]);

  useEffect(() => {
    const fetchAllMarkets = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/retail/markets/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (res && res.data) {
          console.log(res.data);
          setAllMarkets(res.data) // backend should return { markets: [...] } or just [...]
          // if it's { markets: [...] }, then log res.data.markets
          // if it's just an array, log res.data
        }
      } catch (error) {
        console.error("Error fetching markets:", error);
      }
    };
    const fetchMarkets = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/retail", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setMarkets(data);
      } catch (err) {
        console.error(err);
      }
    };
  
    if ((role=='Retailer' || role=='Consumer') && token) {
      fetchAllMarkets();
    }
    if(role=='Retailer' && token){
      fetchMarkets();
    }
  }, [token]);

  useEffect(() => {
    const fetchpod = async () =>{
      if(role==="Manufacturer" && token){
        try {
          const res = await axios.get('http://localhost:3000/api/orders/manufacturer', {
            headers: { Authorization: `Bearer ${token}` },
          });
          if(res){
            console.log(res.data)
            setProducts(res.data || []);
          }
        }
        catch (error) {
          console.error("Failed to fetch manufacturer products:", error);
        }
      }
    }
    fetchpod();
  },[role,token])

  const login = ({ token, Role, ...userData }) => {
    localStorage.setItem('supply_token', token);
    localStorage.setItem('supply_user', JSON.stringify(userData));
    localStorage.setItem('supply_user_role', Role);

    setToken(token);
    setUser(userData);
    setRole(Role);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('supply_token');
    localStorage.removeItem('supply_user');
    localStorage.removeItem('supply_user_role');

    setToken(null);
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
    setProducts([]);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, role, isAuthenticated, loading, login, logout, products ,setProducts,allMarkets,markets,setMarkets}}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
