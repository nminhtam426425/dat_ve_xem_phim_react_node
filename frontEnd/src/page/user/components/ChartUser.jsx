import React, { useEffect, useRef, useState } from 'react'
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Filler} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
)

const average = (array) => {
  if(!array) return 0   
  let length = array.length
  let sum = 0
  for(let i of array){
    sum+=parseInt(i)
  }
  return Math.floor((sum/length)*2)
}

const findMax = (array) => {
  if(!array) return 0
  let max = 0

  for(let i of array){
    if(i > max)
      max = i
  }
  return Math.ceil(max) + average(array)
}


const ChartUser = ({spending}) => {
  const chartRef = useRef(null)
  const [chartData, setChartData] = useState({ datasets: [] })

  useEffect(() => {
    const chart = chartRef.current
    if (!chart) return

    const ctx = chart.ctx

    const primaryColor = '#4ade80'

    const hoverColor = '#5f5e5e'

    // Khởi tạo Gradient cho vùng Background phía dưới đồ thị (Area)
    const gradient = ctx.createLinearGradient(0, 0, 0, chart.height)
    gradient.addColorStop(0, `${primaryColor}33`); // Đỏ với 20% opacity (tương đương opacity="0.2")
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

    setChartData({
      labels: spending?.label || [],
      datasets: [
        {
          label: 'Đã chi',
          data: spending?.payment || [],
          backgroundColor: gradient,
          borderColor: primaryColor,
          fill: true,
          tension: 0.4,
      
          pointRadius: 0,          
          pointHoverRadius: 6,     // Khi hover chuột vào vùng dữ liệu, chấm tròn kích thước 6px sẽ xuất hiện
          pointBackgroundColor: hoverColor,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
        },
      ]
    })
  }, [spending])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'index',       // Khi hover vào cột nào sẽ hiện điểm của ngày đó
        intersect: false,    // hover vào vùng dọc của ngày đó là đã kích hoạt hiển thị
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
          color: 'rgba(255, 255, 255, 1)', // Màu chữ trục X
          font: { size: 12, weight: '500' },
        },
        border: {
          color: 'rgba(255, 255, 255, 1)', 
        }
      },
      y: {
        min: 0,
        max: findMax(spending?.payment || []), 
        ticks: {
          stepSize: average(spending?.payment || []), 
          color: 'rgba(255, 255, 255, 1)', // Màu chữ trục Y text-secondary/60
          font: { size: 10,  weight: '500' },
          callback: function(value) {
            return value === 0 ? '0' : parseFloat(value / 1000000).toFixed(1) + ' Triệu';
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', // Màu của các đường lưới ngang
        },
        border: {
           color: 'rgba(255, 255, 255, 1)', 
        }
      },
    },
  }

  return (
    <div className="w-full h-[300px] px-2">
        <Line ref={chartRef} data={chartData} options={options} />
    </div>
  )
}
export default ChartUser