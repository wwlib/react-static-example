import { EventEmitter } from "events";
import { appVersion } from './AppVersion';
import WindowController from './WindowController';
import axios from 'axios';

export enum Mode {
    Panning = 1,
    Selecting,
}

export default class Model extends EventEmitter {

    static ALT_KEY_DOWN: boolean;
    static META_KEY_DOWN: boolean;
    static CTRL_KEY_DOWN: boolean;
    static SHIFT_KEY_DOWN: boolean;

    public statusMessages: string;
    public mode: Mode;
    public posts: any[];

    public mainCanvas: HTMLCanvasElement;
    public mainCtx: CanvasRenderingContext2D;

    private _mouseDownHandler: any = this.handleDown.bind(this);
    private _mouseUpHandler: any = this.handleUp.bind(this);
    private _mouseMoveHandler: any = this.handleMouseMove.bind(this);
    private _touchstartHandler: any = this.handleTouchStart.bind(this);
    private _touchmoveHandler: any = this.handleTouchMove.bind(this);
    private _touchendHandler: any = this.handleTouchEnd.bind(this);
    private _scrollHandler: any = this.handleScroll.bind(this);
    private _iOSDevice = !!navigator.platform.match(/iPhone|iPod|iPad/);
    private _previousClickTime: number;
    private _doubleClick: boolean;

    constructor() {
        super();
        this.statusMessages = 'Model: ready.';
        this.mode = Mode.Selecting;
        this.posts = [];
        this.loadPosts('posts/posts.json')
            .then(posts => {
                this.posts = posts;
                this.emit('ready', this);
            })
            .catch(err => {
                console.log(err);
                this.emit('ready', this);
            })
    }

    get appVerison(): string {
        return appVersion;
    }

    updateAppStatusMessages(message: string, subsystem?: string, clearMessages: boolean = false): string {
        subsystem = subsystem || '';
        if (clearMessages) {
            this.statusMessages = '';
        }
        this.statusMessages = `${subsystem}: ${this.statusMessages}\n${message}`;
        this.onUpdate();
        return this.statusMessages;
    }

    onUpdate(): void {
        this.emit('updateModel');
    }

    // posts

    async loadPosts(url: string): Promise<any> {
        const { data: posts } = await axios.get(url);
        return posts;
    }

    getPostMarkdownWithCategoryAndUrl(category: string, url: string): string {
        category = category || '';
        console.log(`getPostMarkdownWithCategoryAndUrl: `, category, url);
        let markdown: string = 'markdown';
        for (let i: number=0; i<this.posts.length; i++) {
            let categoryPosts: any = this.posts[i];
            if (categoryPosts.category === category) {
                for (let j: number=0; j<categoryPosts.posts.length; j++) {
                    let post: any = categoryPosts.posts[j];
                    let testUrl: string = category ? `${category}/${url}` : url;
                    if (post.url === testUrl) {
                        markdown = post.markdown;
                        break;
                    }
                };
                break;
            }
        };
        return markdown;
    }

    // call _setMode from within Model to emit the modeChange event
    private _setMode(mode: Mode, note: string = ''): void {
        this.setMode(mode, note);
        this.emit('modeChange');
    }

    // call setMode from outside Model to suppress the modeChange event
    setMode(mode: Mode, note: string = ''): void {
        this.mode = mode;
    }

    // Download

    downloadJSON(): void {
        let text: string = JSON.stringify({hello: 'world'}, null, 2);
        this.downloadFile('application/json', text, 'app.json');
    }

