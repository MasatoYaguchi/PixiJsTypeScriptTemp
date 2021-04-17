
import * as PIXI from 'pixi.js';
import { KeyboardManager } from './KeyboardManager';

export class PixiAppManager {
    public static instance: PixiAppManager = new PixiAppManager();

    private displpayList: PIXI.DisplayObject[] = [];
    private isFullScreen: boolean = false;

    private _stageSize = new PIXI.Point(1136, 640);
    public get stageSize(): PIXI.Point {
        return this._stageSize;
    }

    private app = new PIXI.Application({
        width: this._stageSize.x,
        height: this._stageSize.y,
        antialias: true,
        autoResize: true,
        autoStart: true,
        backgroundColor: 0x333333,
        resolution: window.devicePixelRatio
    });

    private renderer = this.app.renderer;
    private mask = new PIXI.Graphics();


    private constructor() {
        // Ctrl+fでフルスクリーン
        KeyboardManager.addFunction("f", this.changeFullSceenMode.bind(this), { isCtrl: true });
        this.setMask();
    }


    /**
     * 画面全体にマスクおwかける
     */
    private setMask(): void {
        this.mask.beginFill(0xAA0000, 0.5);
        this.mask.drawRect(0, 0, this._stageSize.x, this._stageSize.x);
        this.mask.endFill();
        this.app.stage.addChild(this.mask);
        this.app.stage.mask = this.mask;

    }

    public get stage(): PIXI.Container {
        return this.app.stage;
    }


    /**
     * フルスクリーンモードのトグル切り替え
     *
     * @memberof PixiAppManager
     */
    public changeFullSceenMode(): void {
        this.isFullScreen = !this.isFullScreen;
        if (this.isFullScreen === true) {
            window.addEventListener("resize", this.fullScreenResize.bind(this));
            this.fullScreenResize();
        } else {
            this.screenResize(this._stageSize.x, this._stageSize.y);
            window.removeEventListener("resize", this.fullScreenResize.bind(this));
        }

    }

    /**
     * 現在のWindowサイズに合わせて画面をリサイズする
     *
     * @private
     * @memberof PixiAppManager
     */
    private fullScreenResize(): void {
        this.screenResize(window.innerWidth, window.innerHeight);
    }


    /**
     * 引数の大きさに合わせて画面をリサイズする。アスペクト比は固定 
     *
     * @private
     * @param {number} width
     * @param {number} height
     * @memberof PixiAppManager
     */
    private screenResize(width: number, height: number): void {

        this.renderer.resize(width, height);
        let resolution = 1 * (height / this._stageSize.x);
        let widthResolutin = 1 * (width / this._stageSize.y);
        if (resolution > widthResolutin) {
            resolution = widthResolutin;
        }

        this.app.stage.scale = new PIXI.Point(resolution, resolution);
        this.app.stage.position = new PIXI.Point(width / 2 - (this._stageSize.x / 2 * resolution));

        console.log(`w:${width}h:${height} scale:${Math.round(resolution * 100) / 100} x:${this.app.stage.position.x} y:${this.app.stage.position.y}`);
    }

    /**
     * 引数のPIXI.DisplayObjectに切り替え
     * 
     * @memberof PixiAppManager
     */
    public set changeDisplay(scene: PIXI.DisplayObject) {
        const before = this.displpayList[this.displpayList.length - 1];
        this.addDisplay = scene;
        /**@todo トランジッションのパターン追加 イージングの実装 */
        const feadOut = () => {
            before.alpha -= 0.05;
            if (before && before.alpha <= 0) {
                this.tickerRemover = feadOut;
                this.removeDisplay = before;
            }
        }
        this.tickerAdd = feadOut;

    }


    /**
     * 引数のPIXI.DisplayObjectを追加
     *
     * @memberof PixiAppManager
     */
    public set addDisplay(display: PIXI.DisplayObject) {
        this.app.stage.addChild(display);
        this.displpayList.push(display);
    }

    /**
     * 引数のPIXI.DisplayObjectを削除
     *
     * @memberof PixiAppManager
     */
    public set removeDisplay(display: PIXI.DisplayObject) {
        this.app.stage.removeChild(display);
        for (let i = 0; i < this.displpayList.length; i++) {
            if (display === this.displpayList[i]) {
                console.log("Scene Delete", display);
                this.displpayList.splice(i, 1);
                break;
            }
        }
    };

    /**
     * Tickerに引数のファンクションを追加
     *
     * @memberof PixiAppManager
     */
    public set tickerAdd(func: (deltaTime?: number) => void) {
        this.app.ticker.add(func);
    }

    /**
     * Tickerから引数のファンクションを削除
     *
     * @memberof PixiAppManager
     */
    public set tickerRemover(func: (deltaTime?: number) => void) {
        this.app.ticker.remove(func);

    }

    /**
     * PixiViewを返す
     *
     * @readonly
     * @type {HTMLElement}
     * @memberof PixiAppManager
     */
    public get view(): HTMLCanvasElement {
        return this.app.view;
    }
}