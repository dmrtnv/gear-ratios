import { getGearRatios } from '@/lib/describeDrivetrain';
import { Drivetrain } from '@/types/Drivetrain';
import { Chart as ChartJS, CategoryScale, Colors, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Colors);

function Chart({ drivetrains, vertical = false }: { drivetrains: Drivetrain[]; vertical?: boolean }) {
  const [datasets, setDatasets] = useState<
    {
      grouped: boolean;
      label: string;
      data: { key: string; value: number }[];
      borderColor: string;
      backgroundColor: string;
    }[]
  >([]);

  useEffect(() => {
    const newData: typeof datasets = [];

    drivetrains.forEach((d, i) => {
      newData.push({
        grouped: false,
        label: d.name,
        backgroundColor: d.color.hexValue + 'AA',
        borderColor: d.color.hexValue,
        data: getGearRatios(d).map((g) => ({ ...g, key: `d${i + 1} ` + g.key })),
      });
    });

    setDatasets(newData);
  }, [drivetrains]);

  useEffect(() => {
    // console.log(datasets);
  }, [datasets]);

  return (
    <Bar
      data={{
        datasets: datasets.map((d) => ({ ...d })),
      }}
      options={{
        aspectRatio: vertical ? 1 : 2,
        indexAxis: vertical ? 'y' : 'x',
        parsing: vertical ? { xAxisKey: 'value', yAxisKey: 'key' } : { xAxisKey: 'key', yAxisKey: 'value' },
        scales: {
          x: {
            title: {
              text: 'Gears ( front - rear )',
              font: {
                weight: 'bolder',
                size: 16,
              },
              display: true,
              color: '#2A2A2D',
            },
            ticks: {
              color: '#2A2A2D',
              font: {
                weight: 'bold',
              },
            },

            grid: {
              display: false,
            },
          },
          y: {
            title: {
              text: 'Gear inches',
              font: {
                weight: 'bolder',
                size: 16,
              },
              display: true,
              color: '#2A2A2D',
            },
            ticks: {
              color: '#2A2A2D',
              font: {
                weight: 'bold',
              },
            },
          },
        },
      }}
    />
  );
}

export default Chart;
