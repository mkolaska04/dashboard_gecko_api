
import CoinCard from './CoinCard';

function CoinList({ coinList, loading, error }: { coinList: Array<any>, loading: boolean, error: string | null }) {
  if (loading) return <p>⏳ Loading...</p>;
  if (error) return <p className="text-error">❌ {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {coinList.map(coin => (
          <div className="flex items-center space-x-4">
           <CoinCard key={coin.id} coin={coin} />
            </div>
      ))}
    </div>
  );
}

export default CoinList;