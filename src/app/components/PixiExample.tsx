import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";
import * as PIXI from 'pixi.js'

export interface PixiExampleProps { clickHandler: any }
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
        this._sprite.x = 400;
        this._sprite.y = 300;
        this._sprite.anchor.set(0.5);
        this._stage.addChild(this._sprite);
    }

    setupPixiRenderer(): boolean {
        let ready: boolean = false;
        this._canvas = document.getElementById("stage") as HTMLCanvasElement;
        if (this._canvas && this._renderer) {
            ready = true;
        } else if (this._canvas) {
            this._renderer = PIXI.autoDetectRenderer(800, 600, {
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
                <canvas id="stage" width={800} height={600} />
            </div>
        );
    }
}
