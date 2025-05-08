
import { CryptoData, updateCryptoData } from '../store/slices/cryptoSlice';
import { store } from '../store';

class MockWebSocketService {
  private intervalId: number | null = null;
  private cryptoData: CryptoData[] = [];

  constructor() {
    this.cryptoData = [...store.getState().crypto.assets];
  }

  connect() {
    console.log('🔌 WebSocket connection established');

    // Simulate WebSocket updates every 2 seconds
    this.intervalId = setInterval(() => {
      this.updatePrices();
    }, 2000) as unknown as number;

    return () => this.disconnect();
  }

  disconnect() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      console.log('🔌 WebSocket connection closed');
    }
  }

  private updatePrices() {
    const updatedData = this.cryptoData.map(crypto => {
      // Clone the original crypto data
      const updatedCrypto = { ...crypto };
      
      // For stablecoins (USDT), don't change the price much
      const isStableCoin = crypto.symbol === 'USDT';
      
      // Generate random price change percentage
      // Stablecoins will have very small fluctuations
      const changePercentage = isStableCoin 
        ? (Math.random() * 0.001 - 0.0005) 
        : (Math.random() * 0.02 - 0.01);
      
      // Apply price change
      const newPrice = crypto.price * (1 + changePercentage);
      updatedCrypto.price = parseFloat(newPrice.toFixed(newPrice < 10 ? 4 : 2));
      
      // Update percentage changes
      // For 1h change
      let newPercentChange = crypto.percentChange1h + (Math.random() * 0.4 - 0.2);
      if (isStableCoin) newPercentChange = (Math.random() * 0.01 - 0.005);
      updatedCrypto.percentChange1h = parseFloat(newPercentChange.toFixed(2));
      
      // For 24h change
      newPercentChange = crypto.percentChange24h + (Math.random() * 0.3 - 0.15);
      if (isStableCoin) newPercentChange = (Math.random() * 0.01 - 0.005);
      updatedCrypto.percentChange24h = parseFloat(newPercentChange.toFixed(2));
      
      // Update 24h volume (more volatile)
      const volumeChange = Math.random() * 0.05 - 0.025;
      updatedCrypto.volume24h = Math.round(crypto.volume24h * (1 + volumeChange));
      
      // Update chart data by adding a new point and removing the oldest
      const newDataPoint = updatedCrypto.chartData[updatedCrypto.chartData.length - 1] * 
                          (1 + (Math.random() * 0.02 - 0.01));
      updatedCrypto.chartData = [...updatedCrypto.chartData.slice(1), newDataPoint];
      
      return updatedCrypto;
    });

    // Save updated data for next iteration
    this.cryptoData = updatedData;
    
    // Dispatch action to update Redux store
    store.dispatch(updateCryptoData(updatedData));
  }
}

export default MockWebSocketService;
