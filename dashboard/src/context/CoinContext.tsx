import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface Coin {
  id: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

interface CoinContextType {
  coins: Coin[];
  loading: boolean;
  error: string | null;
}

const CoinContext = createContext<CoinContextType>({
  coins: [],
  loading: true,
  error: null,
});

export const CoinProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${API}/api/coins/markets?vs_currency=usd&order=market_cap_desc`, {
          signal: AbortSignal.timeout(10000), // 10 second timeout
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch coins: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('No coin data received');
        }
        
        setCoins(data);
      } catch (err) {
        console.error('Error fetching coins:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load cryptocurrency data. Please check if the backend server is running.';
        setError(errorMessage);
        setCoins([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []); 

  const value = { coins, loading, error };

  return <CoinContext.Provider value={value}>{children}</CoinContext.Provider>;
};

export const useCoins = () => {
  return useContext(CoinContext);
};
