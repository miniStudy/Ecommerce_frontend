import React from 'react';
import Chart from "react-apexcharts";

const Home = () => {
    const series = [25, 25, 30, 15]; // Data series for the chart
    const total = series.reduce((acc, val) => acc + val, 0); // Calculate total

    const options = {
        chart: {
            dropShadow: {
                enabled: true,
                color: '#60A5FA', // Shadow color
                top: 2, // Vertical offset
                left: 2, // Horizontal offset
                blur: 5, // Blur amount
                opacity: 0.5 // Shadow opacity
            }
        },
        tooltip: {
            theme: 'dark', // Optional: Change tooltip theme
            style: {
                fontSize: '10px',
                color:'white',
                border:'1px solid white',
            },
            x: {
                show: true,
            },
        },
        plotOptions: {
            pie: { // Changed to pie for donut
                donut: {
                    size: '50%', // Adjust inner circle size
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            formatter: () => 'Total' // Optional label above the total
                        },
                        value: {
                            show: true,
                            formatter: () => total.toString() // Show total value
                        }
                    }
                }
            }
        },
        labels: ['Total Sales', 'Total Orders', 'Total Customers', 'Total Visitors'],
        dataLabels: {
            enabled: true,
            formatter: function (val, opts) {
                return opts.w.globals.labels[opts.seriesIndex] + ": " + val.toFixed(2) + "%";
            },
            style: {
                fontSize: '8px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 'normal',
                color: 'white', 
            }
        },
        legend: {
            show: false // This will hide the legend
        }
    };


    const barchartoptions = {
        chart: {
            toolbar: {
                show: false // Hide the toolbar
            }
        },
        tooltip: {
            theme: 'light', // Optional: Change tooltip theme
            style: {
                fontSize: '10px',
                color:'white',
                border:'1px solid white',
            },
            x: {
                show: true,
            },
        },
        xaxis: {
          categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        }
      };
      const barchartseries = [
        {
          name: "Sales",
          data: [30, 40, 25, 50, 49, 21, 70, 51]
        },
        {
            name: "Profit",
            data: [10, 30, 25, 30, 35, 14, 56, 40]
          },
      ];

    return (
        <>
            <h1 className='pagetitle'>Home</h1>
            <br />
            <div className='grid grid-cols-1 md:grid-cols-4 gap-3'>
                {/* Cards Section */}
                <div className='card home hover:bg-blue-100'>
                    <div className='card-body'>
                        <div className='grid grid-cols-3 gap-3'>
                            <div className='text-3xl d-flex justify-content-center align-items-center col-span-1 text-blue-400'>
                                <i className="fa-solid fa-hand-holding-dollar"></i>
                            </div>
                            <div className='col-span-2'>
                                <div className='text-gray-500'>Total Sales</div>
                                <div className='mt-2'>
                                    <div className='text-xl'><i className="fa-solid fa-indian-rupee-sign"></i>5000</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='card home hover:bg-blue-100'>
                    <div className='card-body'>
                        <div className='grid grid-cols-3 gap-3'>
                            <div className='text-3xl d-flex justify-content-center align-items-center col-span-1 text-blue-400'>
                                <i className="fa-solid fa-dolly"></i>
                            </div>
                            <div className='col-span-2'>
                                <div className='text-gray-500'>Total Orders</div>
                                <div className='mt-2'>
                                    <div className='text-xl'>350</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='card home hover:bg-blue-100'>
                    <div className='card-body'>
                        <div className='grid grid-cols-3 gap-3'>
                            <div className='text-3xl d-flex justify-content-center align-items-center col-span-1 text-blue-400'>
                                <i className="fa-solid fa-users"></i>
                            </div>
                            <div className='col-span-2'>
                                <div className='text-gray-500'>Total Customers</div>
                                <div className='mt-2'>
                                    <div className='text-xl'>120</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='card home hover:bg-blue-100'>
                    <div className='card-body'>
                        <div className='grid grid-cols-3 gap-3'>
                            <div className='text-3xl d-flex justify-content-center align-items-center col-span-1 text-blue-400'>
                                <i className="fa-solid fa-eye"></i>
                            </div>
                            <div className='col-span-2'>
                                <div className='text-gray-500'>Total Visitors</div>
                                <div className='mt-2'>
                                    <div className='text-xl'>5000</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Donut/Pie Chart */}
            <div className='mt-3'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-3'>
                    <div className='card'>
                        
                            <div className='text-xl mainfontclr text-center p-2'>Sales Data</div>
                            <hr className='my-3' />
                            <Chart options={options} series={series} type="donut" width="100%" />
                           
                    </div>

                    <div className='card col-span-1 md:col-span-2'>
                            <div className='text-xl mainfontclr text-center p-2'>Sales & Profit Data</div>
                            <hr className='my-3' />
                            <Chart options={barchartoptions} series={barchartseries} type="area" width="100%" />
                            
                    </div>

                    <div className='card col-span-1'>
                            <div className='text-xl mainfontclr text-center p-2'>Top Products & Sales</div>
                            <hr className='my-3' />
                            <div className='table-responsive p-3'>
                            <table className="table table-bordered border-primary">
                            <thead>
                                <tr>
                                <th scope="col">Code</th>
                                <th scope="col">Name</th>
                                <th scope='col'>Sales</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>A345</td>
                                    <td>nike tshirt</td>
                                    <td><i class="fa-light fa-indian-rupee-sign text-center"></i>5400</td>
                                    
                                </tr>
                                <tr>
                                    <td>A345</td>
                                    <td>nike tshirt</td>
                                    <td><i class="fa-light fa-indian-rupee-sign text-center"></i>5400</td>
                                    
                                </tr>
                                <tr>
                                    <td>A345</td>
                                    <td>nike tshirt</td>
                                    <td><i class="fa-light fa-indian-rupee-sign text-center"></i>5400</td>
                                    
                                </tr>
                                <tr>
                                    <td>A345</td>
                                    <td>nike tshirt</td>
                                    <td><i class="fa-light fa-indian-rupee-sign text-center"></i>5400</td>
                                    
                                </tr>
                                <tr>
                                    <td>A345</td>
                                    <td>nike tshirt</td>
                                    <td><i class="fa-light fa-indian-rupee-sign text-center"></i>5400</td>
                                    
                                </tr>
                                <tr>
                                    <td>A345</td>
                                    <td>nike tshirt</td>
                                    <td><i class="fa-light fa-indian-rupee-sign text-center"></i>5400</td>
                                    
                                </tr>
                                <tr>
                                    <td>A345</td>
                                    <td>nike tshirt</td>
                                    <td><i class="fa-light fa-indian-rupee-sign text-center"></i>5400</td>
                                    
                                </tr>
                                <tr>
                                    <td>A345</td>
                                    <td>nike tshirt</td>
                                    <td><i class="fa-light fa-indian-rupee-sign text-center"></i>5400</td>
                                    
                                </tr>
                                <tr>
                                    <td>A345</td>
                                    <td>nike tshirt</td>
                                    <td><i class="fa-light fa-indian-rupee-sign text-center"></i>5400</td>
                                    
                                </tr>
                                <tr>
                                    <td>A345</td>
                                    <td>nike tshirt</td>
                                    <td><i class="fa-light fa-indian-rupee-sign text-center"></i>5400</td>
                                    
                                </tr>
                                
                            </tbody>
                            </table>
                            </div>
                            
                    </div>

                </div>
                
            </div>
        </>
    );
};

export default Home;
