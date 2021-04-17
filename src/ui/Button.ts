
import * as PIXI from 'pixi.js';

export class Button extends PIXI.Sprite {
    private onMouseOverFunc: Function | null = null;
    private onMouseUpFunc: Function | null = null;
    private onMouseOutFunc: Function | null = null;
    private _name: string = "";
    public initPosition: PIXI.Point;
    private isUsed: boolean = false;

    constructor(texture?: PIXI.Texture, initPotition?: PIXI.Point, name?: string) {
        super(texture);
        if (initPotition !== undefined) {
            this.initPosition = initPotition;
            this.position = new PIXI.Point(this.initPosition.x, this.initPosition.y);
        } else {
            this.initPosition = new PIXI.Point(this.position.x, this.position.y);
        }

        if (texture === undefined) {
            console.log("mulipo");
            return;
        };
        if (name !== undefined) {
            this._name = name;
        }

        this.init();
    }

    /**
     * 定義したボタン名を返す
     *
     * @readonly
     * @type {string}
     * @memberof Button
     */
    public get buttonName(): string {
        return this._name;
    }


    /**
     * マウスのイベントリスナーセット
     *
     * @private
     * @memberof Button
     */
    private init(): void {
        this.on("pointerup", this.onMouseUp);
        this.on("pointerover", this.onMouseOver);
        this.on("pointerout", this.onMouseOut);
        this.interactive = this.buttonMode = true;
    }


    public setOnMouseUp(func: Function) {
        this.onMouseUpFunc = func;
        return this;
    }
    public setOnMouseOver(func: Function) {
        this.onMouseOverFunc = func;
        return this;
    }

    public setOnMouseOut(func: Function) {
        this.onMouseOutFunc = func;
        return this;
    }

    private setUsed(): void {
        this.isUsed = true;
        setTimeout(() => {
            this.isUsed = false;
        }, 500);
    }

    public onMouseOver(e?: PIXI.interaction.InteractionEvent): void {
        // console.log(e);
        if (this.onMouseOverFunc === null || this.isUsed === true) return;
        this.setUsed();
        this.onMouseOverFunc(e, this);
    }

    public onMouseUp(e?: PIXI.interaction.InteractionEvent): void {
        // console.log(e);
        if (this.onMouseUpFunc === null || this.isUsed === true) return;
        this.setUsed();
        this.onMouseUpFunc(e, this);
    }

    public onMouseOut(e?: PIXI.interaction.InteractionEvent): void {
        // console.log(e);
        if (this.onMouseOutFunc === null) return;
        this.onMouseOutFunc(e, this);
    }

    public destroy() {
        this.off("pointerup", this.onMouseUp);
        this.off("pointerover", this.onMouseOver);
        this.off("pointerout", this.onMouseOut);

        this.onMouseOverFunc = null;
        this.onMouseUpFunc = null;

        this.destroy();
    }

}


