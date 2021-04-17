import * as PIXI from 'pixi.js';
import { PixiAppManager } from "../manager/PixiAppManager";

export class TestSprite extends PIXI.Sprite {
    constructor() {
        super();
        this.draw();
    }

    private draw(): void {
        const size = 200;
        const square = new PIXI.Graphics();
        square.beginFill(0xAA0000, 1.0);
        square.drawRect(0, 0, size, size);
        square.endFill();
        square.position.set(-size / 2, -size / 2);

        const sprite = new PIXI.Sprite();
        sprite.anchor.set(0.5, 0.5);
        sprite.addChild(square);

        const stage = PixiAppManager.instance.stageSize;
        sprite.position.set(stage.x / 2, stage.y / 2);
        this.addChild(sprite);

        PixiAppManager.instance.tickerAdd = () => {
            sprite.rotation += 0.01;
        }
    }



}