
import { Button } from './ui/button';
import { RefreshCw } from 'lucide-react';

interface HeaderProps {
  refreshData: () => void;
}

const Header = ({ refreshData }: HeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cryptocurrency Prices</h1>
        <p className="text-muted-foreground">
          Real-time cryptocurrency price tracker with simulated market updates
        </p>
      </div>
      <Button 
        size="sm"
        variant="outline"
        onClick={refreshData}
        className="flex items-center gap-2"
      >
        <RefreshCw className="h-4 w-4" />
        Refresh Data
      </Button>
    </div>
  );
};

export default Header;
