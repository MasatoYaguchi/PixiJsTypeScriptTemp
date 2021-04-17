export namespace KeyboardManager {

    class KeyboardFunctions {
        func: Function = () => { };
        isCtrl: boolean = false;
        isShift: boolean = false;
    }
    let keyboardMap: { [key: string]: KeyboardFunctions } = {};

    const keyboardHandler = (e: KeyboardEvent): void => {
        const KEY = e.key.toLowerCase();
        console.log(KEY);
        if (keyboardMap.hasOwnProperty(KEY)) {
            try {
                const KeyboardFunction = keyboardMap[KEY];
                if (KeyboardFunction.isCtrl === true && e.ctrlKey === false) {
                    return;
                }
                if (KeyboardFunction.isShift === true && e.shiftKey === false) {
                    return;
                }
                console.log("keyboard", KeyboardFunction.func.name, e.key);
                KeyboardFunction.func(e.ctrlKey,e.shiftKey);
            } catch (error) {
                console.error(error);
            }
        }
    }

    /**
     * KeyboardEventの開始
     *
     * @export
     */
    export function start(): void {
        window.addEventListener("keyup", keyboardHandler);
    }

    /**
     *キーボードイベントの停止
     *
     * @export
     */
    export function stop(): void {
        window.addEventListener("keyup", keyboardHandler);
    }




    /**
     * Keyboard押下時にFunction追加
     *
     * @export
     * @param {string} key
     * @param {(isCtrl?: boolean, isShift?: boolean )=>{}} func
     * @param {{ isCtrl?: boolean, isShift?: boolean }} [option]
     */
    export function addFunction(key: string, func: (isCtrl?: boolean, isShift?: boolean) => void, option?: { isCtrl?: boolean, isShift?: boolean }) {
        key = key.toLocaleLowerCase();
        keyboardMap[key] = new KeyboardFunctions();
        keyboardMap[key].func = func;
        if (option) {
            keyboardMap[key].isCtrl = Boolean(option.isCtrl);
            keyboardMap[key].isShift = Boolean(option.isShift);
        }
    }
}

