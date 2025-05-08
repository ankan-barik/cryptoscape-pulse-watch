
import { CryptoData } from '../store/slices/cryptoSlice';

// Helper function to generate random chart data
const generateChartData = (length: number, trend: 'up' | 'down' | 'stable' = 'up'): number[] => {
  const data: number[] = [];
  let value = 100;
  
  for (let i = 0; i < length; i++) {
    if (trend === 'up') {
      // Upward trend with some volatility
      value += Math.random() * 10 - 3;
    } else if (trend === 'down') {
      // Downward trend with some volatility
      value -= Math.random() * 8 - 3;
    } else {
      // Stable with small fluctuations
      value += Math.random() * 4 - 2;
    }
    // Ensure value doesn't go below 50
    value = Math.max(50, value);
    data.push(value);
  }
  
  return data;
};

export const initialCryptoData: CryptoData[] = [
  {
    id: 'bitcoin',
    rank: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    logo: '/lovable-uploads/f6fee511-a177-493c-9ee7-18433938367e.png', // Will use correct logo in component
    price: 93759.48,
    percentChange1h: 0.43,
    percentChange24h: 0.93,
    percentChange7d: 11.11,
    marketCap: 1861618902186,
    volume24h: 43874950947,
    circulatingSupply: 19.85,
    maxSupply: 21,
    chartData: generateChartData(30, 'up'),
  },
  {
    id: 'ethereum',
    rank: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    logo: '/lovable-uploads/f6fee511-a177-493c-9ee7-18433938367e.png', // Will use correct logo in component
    price: 1802.46,
    percentChange1h: 0.60,
    percentChange24h: 3.21,
    percentChange7d: 13.68,
    marketCap: 217581279327,
    volume24h: 23547469307,
    circulatingSupply: 120.71,
    maxSupply: null,
    chartData: generateChartData(30, 'up'),
  },
  {
    id: 'tether',
    rank: 3,
    name: 'Tether',
    symbol: 'USDT',
    logo: '/lovable-uploads/f6fee511-a177-493c-9ee7-18433938367e.png', // Will use correct logo in component
    price: 1.00,
    percentChange1h: 0,
    percentChange24h: 0,
    percentChange7d: 0.04,
    marketCap: 145320022085,
    volume24h: 92288882007,
    circulatingSupply: 145.27,
    maxSupply: null,
    chartData: generateChartData(30, 'stable'),
  },
  {
    id: 'xrp',
    rank: 4,
    name: 'XRP',
    symbol: 'XRP',
    logo: '/lovable-uploads/f6fee511-a177-493c-9ee7-18433938367e.png', // Will use correct logo in component
    price: 2.22,
    percentChange1h: 0.46,
    percentChange24h: 0.54,
    percentChange7d: 6.18,
    marketCap: 130073814966,
    volume24h: 5131481491,
    circulatingSupply: 58.39,
    maxSupply: 100,
    chartData: generateChartData(30, 'up'),
  },
  {
    id: 'bnb',
    rank: 5,
    name: 'BNB',
    symbol: 'BNB',
    logo: '/lovable-uploads/f6fee511-a177-493c-9ee7-18433938367e.png', // Will use correct logo in component
    price: 606.65,
    percentChange1h: 0.09,
    percentChange24h: -1.20,
    percentChange7d: 3.73,
    marketCap: 85471956947,
    volume24h: 1874281784,
    circulatingSupply: 140.89,
    maxSupply: 200,
    chartData: generateChartData(30, 'up'),
  },
  {
    id: 'solana',
    rank: 6,
    name: 'Solana',
    symbol: 'SOL',
    logo: '/lovable-uploads/f6fee511-a177-493c-9ee7-18433938367e.png', // Will use correct logo in component
    price: 151.51,
    percentChange1h: 0.53,
    percentChange24h: 1.26,
    percentChange7d: 14.74,
    marketCap: 78381958631,
    volume24h: 4881674486,
    circulatingSupply: 517.31,
    maxSupply: null,
    chartData: generateChartData(30, 'up'),
  }
];
