import { Drivetrain } from '@/types/Drivetrain';
import { Chart as ChartJS, CategoryScale, Colors, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Colors);

function Chart({ drivetrains, vertical = false }: { drivetrains: Drivetrain[]; vertical?: boolean }) {
  const [datasets, setDatasets] = useState<
    { label: string; data: { key: string; value: number }[]; borderColor: string; backgroundColor: string }[]
  >([]);

  useEffect(() => {
    const getGearRatios = ({
      cassette,
      crankset,
      wheelDiameter = 28,
    }: {
      cassette: number[];
      crankset: number[];
      wheelDiameter?: number;
    }) => {
      // Gear inches =
      // Diameter of drive wheel in inches × (number of teeth in front chainring / number of teeth in rear sprocket).
      // Normally rounded to nearest whole number.

      const gearRatios: { key: string; value: number }[] = [];
      let startLeft = 0;

      for (let i = 0; i < crankset.length - 1 || i === 0; i++) {
        for (let jl = startLeft, jr = cassette.length - 1; jl < cassette.length && jr >= 0; jl++, jr--) {
          if (crankset.length === 1) {
            gearRatios.push({
              key: `${crankset[0]}-${cassette[jl]}`,
              value: Math.round(wheelDiameter * (crankset[0] / cassette[jl])),
            });
            continue;
          }

          const left = {
            key: `${crankset[i]}-${cassette[jl]}`,
            value: Math.round(wheelDiameter * (crankset[i] / cassette[jl])),
          };
          const right = {
            key: `${crankset[i + 1]}-${cassette[jr]}`,
            value: Math.round(wheelDiameter * (crankset[i + 1] / cassette[jr])),
          };

          if (crankset.length === 2) {
            if (left.value < right.value) {
              gearRatios.push(left, right);
            }
            if (left.value === right.value) {
              gearRatios.push(right);
            }
          }

          if (crankset.length === 3) {
            if (left.value < right.value) {
              if (i === 0) {
                gearRatios.push(left);
                startLeft = jr;
              } else {
                gearRatios.push(left, right);
              }
            }
            if (left.value === right.value) {
              gearRatios.push(right);
            }
          }
        }
      }

      // console.log(gearRatios);

      return gearRatios.toSorted((a, b) => a.value - b.value);
    };

    const newData: typeof datasets = [];

    drivetrains.forEach((d) => {
      newData.push({
        label: d.name,
        backgroundColor: d.color.hexValue + 'AA',
        borderColor: d.color.hexValue,
        data: getGearRatios({ cassette: d.cassette, crankset: d.crankset }),
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
