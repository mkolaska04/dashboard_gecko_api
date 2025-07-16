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
      try {
        const response = await fetch(`${API}/api/coins/markets?vs_currency=usd&order=market_cap_desc`);
        if (!response.ok) {
          throw new Error('Błąd podczas pobierania listy monet');
        }
        const data = await response.json();
        setCoins(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []); // Pusta tablica zależności oznacza: uruchom tylko raz!

  const value = { coins, loading, error };

  return <CoinContext.Provider value={value}>{children}</CoinContext.Provider>;
};

// Własny hook, aby ułatwić korzystanie z kontekstu
export const useCoins = () => {
  return useContext(CoinContext);
};
