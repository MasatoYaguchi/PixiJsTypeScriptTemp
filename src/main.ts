
import { PixiAppManager } from './manager/PixiAppManager'
import { KeyboardManager } from './manager/KeyboardManager';
import { TestSprite } from './disp/testSpite';

let mainContens: HTMLDivElement = document.createElement("div");

window.onload = () => {

    mainContens = document.getElementById("mainContens") as HTMLDivElement;
    mainContens.style.width = "100%";
    mainContens.style.height = "100%";

    mainContens.appendChild(PixiAppManager.instance.view);
    setLightClick();

    initKeyboardManager();

    if (hasTouchScreen() === true) {
        PixiAppManager.instance.changeFullSceenMode();
    }
    setTimeDuspDiv();

    PixiAppManager.instance.addDisplay = new TestSprite();
}

/**
 * 右クリック時のデフォルト動作キャンセル
 *
 */
function setLightClick(): void {

    const eventCansel = (e: MouseEvent): void => {
        e.preventDefault();
    };
    document.body.addEventListener("contextmenu", eventCansel);
    document.addEventListener("contextmenu", eventCansel);
    PixiAppManager.instance.view.addEventListener("contextmenu", eventCansel);
}



/**
 * KeyBoardManagerの初期化
 *
 */
function initKeyboardManager() {
    KeyboardManager.start();
}


/**
 * 
 */
function setTimeDuspDiv(): void {
    const divElement = document.createElement("div");
    setInterval(() => {
        divElement.textContent = "" + (new Date().toString().replace
            ("GMT+0900 (GMT+09:00)", ""));
    }, 1000);
    document.body.appendChild(divElement);
}


/**
 * タッチスクリーン対応端末か
 * @see https://developer.mozilla.org/ja/docs/Web/HTTP/Browser_detection_using_the_user_agent
 * @returns
 */
function hasTouchScreen(): boolean {
    let _hasTouchScreen = false;
    if ("maxTouchPoints" in window.navigator) {
        _hasTouchScreen = navigator.maxTouchPoints > 0;
    } else if ("msMaxTouchPoints" in window.navigator) {
        _hasTouchScreen = navigator.msMaxTouchPoints > 0;
    } else {
        const matchMediaPointerCoarse = matchMedia("(pointer:coarse)");
        if (matchMediaPointerCoarse && matchMediaPointerCoarse.media === "(pointer:coarse)") {
            _hasTouchScreen = !!matchMediaPointerCoarse.matches;
        } else if ('orientation' in window) {
            _hasTouchScreen = true; // depedicated, but good fallback
        } else {
            // Only as a last resort, fall back to user agent sniffing
            let userAgent = navigator.userAgent;
            _hasTouchScreen = (
                /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(userAgent) ||
                /\b(Android|Windows Phone|iPad|iPod)\b/i.test(userAgent)
            );
        }
    }
    return _hasTouchScreen;

}
