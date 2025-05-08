import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialCryptoData } from '../../data/initialData';

export interface CryptoData {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  logo: string;
  price: number;
  percentChange1h: number;
  percentChange24h: number;
  percentChange7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
  chartData: number[];
  previousPrice?: number;
}

interface CryptoState {
  assets: CryptoData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  sortBy: keyof CryptoData;
  sortDirection: 'asc' | 'desc';
}

const initialState: CryptoState = {
  assets: initialCryptoData,
  status: 'idle',
  error: null,
  sortBy: 'rank',
  sortDirection: 'asc',
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateCryptoData: (state, action: PayloadAction<CryptoData[]>) => {
      // Keep track of previous prices to animate price changes
      state.assets = state.assets.map(asset => {
        const updatedAsset = action.payload.find(item => item.id === asset.id);
        if (updatedAsset) {
          return { 
            ...updatedAsset, 
            previousPrice: asset.price !== updatedAsset.price ? asset.price : asset.previousPrice
          };
        }
        return asset;
      });
    },
    updateSingleCrypto: (state, action: PayloadAction<Partial<CryptoData> & { id: string }>) => {
      const index = state.assets.findIndex(asset => asset.id === action.payload.id);
      if (index !== -1) {
        const updatedAsset = {
          ...state.assets[index],
          ...action.payload,
        };
        
        // Only set previousPrice if the price has changed
        if (action.payload.price && action.payload.price !== state.assets[index].price) {
          updatedAsset.previousPrice = state.assets[index].price;
        }
        
        state.assets[index] = updatedAsset;
      }
    },
    setSorting: (state, action: PayloadAction<{ sortBy: keyof CryptoData, sortDirection: 'asc' | 'desc' }>) => {
      state.sortBy = action.payload.sortBy;
      state.sortDirection = action.payload.sortDirection;
      
      // Sort the assets based on the new sorting parameters
      state.assets.sort((a, b) => {
        if (a[state.sortBy] < b[state.sortBy]) {
          return state.sortDirection === 'asc' ? -1 : 1;
        }
        if (a[state.sortBy] > b[state.sortBy]) {
          return state.sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
  },
});

export const { updateCryptoData, updateSingleCrypto, setSorting } = cryptoSlice.actions;

export default cryptoSlice.reducer;
