import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";
import { Link } from "react-router-dom";
import { AreaChart, BarChart, PieChart, ScatterplotChart } from 'react-easy-chart';

export interface ChartProps { clickHandler: any }
export interface ChartState { activeChart: string }

export default class Chart extends React.Component<ChartProps, ChartState> {

    public areaChartData: any;
    public barChartData: any;
    public scattterPlotData: any;

    private _updateDataHandler: any = this.updateData.bind(this);
    private _randomDataIntervalId: number;

    componentWillMount() {
        this.resetData();
        this.setState({activeChart: "Area"});
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        clearInterval(this._randomDataIntervalId);
    }

    resetData() {
        this.areaChartData  = [
            [
                { x: 0, y: 0 },
                { x: 10, y: 0 },
                { x: 20, y: 0 },
                { x: 30, y: 0 },
                { x: 40, y: 0 },
                { x: 50, y: 0 },
                { x: 60, y: 0 },
                { x: 70, y: 0 },
                { x: 80, y: 0 },
                { x: 90, y: 0 },
                { x: 100, y: 0 }
            ], [
                { x: 0, y: 0 },
                { x: 10, y: 0 },
                { x: 20, y: 0 },
                { x: 30, y: 0 },
                { x: 40, y: 0 },
                { x: 50, y: 0 },
                { x: 60, y: 0 },
                { x: 70, y: 0 },
                { x: 80, y: 0 },
                { x: 90, y: 0 },
                { x: 100, y: 0 }
            ]
        ];

        this.barChartData = [
            {x:"A",y:46},
            {x:"B",y:49},
            {x:"C",y:6},
            {x:"D",y:6},
            {x:"E",y:20},
            {x:"F",y:51},
            {x:"G",y:75},
            {x:"H",y:35},
            {x:"I",y:95},
            {x:"J",y:61},
            {x:"K",y:95},
            {x:"L",y:60},
            {x:"M",y:59},
            {x:"N",y:24},
            {x:"O",y:88},
            {x:"P",y:45},
            {x:"Q",y:30},
            {x:"R",y:59},
            {x:"S",y:34},
            {x:"T",y:18}
        ];

        this.scattterPlotData = [
            {
              type: 'One',
              x: 1,
              y: 5
            },
            {
              type: 'Two',
              x: 3,
              y: 1
            },
            {
              type: 'Three',
              x: 0,
              y: 6
            },
            {
              type: 'Four',
              x: 5,
              y: 2
            },
            {
              type: 'Five',
              x: 4,
              y: 4
            },
            {
              type: 'Six',
              x: 5,
              y: 9
            },
            {
              type: 'Seven',
              x: 9,
              y: 1
            },
            {
              type: 'Eight',
              x: 5,
              y: 6
            },
            {
              type: 'Nine',
              x: 3,
              y: 9
            },
            {
              type: 'Ten',
              x: 7,
              y: 9
            }
          ];
    }

    updateData() {
        this.areaChartData.forEach((data) => {
            data.shift();
            let y = this.getRandomArbitrary(
                data[data.length - 1].y - 20,
                data[data.length - 1].y + 20);
            if (y < 0 || y > 100) y = data[data.length - 1].y;
            data.push({ x: data[data.length - 1].x + 10, y });
        });
        this.forceUpdate();
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    radioClick(value, event) {
        event.stopPropagation();
        event.preventDefault();
        this.setState({activeChart: value});
    }

    selectChart() {
        let chart = null;
        clearInterval(this._randomDataIntervalId);
        switch (this.state.activeChart) {
            case "Area":
                this._randomDataIntervalId = setInterval(this._updateDataHandler, 500);
                chart = <AreaChart
                    data={this.areaChartData}
                    width={600}
                    height={300}
                    axisLabels={{ x: 'x', y: 'y' }}
                    interpolate={'cardinal'}
                    yDomainRange={[0, 100]}
                    axes
                    grid
                    style={{
                        '.line0': {
                            stroke: 'green'
                        }
                    }}
                />
                break;
            case "Bar":
                chart = <BarChart
                  axisLabels={{x: 'My x Axis', y: 'My y Axis'}}
                  axes={(600) > 400 ? true : false}
                  colorBars
                  grid
                  width={600}
                  height={300}
                  xTickNumber={5}
                  yTickNumber={5}
                  yDomainRange={[0, 100]}
                  data={this.barChartData}
                />
                break;
            case "Scatter":
                chart = <ScatterplotChart
                    data={this.scattterPlotData}
                    axes
                    axisLabels={{x: 'x Axis', y: 'y Axis'}}
                    width={600}
                    height={300}
                    grid
                />
                break;
            case "Pie":
                chart = <PieChart
                    width={600}
                    height={300}
                    labels
                    data={[
                      {key: 'A', value: 100, color: '#aaac84'},
                      {key: 'B', value: 200, color: '#dce7c5'},
                      {key: 'C', value: 50, color: '#e3a51a'}
                    ]}
                    styles={{
                      '.chart_text': {
                        fontSize: '1em',
                        fill: '#fff'
                      }
                    }}
                />
                break;
        }

        return chart;
    }

    render() {
        return (
            <div>
                <div className="chartContainer">
                    {this.selectChart()}
                </div>
                <br/>
                <ReactBootstrap.ToggleButtonGroup type="radio" name="charts">
                    <ReactBootstrap.ToggleButton value={"Area"} onClick={event=>this.radioClick('Area', event)}>Area Chart</ReactBootstrap.ToggleButton>
                    <ReactBootstrap.ToggleButton value={"Bar"}  onClick={event=>this.radioClick('Bar', event)}>Bar Chart</ReactBootstrap.ToggleButton>
                    <ReactBootstrap.ToggleButton value={"Scatter"} onClick={event=>this.radioClick('Scatter', event)}>Scatter Chart</ReactBootstrap.ToggleButton>
                    <ReactBootstrap.ToggleButton value={"Pie"}  onClick={event=>this.radioClick('Pie', event)}>Pie Chart</ReactBootstrap.ToggleButton>
                </ReactBootstrap.ToggleButtonGroup>
                <br/>
                <p>
                    <a href="https://www.npmjs.com/package/react-easy-chart">react-easy-chart</a><br/>
                    <a href="https://rma-consulting.github.io/react-easy-chart/">more chart examples</a><br/>
                </p>
            </div>
        );
    }
}
