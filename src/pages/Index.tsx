
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { updateCryptoData } from '../store/slices/cryptoSlice';
import { initialCryptoData } from '../data/initialData';
import MockWebSocketService from '../utils/mockWebSocket';
import Header from '../components/Header';
import CryptoTable from '../components/CryptoTable';

const CryptoApp = () => {
  const [wsService, setWsService] = useState<MockWebSocketService | null>(null);

  useEffect(() => {
    // Initialize the mock WebSocket service
    const service = new MockWebSocketService();
    
    // Connect to the "WebSocket"
    const disconnect = service.connect();
    
    // Save the service to state
    setWsService(service);
    
    // Cleanup when component unmounts
    return () => {
      disconnect();
    };
  }, []);

  const handleRefresh = () => {
    // Reset to initial data
    store.dispatch(updateCryptoData(initialCryptoData));
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 md:px-8">
      <div className="container mx-auto">
        <Header refreshData={handleRefresh} />
        <CryptoTable />
        
        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <p>Disclaimer: This is a demo application with simulated data.</p>
          <p className="mt-1">© 2025 CryptoScape Pulse Watch</p>
        </footer>
      </div>
    </div>
  );
};

// Wrap the component with Redux Provider
const Index = () => (
  <Provider store={store}>
    <CryptoApp />
  </Provider>
);

export default Index;
