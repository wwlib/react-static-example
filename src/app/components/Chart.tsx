import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";
import { Link } from "react-router-dom";
import { AreaChart } from 'react-easy-chart';

export interface ChartProps { clickHandler: any }
export interface ChartState { }

export default class Chart extends React.Component<ChartProps, ChartState> {

    public data: any;

    private _updateDataHandler: any = this.updateData.bind(this);
    private _randomDataIntervalId: number;

    componentWillMount() {
        this.resetData();
        this.setState({});
    }

    componentDidMount() {
        this._randomDataIntervalId = setInterval(this._updateDataHandler, 500);
    }

    componentWillUnmount() {
        clearInterval(this._randomDataIntervalId);
    }

    resetData() {
        this.data  = [
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
    }

    updateData() {
        this.data.forEach((data) => {
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

    render() {
        return (
            <div>
                <div className="chartContainer">
                    <AreaChart
                        data={this.data}
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

                </div>
                <p>
                    <a href="https://www.npmjs.com/package/react-easy-chart">react-easy-chart</a><br/>
                    <a href="https://rma-consulting.github.io/react-easy-chart/">chart examples</a><br/>
                </p>
            </div>
        );
    }
}
