import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";
import Toolbar from './Toolbar';
import CanvasContainer from './CanvasContainer';
import Model, { Mode } from '../model/Model';
import CanvasTransformer from '../model/CanvasTransformer';

export interface CanvasPageProps { onToolClick: any, onDownloadClick: any, mode: Mode, model: Model }
export interface CanvasPageState { srcImageURL: string }

export default class CanvasPage extends React.Component<CanvasPageProps, CanvasPageState> {

    private _mainCanvas: HTMLCanvasElement;
    private _canvasImage: HTMLImageElement;
    private _canvasTxr: CanvasTransformer;

    componentWillMount() {
        this.setState({
            srcImageURL: 'assets/penguin.png'
        });

        this.toolbarHandler = this.toolbarHandler.bind(this);
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onDownloadClick = this.onDownloadClick.bind(this);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        this._mainCanvas = undefined;
        this._canvasImage = undefined;
        if (this._canvasTxr) {
            this._canvasTxr.dispose();
            this._canvasTxr = undefined;
        }
    }

    onToggle(value: number, checked: boolean): void {
        switch (value) {
            case 1:
                console.log(`Check 1: ${checked}`);
                break;
            case 2:
                console.log(`Check 2: ${checked}`);
                break;
            case 3:
                console.log(`Check 3: ${checked}`);
                break;
        }
        // this.props.onToolClick(tool);
    }

    toolbarHandler(type, value): void {
        // console.log(`CanvasPage: toolbarHandler: `, type, value);
        switch(type) {
            case 'tool':
                this.props.onToolClick(value);
                break;
            case 'dropdown':
                console.log('dropdown', value);
                break;
            case 'toggle':
                this.onToggle(value.value, value.checked)
                break;
            case 'button':
                console.log('button', value);
                break;
        }
    }

    onDownloadClick(event: any): void {
        let nativeEvent: any = event.nativeEvent;
        let target = nativeEvent.target;
        let value = target.id;
        this.props.onDownloadClick(value);
    }

    onSubmitClick(): void {
        console.log('onSubmitClick', this.state.srcImageURL);
        this._mainCanvas = document.getElementById('mainCanvas') as HTMLCanvasElement;
        this._canvasImage = document.createElement('img');
        this._canvasImage.width = this._mainCanvas.width;
        if (this._canvasTxr) {
            this._canvasTxr.dispose();
        }
        this._canvasTxr = new CanvasTransformer(this._mainCanvas);
        this._canvasTxr.setupTouchHandlers();
        // No image if invalid path
        this._canvasImage.onerror = () => {
            this._canvasImage = null;
        };
        this._canvasImage.onload = () => {
            this._canvasTxr.image = this._canvasImage;
        };
        this._canvasImage.src = this.state.srcImageURL;
    }

    handleInputChange(event: any) {
        let nativeEvent: any = event.nativeEvent;
        switch(nativeEvent.target.name) {
            case 'imageSrc':
                this.setState({ srcImageURL: nativeEvent.target.value});
                break;
        }
    }

    setCursor(): void {
        if (this._mainCanvas) {
            switch (this.props.mode) {
                case Mode.Panning:
                    this._mainCanvas.style.cursor = `url('assets/cursors/pan.png') 11 11, move`;
                    break;
                case Mode.Selecting:
                    this._mainCanvas.style.cursor = `url('assets/cursors/select.png') 7 3, default`;
                    break;
            }
        }
    }

    render() {
        this.setCursor();
        return (
            <div id="canvasPage">
                <Toolbar
                    toolbarHandler={this.toolbarHandler}
                    mode={this.props.mode} />
                <CanvasContainer canvasId={"mainCanvas"} width={500} height={375} />
                <ReactBootstrap.FormGroup>
                    <ReactBootstrap.Button id="addImgSrc" onClick={this.onSubmitClick}>Set Canvas Background</ReactBootstrap.Button>
                    <ReactBootstrap.FormControl type="text" id="imageSrc" name="imageSrc" value={this.state.srcImageURL} onChange={this.handleInputChange} style={{width: "300px", display: "inline-block"}}/>
                </ReactBootstrap.FormGroup>
                <ReactBootstrap.ButtonGroup onClick={this.onDownloadClick}>
                    <ReactBootstrap.Button id="downloadJSON">Download JSON</ReactBootstrap.Button>
                </ReactBootstrap.ButtonGroup>
            </div>
        );
    }
}
