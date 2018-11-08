import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";
import * as PIXI from 'pixi.js'

export interface PixiExampleProps { clickHandler: any, width: number, height: number }
export interface PixiExampleState { }

export default class PixiExample extends React.Component<PixiExampleProps, PixiExampleState> {

    private _renderer: PIXI.autoDetectRenderer;
    private _canvas: HTMLCanvasElement;
    private _stage: PIXI.Container;
    private _sprite: PIXI.Sprite;

    componentWillMount() {
        this.setState({});
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.setupPixiStage();
        this.tick();
    }

    clickHandler() {

    }

    setupPixiStage() {
        this._stage = new PIXI.Container();
        this._sprite = PIXI.Sprite.fromImage('assets/ww-logo-40.png');
        this._sprite.x = this.props.width / 2;
        this._sprite.y = this.props.height / 2;
        this._sprite.anchor.set(0.5);
        this._stage.addChild(this._sprite);
    }

    setupPixiRenderer(): boolean {
        let ready: boolean = false;
        this._canvas = document.getElementById("stage") as HTMLCanvasElement;
        if (this._canvas && this._renderer) {
            ready = true;
        } else if (this._canvas) {
            this._renderer = PIXI.autoDetectRenderer(this.props.width, this.props.height, {
                view: this._canvas,
                backgroundColor: 0x0,
                antialias: true
            });
            ready = true;
        }
        return ready;
    }

    tick() {
        if (this.setupPixiRenderer()) {
            this._renderer.render(this._stage);
            this._sprite.rotation += 0.1;
        }
        requestAnimationFrame(this.tick);
    }

    render() {
        return (
            <div className="pixiExample">
                <canvas id="stage" width={this.props.width} height={this.props.height} />
            </div>
        );
    }
}
