import { useState, useEffect } from 'react';
import PopUp from './PopUp';
import CoinChart from './CoinChart';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface Coin {
  id: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

function CoinCard({ coin }: { coin: Coin }) {
  const [isOpen, setIsOpen] = useState(false);
  const [chartData, setChartData] = useState<{ prices: [number, number][] } | null>(null);
  const [, setCoinData] = useState(null);
  const [range, setRange] = useState("7");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const fetchData = async () => {
      setLoading(true);

      try {
        const res1 = await fetch(`${API}/api/coins/${coin.id}`);
        const data = await res1.json();
        const res2 = await fetch(
          `${API}/api/market_chart/${coin.id}?vs_currency=usd&days=${range}`
        );
        const chart = await res2.json();

        setCoinData(data);
        setChartData(chart);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isOpen, range]);

  const handleRangeChange = (r: string) => setRange(r);

  return (
    < div className="bg-box w-full p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        <div className="flex gap-2 mb-2 text-lg max-h-10 max-w-[384px] items-center">
          <img src={coin.image} alt={coin.name} className="w-10 h-10 flex-shrink-0" />
          <span
            className="truncate block max-w-[320px] cursor-help"
            title={coin.name}
          >
            {coin.name}
          </span>
        </div>
        <div className=" w-full flex justify-between items-center">
          ${coin.current_price} <span className={
            coin.price_change_percentage_24h < 0 ? "text-error" : "text-success"
          }>{coin.price_change_percentage_24h.toFixed(2)}%</span>
        </div>
      </div>

      <PopUp hidden={!isOpen} onClose={() => setIsOpen(false)} title={coin.name}>
        <div className="mb-4 flex gap-2">
          {["1", "7", "30", "365", "max"].map((r) => (
            <button
              key={r}
              onClick={() => handleRangeChange(r)}
              className={`px-3 py-1 rounded ${range === r ? "bg-primary text-white" : "bg-btn"
                }`}
            >
              {r === "1" ? "1D" : r === "7" ? "7D" : r === "30" ? "1M" : r === "365" ? "1Y" : "Max"}
            </button>
          ))}
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : chartData && chartData.prices ? (
          <CoinChart data={chartData.prices} days={range === "max" ? 0 : Number(range)} />
        ) : (
          <p className="text-error">No data available</p>
        )}
      </PopUp>
    </div>
  );
}

export default CoinCard;
