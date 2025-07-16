import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { common } from '@mui/material/colors';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

type CoinChartProps = {
  data: [number, number][];
  days: number;
};

const simplifyChartData = (data: [number, number][]): [number, number][] => {
  const dailyData = new Map<string, number>();

  data.forEach(([timestamp, price]) => {
    const dateKey = new Date(timestamp).toLocaleDateString();
    dailyData.set(dateKey, price);
  });

  return Array.from(dailyData.entries())
    .map(([dateString, price]) => {
      const date = new Date(dateString);
      date.setHours(12, 0, 0, 0);
      return [date.getTime(), price] as [number, number];
    })
    .sort((a, b) => a[0] - b[0]);
};

const CoinChart: React.FC<CoinChartProps> = ({ data, days }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-400 italic">⚠️ No data available to display the chart.</p>;
  }

  const simplifiedData = simplifyChartData(data);
  const xAxisDates = simplifiedData.map(([ts]) => new Date(ts));
  const yAxisPrices = simplifiedData.map(([, price]) => price);

  const formatDate = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
  }).format;

  const showMarks = days <= 7;

  return (
    <LineChart
      height={300}
      series={[
        {
          data: yAxisPrices,
          curve: 'catmullRom',
          showMark: showMarks,
          color: '#5e2bff',
          valueFormatter: (v) => v != null ? v.toFixed(6) : '',
        },
      ]}
      xAxis={[
        {
          data: xAxisDates,
          scaleType: 'time',
          valueFormatter: (date) => formatDate(date),
        },
      ]}
      yAxis={[
        {
          valueFormatter: (v) => v.toFixed(6), // 👈 dokładność na osi Y
        },
      ]}
      sx={{
        [`.${axisClasses.root}`]: {
          [`.${axisClasses.tick}`]: { stroke: '#FFFFFF', strokeWidth: 1 },
          [`.${axisClasses.line}`]: { stroke: '#FFFFFF', strokeWidth: 1 },
          [`.${axisClasses.tickLabel}`]: { fill: common.white },
        },
        '.MuiChartsGrid-line': {
          stroke: '#3A4048',
        },
      }}
      grid={{ vertical: true, horizontal: true }}
    />
  );
};

export default CoinChart;
