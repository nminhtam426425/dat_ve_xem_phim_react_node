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
);

const ChartAdminBranch = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ datasets: [] });

  // Giả lập dữ liệu nhận về từ Back-end (Phù hợp với cấu trúc tư duy đã bàn)
  const backendData = {
    labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'],
    values: [62.5, 31.25, 125, 75, 187.5, 156.25, 218.75] // Thứ ương đương với các điểm cong cũ của bạn
  };

//   const backendData = {
//     labels: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'],
//     values: [100, 150.2, 80, 20] 
//   };

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
      labels: backendData.labels,
      datasets: [
        {
          label: 'Doanh thu',
          data: backendData.values,
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
    });
  }, []);

  // Cấu hình các trục hiển thị của Chart.js để khớp với Tailwind cũ của bạn
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
        max: 250, // Định mức cao nhất là 250M giống thiết kế của bạn
        ticks: {
          stepSize: 50, // Chia đều khoảng cách mỗi ô là 50 (0, 50, 100, 150, 200, 250)
          color: 'rgba(100, 116, 139, 0.6)', // Màu chữ trục Y text-secondary/60
          font: { size: 10 },
          callback: function(value) {
            return value === 0 ? '0' : value + 'M'; // Thêm chữ 'M' vào sau số
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