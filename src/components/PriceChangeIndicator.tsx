
import { useState, useEffect } from 'react';

interface PriceChangeIndicatorProps {
  price: string;
  changeDirection: 'up' | 'down' | 'none';
}

const PriceChangeIndicator = ({ price, changeDirection }: PriceChangeIndicatorProps) => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    if (changeDirection !== 'none') {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [price, changeDirection]);

  return (
    <div 
      className={`inline-block px-1 rounded ${
        animate 
          ? changeDirection === 'up' 
            ? 'animate-pulse-price' 
            : 'animate-pulse-price-down'
          : ''
      }`}
    >
      <span
        className={
          changeDirection === 'up' 
            ? 'text-crypto-increase' 
            : changeDirection === 'down' 
              ? 'text-crypto-decrease' 
              : ''
        }
      >
        {price}
      </span>
    </div>
  );
};

export default PriceChangeIndicator;
