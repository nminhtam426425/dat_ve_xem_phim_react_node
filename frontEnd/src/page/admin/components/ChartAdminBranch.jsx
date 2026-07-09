import React, { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Đăng ký các thành phần bắt buộc của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
)

const findMax = (array) => {
  if(!array) return 0
  let max = 0

  for(let i of array){
    if(i > max)
      max = i
  }
    
  return Math.ceil(max) + average(array)
}

const average = (array) => {
  if(!array) return 0   
  let length = array.length
  let sum = 0
  for(let i of array){
    sum+=parseInt(i)
  }
  return Math.floor((sum/length)*2)
}

const ChartAdminBranch = ({valuesRevenue, typeMark}) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ datasets: [] });

  const backendDataLabels = {
    weeks: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'],
    months: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4']
  }

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const ctx = chart.ctx;

    const primaryColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-primary').trim() || '#b8000b';

    // Khởi tạo Gradient cho vùng Background phía dưới đồ thị (Area)
    const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
    gradient.addColorStop(0, `${primaryColor}33`); // Đỏ với 20% opacity (tương đương opacity="0.2")
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); 

    setChartData({
      labels: backendDataLabels[typeMark],
      datasets: [
        {
          label: 'Doanh thu',
          data: valuesRevenue,
          backgroundColor: gradient,
          borderColor: primaryColor,
          fill: true,
          tension: 0.4,
      
          pointRadius: 0,          
          pointHoverRadius: 6,     // Khi hover chuột vào vùng dữ liệu, chấm tròn kích thước 6px sẽ xuất hiện
          pointBackgroundColor: primaryColor,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
        },
      ]
    })
  }, [valuesRevenue])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'index',       // Khi hover vào cột nào sẽ hiện điểm của ngày đó, không cần rà chính xác vào chấm tròn
        intersect: false,    // Người dùng chỉ cần đưa chuột vào vùng dọc của ngày đó là đã kích hoạt hiển thị
      },
    plugins: {
      tooltip: {
        enabled: true, // Bật tooltip khi di chuột hiển thị số liệu chính xác
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Ẩn các đường lưới dọc
        },
        ticks: {
          color: 'rgba(100, 116, 139, 0.8)', // Màu chữ trục X
          font: { size: 12, weight: '500' },
        },
        border: {
          color: 'rgba(0, 0, 0, 0.05)', // Đường viền ngăn cách trục X
        }
      },
      y: {
        min: 0,
        max: findMax(valuesRevenue),
        ticks: {
          stepSize: average(valuesRevenue), 
          color: 'rgba(100, 116, 139, 0.6)', // Màu chữ trục Y text-secondary/60
          font: { size: 10 },
          callback: function(value) {
            return value === 0 ? '0' : parseFloat(value / 1000000).toFixed(1) + 'M';
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)', // Màu của các đường lưới ngang
        },
        border: {
          display: false, // Ẩn trục dọc bên trái
        }
      },
    },
  };

  return (
    <div className="w-full h-[300px] px-2">
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
}
export default ChartAdminBranch