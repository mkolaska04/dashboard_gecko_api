// backend/index.js
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import rateLimit from 'express-rate-limit';
import apicache from 'apicache';

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuta
  max: 30,             // max 30 zapytań na minutę z jednego IP
  message: 'Za dużo zapytań – spróbuj za chwilę.',
});

const app = express();
const PORT = process.env.PORT || 5000;

const API_BASE_URL = 'https://api.coingecko.com/api/v3';

app.use(limiter);
app.use(cors());
const cache = apicache.middleware;

app.get('/api/coins/markets', cache('2 minutes'), async (req, res) => {
  try {
    const { vs_currency = 'usd', order = 'market_cap_desc' } = req.query;
    const url = `${API_BASE_URL}/coins/markets?vs_currency=${vs_currency}&order=${order}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Błąd pobierania listy monet.' });
  }
});

app.get('/api/search/trending', cache('5 minutes'), async (req, res) => {
  try {
    const url = `${API_BASE_URL}/search/trending`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Błąd pobierania monet w trendach.' });
  }
});

app.use(cors()); 
app.get('/api/coins/:id', cache('30 seconds'), async (req, res) => {
  try {
    const id = req.params.id;
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Błąd pobierania danych.' });
  }
});

// Proxy dla wykresów
app.get('/api/market_chart/:id', async (req, res) => {
  const { id } = req.params;
  const { days = 7, vs_currency = 'usd' } = req.query;

  try {
    const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${vs_currency}&days=${days}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Błąd pobierania wykresu.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend proxy działa na http://localhost:${PORT}`);
});
