import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";
import { Route, Switch } from "react-router-dom";

import TopNav from './TopNav';
import BottomNav from './BottomNav';
import LeftNav from './LeftNav';
import Model, { Mode } from '../model/Model';
import Page from './Page';
import CanvasPage from './CanvasPage';
import StatusWindow from './StatusWindow';
import Markdown from './Markdown';
import Blog from './Blog';

export interface ApplicationProps { model: Model }
export interface ApplicationState {
    log: string,
    activePage: number,
    toolbarMode: Mode,
    showStatusWindow: boolean
}

export default class Application extends React.Component<ApplicationProps, ApplicationState> {

    private _modeChangeHandler: any = this.onModeChange.bind(this);

    componentWillMount() {
        console.log(`Application: componentWillMount: `);
        this.setState({
            log: '',
            activePage: 1,
            toolbarMode: this.props.model.mode,
            showStatusWindow: false
        });
    }

    componentDidMount() {
        this.props.model.addListener('modeChange', this._modeChangeHandler);
        this.props.model.addPanelWithId('statusWindow');
        this.onStatusWindowClick = this.onStatusWindowClick.bind(this);
        this.onWindowMounted = this.onWindowMounted.bind(this);
        this.onTopNavClick = this.onTopNavClick.bind(this);
        this.onPostClick = this.onPostClick.bind(this);
        this.onBlogClick = this.onBlogClick.bind(this);
        this.onToolClick = this.onToolClick.bind(this);
        this.onXtraClick = this.onXtraClick.bind(this)
        this.onStatusWindowClick = this.onStatusWindowClick.bind(this);
        this.onBottomNavClick = this.onBottomNavClick.bind(this);
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

    onXtraClick(value: string): void {
        console.log(`onXtraClick: ${value}`);
        switch (value) {
            case 'downloadJSON':
                this.props.model.downloadJSON();
                break;
            case 'statusWindow':
                this.setState({showStatusWindow: this.props.model.togglePanelOpenedWithId('statusWindow')});
                this.props.model.bringPanelToFront('statusWindow');
                break;
        }
    }

    onStatusWindowClick(type: string, id: string): void {
        switch(type) {
            case 'bringToFront':
                this.props.model.bringPanelToFront(id);
                break;
            case 'close':
                this.props.model.closePanelWithId(id);
                switch(id) {
                    case 'statusWindow':
                        this.setState({showStatusWindow: false});
                        break;
                }
                break;
        }
    }

    onWindowMounted(id: string): void {
        this.props.model.addPanelWithId(id);
    }

    onPostClick(type: string, value: string): void {

    }

    onBlogClick(type: string, value: string): void {

    }

    render() {
        let statusWindow = this.state.showStatusWindow ? <StatusWindow id={'statusWindow'} messages={this.props.model.statusMessages} onClick={this.onStatusWindowClick} onMounted={this.onWindowMounted}/> : null;

        return (
            <ReactBootstrap.Grid>
                <ReactBootstrap.Row>
                    <ReactBootstrap.Col>
                        <TopNav clickHandler={this.onTopNavClick} />
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row>
                    <ReactBootstrap.Col xs={2} md={2}>
                        <LeftNav clickHandler={this.onLeftNavClick} activePage={this.state.activePage}/>
                    </ReactBootstrap.Col>
                    <ReactBootstrap.Col xs={10} md={10}>
                        <Switch>
                            <Route exact path={`/`} render={()=>(<div className='page'><h1>Home</h1>React Typescript Static Site Example</div>)} />
                            <Route path={`/page`}render={(props) => <Page {...props} content={{title: 'Title', body: 'Hello, world!'}} />} />
                            <Route path={`/post/:category/:url`}render={(props) => <Markdown {...props} markdown='' markdownUrl={`posts/${props.match.params.category}/${props.match.params.url}`} clickHandler={this.onPostClick} /> }/>
                            <Route path={`/post/:url`}render={(props) => <Markdown {...props} markdown='' markdownUrl={`posts/${props.match.params.url}`} clickHandler={this.onPostClick} /> }/>
                            <Route path={`/blog`}render={(props) => <Blog {...props} postsUrl='posts/posts.json' clickHandler={this.onBlogClick} />} />
                            <Route path={`/canvas`} render={(props) => <CanvasPage {...props}  onToolClick={this.onToolClick} onXtraClick={this.onXtraClick} mode={this.state.toolbarMode} model={this.props.model} />} />
                            <Route path="*" render={()=>(<div className='page'><h1>404</h1></div>)} />
                        </Switch>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row>
                    <ReactBootstrap.Col>
                        <BottomNav clickHandler={this.onBottomNavClick} />
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                {statusWindow}
            </ReactBootstrap.Grid>
        );
    }
}
