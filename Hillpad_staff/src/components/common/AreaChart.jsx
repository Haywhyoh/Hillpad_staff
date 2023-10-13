import React from "react";
import ReactApexChart from "react-apexcharts";

class AreaChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [
                {
                    name: "Courses",
                    data: [24, 21, 30, 22, 42, 26, 35, 29],
                },
            ],
            options: {
                chart: {
                    height: 215,
                    type: "area",
                    parentHeightOffset: 0,
                    parentWidthOffset: 0,
                    toolbar: {
                        show: false,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    width: 2,
                    curve: "smooth",
                },
                legend: {
                    show: false
                },
                markers: {
                    size: 6,
                    colors: 'transparent',
                    strokeColors: 'transparent',
                    strokeWidth: 4,
                    discrete: [
                        {
                            fillColor: '#fff',
                            seriesIndex: 0,
                            dataPointIndex: 7,
                            strokeColor: '#696cff',
                            strokeWidth: 2,
                            size: 6,
                            radius: 8
                        }
                    ],
                    hover: {
                        size: 7
                    }
                },
                colors: ['#696cff'],
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: null,
                        shadeIntensity: 0.6,
                        opacityFrom: 0.5,
                        opacityTo: 0.25,
                        stops: [0, 95, 100]
                    }
                },
                grid: {
                    borderColor: '#eceef1',
                    strokeDashArray: 3,
                    padding: {
                        top: -20,
                        bottom: -8,
                        left: -10,
                        right: 8
                    }
                },
                xaxis: {
                    categories: ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    },
                    labels: {
                        show: true,
                        style: {
                            fontSize: '13px',
                            colors: '#8592a3'
                        }
                    }
                },
                yaxis: {
                    labels: {
                        show: false
                    },
                    min: 10,
                    max: 50,
                    tickAmount: 4
                }
            },
        };
    }

    render() {
        return (
        <div id="chart">
            <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="area"
            height={215}
            />
        </div>
        );
    }
}

export default AreaChart;
