import * as PIXI from 'pixi.js';

export namespace LoadManager {

    const myLoader: PIXI.Loader = new PIXI.Loader();

    /**
     * 引数の読み込み
     *
     * @export
     * @param {string} path
     * @returns {(Promise<PIXI.LoaderResource | undefined>)}
     */
    export async function load(path: string): Promise<PIXI.LoaderResource | undefined> {
        return new Promise(resolve => {
            console.log("myLoader.loading", myLoader.loading, path)

            myLoader.add(path).load(
                (loader: PIXI.Loader, resources: PIXI.loaders.ResourceDictionary) => {
                    return resolve(resources[path]);
                }
            )
        });
    }


    /**
     * textファイルを読み込んでStringで返す
     *
     * @export
     * @param {string} path
     * @returns {Promise<string>}
     */
    export async function loadStringFile(path: string,ver?:number): Promise<string> {
        return new Promise(resolve => {
            if(ver){
                path = `${path}/?ver=${ver}`;
            }
            myLoader.add(path, { crossOrigin: 'anonymous' });
            myLoader.load((loader: PIXI.Loader, resouces: PIXI.loaders.ResourceDictionary) => {
                console.log(resouces, path);
                resolve(resouces[path].data as string);
            })
        });
    }

}