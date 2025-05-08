
import { useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { setSorting, CryptoData } from '../store/slices/cryptoSlice';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import PriceChangeIndicator from './PriceChangeIndicator';
import SparklineChart from './SparklineChart';
import { formatCurrency, formatNumber, formatPercent } from '../utils/formatters';

const CryptoTable = () => {
  const { assets, sortBy, sortDirection } = useAppSelector((state) => state.crypto);
  const dispatch = useAppDispatch();

  const handleSort = (column: keyof CryptoData) => {
    // If clicking the same column, toggle direction; otherwise, set to asc
    const newDirection = column === sortBy && sortDirection === 'asc' ? 'desc' : 'asc';
    dispatch(setSorting({ sortBy: column, sortDirection: newDirection }));
  };

  // Pre-format cryptoData for the table to avoid unnecessary recalculations
  const formattedData = useMemo(() => {
    return assets.map((crypto) => ({
      ...crypto,
      formattedPrice: formatCurrency(crypto.price),
      formattedMarketCap: formatCurrency(crypto.marketCap, 0),
      formattedVolume: formatCurrency(crypto.volume24h, 0),
      formattedCirculatingSupply: `${formatNumber(crypto.circulatingSupply)}M ${crypto.symbol}`,
      formattedMaxSupply: crypto.maxSupply ? `${formatNumber(crypto.maxSupply)}M` : '∞',
      priceChangeDirection: crypto.previousPrice 
        ? crypto.price > crypto.previousPrice 
          ? 'up' 
          : crypto.price < crypto.previousPrice 
            ? 'down' 
            : 'none'
        : 'none'
    }));
  }, [assets]);

  const renderSortIcon = (column: keyof CryptoData) => {
    if (sortBy !== column) return null;
    return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  const getSortableHeaderProps = (column: keyof CryptoData, label: string) => ({
    onClick: () => handleSort(column),
    className: `cursor-pointer select-none ${sortBy === column ? 'text-primary font-medium' : ''}`,
    children: (
      <div className="flex items-center gap-1">
        <span>{label}</span>
        {renderSortIcon(column)}
      </div>
    )
  });

  return (
    <div className="rounded-lg border overflow-hidden bg-card">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12" {...getSortableHeaderProps('rank', '#')}>
              </TableHead>
              <TableHead className="min-w-[180px]" {...getSortableHeaderProps('name', 'Name')}>
              </TableHead>
              <TableHead className="text-right" {...getSortableHeaderProps('price', 'Price')}>
              </TableHead>
              <TableHead className="text-right" {...getSortableHeaderProps('percentChange1h', '1h %')}>
              </TableHead>
              <TableHead className="text-right" {...getSortableHeaderProps('percentChange24h', '24h %')}>
              </TableHead>
              <TableHead className="text-right" {...getSortableHeaderProps('percentChange7d', '7d %')}>
              </TableHead>
              <TableHead className="text-right" {...getSortableHeaderProps('marketCap', 'Market Cap')}>
                <div className="flex items-center justify-end gap-1">
                  <span>Market Cap</span>
                  {renderSortIcon('marketCap')}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-5 w-5 p-0">
                          <Info className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="sr-only">Market Cap Info</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Market capitalization is the total value of a cryptocurrency.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableHead>
              <TableHead className="text-right" {...getSortableHeaderProps('volume24h', 'Volume(24h)')}>
                <div className="flex items-center justify-end gap-1">
                  <span>Volume(24h)</span>
                  {renderSortIcon('volume24h')}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-5 w-5 p-0">
                          <Info className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="sr-only">Volume Info</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">The total trading volume for this asset in the last 24 hours.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableHead>
              <TableHead className="text-right" {...getSortableHeaderProps('circulatingSupply', 'Circulating Supply')}>
                <div className="flex items-center justify-end gap-1">
                  <span>Circulating Supply</span>
                  {renderSortIcon('circulatingSupply')}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-5 w-5 p-0">
                          <Info className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="sr-only">Supply Info</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">The amount of coins that are circulating in the market.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableHead>
              <TableHead className="min-w-[140px]">Last 7 Days</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formattedData.map((crypto) => (
              <TableRow 
                key={crypto.id}
                className="hover:bg-muted/40"
              >
                <TableCell className="text-muted-foreground font-medium">
                  {crypto.rank}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                      {getCryptoLogo(crypto.symbol)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{crypto.name}</span>
                      <span className="text-xs text-muted-foreground">{crypto.symbol}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <PriceChangeIndicator
                    price={crypto.formattedPrice}
                    changeDirection={crypto.priceChangeDirection}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <span className={getPercentChangeColor(crypto.percentChange1h)}>
                    {crypto.percentChange1h > 0 && '+'}{formatPercent(crypto.percentChange1h)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <span className={getPercentChangeColor(crypto.percentChange24h)}>
                    {crypto.percentChange24h > 0 && '+'}{formatPercent(crypto.percentChange24h)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <span className={getPercentChangeColor(crypto.percentChange7d)}>
                    {crypto.percentChange7d > 0 && '+'}{formatPercent(crypto.percentChange7d)}
                  </span>
                </TableCell>
                <TableCell className="text-right">{crypto.formattedMarketCap}</TableCell>
                <TableCell className="text-right">
                  {crypto.formattedVolume}
                  <div className="text-xs text-muted-foreground">
                    {`${formatNumber(crypto.volume24h / crypto.price, 2)}M ${crypto.symbol}`}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {crypto.formattedCirculatingSupply}
                  <div className="w-full bg-muted h-1.5 mt-1 rounded-full overflow-hidden">
                    <div 
                      className="bg-primary h-full" 
                      style={{ 
                        width: `${crypto.maxSupply 
                          ? (crypto.circulatingSupply / crypto.maxSupply) * 100 
                          : 100}%` 
                      }}
                    ></div>
                  </div>
                </TableCell>
                <TableCell>
                  <SparklineChart 
                    data={crypto.chartData} 
                    trend={crypto.percentChange7d >= 0 ? 'up' : 'down'} 
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Helper functions
function getPercentChangeColor(percent: number): string {
  if (percent > 0) return 'text-crypto-increase';
  if (percent < 0) return 'text-crypto-decrease';
  return 'text-crypto-neutral';
}

function getCryptoLogo(symbol: string) {
  switch (symbol) {
    case 'BTC':
      return (
        <img
          src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
          alt="Bitcoin Logo"
          className="w-8 h-8"
        />
      );
    case 'ETH':
      return (
        <img
          src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
          alt="Ethereum Logo"
          className="w-8 h-8"
        />
      );
    case 'USDT':
      return (
        <img
          src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
          alt="Tether Logo"
          className="w-8 h-8"
        />
      );
    case 'XRP':
      return (
        <img
          src="https://s2.coinmarketcap.com/static/img/coins/64x64/52.png"
          alt="XRP Logo"
          className="w-8 h-8"
        />
      );
    case 'BNB':
      return (
        <img
          src="https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png"
          alt="BNB Logo"
          className="w-8 h-8"
        />
      );
    case 'SOL':
      return (
        <img
          src="https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png"
          alt="Solana Logo"
          className="w-8 h-8"
        />
      );
    default:
      return <div className="w-full h-full bg-primary/20 text-xs flex items-center justify-center">{symbol}</div>;
  }
}

export default CryptoTable;