    downloadFile(mime: string, text: string, filename: string): void {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:' + mime + ',' + text);
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    //UI

    getMousePosition(e: any) {
        var x = 0;
        var y = 0;
        var rect = this.mainCanvas.getBoundingClientRect();
        x = e.clientX - rect.left - 3; // 3 is a magic number (corrects for border)
        y = e.clientY - rect.top - 3;
        return {x: x, y: y };
    }

    handleDown(e: any) {
        event.preventDefault();
        var pos = this.getMousePosition(e);
        let doubleClickTime: number = new Date().getTime() - this._previousClickTime;
        if (doubleClickTime < 200) {
            this._doubleClick = true;
            console.log(`double-click`);
        }
        this._previousClickTime = new Date().getTime();
    }

    handleTouchStart(event: any): void {
        event.preventDefault();
        this.mainCanvas.addEventListener('touchmove', this._touchmoveHandler, {passive: false});
        if (event.targetTouches.length == 1) {
            let touch = event.targetTouches[0];
        } else if (event.targetTouches.length == 2) {
            let t1 = event.targetTouches[0];
            let t2 = event.targetTouches[1];
        }
    }

    handleMouseMove(event: any) {
        var pos = this.getMousePosition(event);
    }

    handleTouchMove(event: any): void {
        event.preventDefault();
        if (event.targetTouches.length == 1) {
          var touch = event.targetTouches[0];
        } else if (event.targetTouches.length == 2) {
            let t1 = event.targetTouches[0];
            let t2 = event.targetTouches[1];
        }
    }

    handleUp(event: any) {
        this._doubleClick = false;
    }

    handleTouchEnd(event: any): void {
        event.preventDefault();
        this.handleUp(event);
    }

    handleScroll(event: any): void {
    }

    setupKeyHandlers(): void {
        Model.ALT_KEY_DOWN = false;
        Model.META_KEY_DOWN = false;
        Model.CTRL_KEY_DOWN = false;
        Model.SHIFT_KEY_DOWN = false;

        document.onkeydown = (event: KeyboardEvent) => {
            Model.ALT_KEY_DOWN = event.altKey;
            Model.META_KEY_DOWN = event.metaKey;
            Model.CTRL_KEY_DOWN = event.ctrlKey;
            Model.SHIFT_KEY_DOWN = event.shiftKey;
            this.handleKeyDown(event);
        }

        document.onkeyup = (event: KeyboardEvent) => {
            Model.ALT_KEY_DOWN = event.altKey;
            Model.META_KEY_DOWN = event.metaKey;
            Model.CTRL_KEY_DOWN = event.ctrlKey;
            Model.SHIFT_KEY_DOWN = event.shiftKey;
            this.handleKeyUp(event);
        }
    }

    handleKeyDown(event: any): void {
        switch(event.key) {
            case 'a':
                break;
            case 'b':
                break;

        }
    }

    handleKeyUp(event: any): void {
    }

    setupTouchHandlers(): void {
        if (this._iOSDevice) {
            this.mainCanvas.addEventListener('touchstart', this._touchstartHandler, {passive: false});
            this.mainCanvas.addEventListener('touchend', this._touchendHandler, {passive: false});
        } else {
            this.mainCanvas.addEventListener("mousedown", this._mouseDownHandler, false);
            this.mainCanvas.addEventListener("mouseup", this._mouseUpHandler, false);
        }
        this.mainCanvas.addEventListener('DOMMouseScroll',this._scrollHandler,false);
        this.mainCanvas.addEventListener('mousewheel',this._scrollHandler,false);
        this._previousClickTime = new Date().getTime();
    }

    // Window Management

    // getPanelOpenedWithId(panelId: string): boolean {
    //     let result: boolean = false;
    //     let window: WindowController | undefined = WindowController.getWindowControllerWithId(panelId);
    //     if (window) {
    //         result = window.opened;
    //     }
    //     return result;
    // }

    togglePanelOpenedWithId(panelId: string): boolean {
        let window: WindowController | undefined = WindowController.getWindowControllerWithId(panelId);
        if (!window) {
            return true; // open the panel if it is not yet instantiated
        } else {
            return window.toggleOpened();
        }
    }

    // openPanelWithId(panelId: string): void {
    //     WindowController.openWithId(panelId);
    // }

    closePanelWithId(panelId: string): void {
        WindowController.closeWithId(panelId);
    }

    bringPanelToFront(panelId: string): void {
        WindowController.addWindowWithId(panelId);
        WindowController.bringWindowToFrontWithId(panelId);
    }

    addPanelWithId(panelId: string, x: number = 0, y: number = 0, z: number = 0): void {
        WindowController.addWindowWithId(panelId, x, y, z);
    }

    dispose(): void {
    }
}
