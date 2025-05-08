
import { useMemo, useRef, useEffect } from 'react';

interface SparklineChartProps {
  data: number[];
  trend: 'up' | 'down' | 'neutral';
  height?: number;
}

const SparklineChart = ({ data, trend, height = 50 }: SparklineChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  const lineColor = trend === 'up' ? '#16c784' : trend === 'down' ? '#ea3943' : '#8E9196';
  
  const normalizedData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    // Find min and max for proper scaling
    const min = Math.min(...data) * 0.99;
    const max = Math.max(...data) * 1.01;
    const range = max - min;
    
    // Normalize the data to fit in the SVG height
    return data.map(value => 1 - ((value - min) / range));
  }, [data]);
  
  useEffect(() => {
    if (!svgRef.current || normalizedData.length === 0) return;
  }, [normalizedData]);
  
  if (!data || data.length === 0) return null;
  
  const width = 140;
  const points = normalizedData.map((value, i) => 
    `${(i / (data.length - 1)) * width},${value * height}`
  ).join(' ');
  
  return (
    <div className="flex justify-center">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id={`sparkline-gradient-${trend}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0.2" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Area fill */}
        <path
          d={`M 0,${height} ${points} ${width},${height} Z`}
          fill={`url(#sparkline-gradient-${trend})`}
        />
        
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke={lineColor}
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default SparklineChart;
