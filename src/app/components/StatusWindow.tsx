import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";
import Draggable from "react-draggable";
import Titlebar from './titlebar/Titlebar';
import Model from '../model/Model';

export interface StatusWindowProps { id: string, messages: string, onClick: any, onMounted: any }
export interface StatusWindowState { }

export default class StatusWindow extends React.Component<StatusWindowProps, StatusWindowState> {

    constructor(props: any) {
        super(props);
    }

    componentWillMount() {
        this.setState({});
    }

    componentDidMount() {
        this.props.onMounted(this.props.id);
    }

    handleClick(e: any): void {
        this.props.onClick('bringToFront', this.props.id);
    }

    handleClose(e: any) {
        this.props.onClick('close', this.props.id);
    }

    handleMinimize(e: any) {
        console.log('minimize');
    }

    handleMaximize(e: any) {
        console.log('maximize');
    }

    handleFullScreen(e: any) {
        console.log('fullscreen');
    }

    render() {
        return  <Draggable handle=".handle">
            <div className="app-window well" id="statusWindow" ref="statusWindow">
                <Titlebar
                    draggable={true}
                    handleClick={this.handleClick.bind(this)}
                    handleClose={this.handleClose.bind(this)}
                    handleMinimize={this.handleMinimize.bind(this)}
                    handleMaximize={this.handleMaximize.bind(this)}
                    handleFullScreen={this.handleFullScreen.bind(this)}>
                </Titlebar>
                <h4 className="pull-left handle" style={{marginBottom:20}}>Status</h4>
                <div className="clearfix"></div>
                <p>{this.props.messages}</p>
            </div></Draggable>;
    }
}
