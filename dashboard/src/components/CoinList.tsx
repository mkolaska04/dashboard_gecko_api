
import CoinCard from './CoinCard';

interface Coin {
  id: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

interface CoinListProps {
  coinList: Coin[];
  loading: boolean;
  error: string | null;
}

function CoinList({ coinList, loading, error }: CoinListProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-pulse text-4xl mb-4">⏳</div>
        <p className="text-xl text-secondary">Loading cryptocurrencies...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-error text-xl mb-4">❌ {error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-primary hover:bg-opacity-80 text-white px-6 py-2 rounded-lg transition-all"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!coinList || coinList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-xl text-gray-400">No cryptocurrencies found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {coinList.map(coin => (
        <CoinCard key={coin.id} coin={coin} />
      ))}
    </div>
  );
}

export default CoinList;