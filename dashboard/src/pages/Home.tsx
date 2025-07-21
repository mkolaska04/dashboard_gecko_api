import CoinList from '../components/CoinList';
import Footer from '../components/Footer';
import Searchbar from '../components/Searchbar';
import { useCoins } from '../context/CoinContext';
import { useEffect, useState } from 'react';
function Home() {
  const { coins, loading, error } = useCoins();

  type Coin = {
    id: string;
    name: string;
  };

  const [originalCoins, setOriginalCoins] = useState<Coin[]>([]);
  const [coinList, setCoinList] = useState<Coin[]>([]);

  useEffect(() => {
    setOriginalCoins(coins);  
    setCoinList(coins);       
  }, [coins]);

  function onAction(query: string) {
    if (!query || query.trim() === '') {
      setCoinList(originalCoins);
      return;
    }

    const filteredCoins = originalCoins.filter(coin =>
      coin.name.toLowerCase().includes(query.toLowerCase()) ||
      coin.id.toLowerCase().includes(query.toLowerCase())
    );
    setCoinList(filteredCoins);
  }

  return (
    <div>
      <div className="w-full bg-box p-4 mb-8 shadow-md flex flex-col gap-4 md:flex-row justify-start items-center">
        <h2 className="text-2xl font-bold text-secondary cursor-default">CoinCheck</h2>
        <Searchbar onAction={onAction} />
      </div>

      <div className="space-y-8 max-w-7xl w-3/4 mx-auto">
        <CoinList coinList={coinList} loading={loading} error={error} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
