import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";
import { Route, Switch } from "react-router-dom";

import TopNav from './TopNav';
import BottomNav from './BottomNav';
import LeftNav from './LeftNav';
import Model, { Mode } from '../model/Model';
import Page from './Page';
import CanvasPage from './CanvasPage';

export interface ApplicationProps { model: Model }
export interface ApplicationState {
    log: string,
    activePage: number,
    toolbarMode: Mode,
}

export default class Application extends React.Component<ApplicationProps, ApplicationState> {

    private _modeChangeHandler: any = this.onModeChange.bind(this);

    componentWillMount() {
        console.log(`Application: componentWillMount: `);
        this.setState({
            log: '',
            activePage: 1,
            toolbarMode: this.props.model.mode,
        });
    }

    componentDidMount() {
        this.props.model.addListener('modeChange', this._modeChangeHandler);
    }

    onModeChange() {
        console.log(`Application: onModeChange:`);
        this.setState({
            toolbarMode: this.props.model.mode
        });
    }

    componentWillUnmount() {
        this.props.model.removeListener('modeChange', this._modeChangeHandler);
    }

    onTopNavClick(event: any): void {
        let nativeEvent: any = event.nativeEvent;
        switch (nativeEvent.target.id) {
            case 'tbd':
                break;
        }
    }

    onBottomNavClick(event: any): void {
        let nativeEvent: any = event.nativeEvent;
        switch (nativeEvent.target.id) {
            case 'tbd':
                break;
        }
    }

    onLeftNavClick(selectedKey): void {
        console.log(`onLeftNavClick: `, selectedKey);
        this.setState({
            activePage: selectedKey
        });
    }

    onToolClick(value): void {
        console.log(`onToolClick: `, value);
        let mode = Mode.Selecting;
        switch (value) {
            case 'Panning':
                console.log(`SetMode: Panning`);
                mode = Mode.Panning;
                break;
            case 'Selecting':
                console.log(`SetMode: Selecting`);
                mode = Mode.Selecting;
                break;
        }
        this.props.model.setMode(mode);
        this.setState({
            toolbarMode: this.props.model.mode
        });
    }

    onDownloadClick(value: string): void {
        console.log(`onDownloadClick: ${value}`);
        switch (value) {
            case 'downloadJSON':
                this.props.model.downloadJSON();
                break;
        }
    }

    render() {
        return (
            <ReactBootstrap.Grid>
                <ReactBootstrap.Row>
                    <ReactBootstrap.Col>
                        <TopNav clickHandler={this.onTopNavClick.bind(this)} />
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row>
                    <ReactBootstrap.Col xs={2} md={2}>
                        <LeftNav clickHandler={this.onLeftNavClick.bind(this)} activePage={this.state.activePage}/>
                    </ReactBootstrap.Col>
                    <ReactBootstrap.Col xs={10} md={10}>
                        <Switch>
                            <Route exact path="/" render={()=>(<div className='page'><h1>Home</h1>React Typescript Static Site Example</div>)} />
                            <Route path="/page" render={(props) => <Page {...props} content={{title: 'Title', body: 'Hello, world!'}} />} />
                            <Route path="/canvas" render={(props) => <CanvasPage {...props}  onToolClick={this.onToolClick.bind(this)} onDownloadClick={this.onDownloadClick.bind(this)} mode={this.state.toolbarMode} model={this.props.model}/>} />
                            <Route path="*" render={()=>(<div className='page'><h1>404</h1></div>)} />
                        </Switch>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row>
                    <ReactBootstrap.Col>
                        <BottomNav clickHandler={this.onBottomNavClick.bind(this)} />
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Grid>
        );
    }
}
