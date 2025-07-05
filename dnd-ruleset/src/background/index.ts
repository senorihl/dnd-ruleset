import backgrounds from './backgrounds.json'

export class Background {
    constructor(private _name: string) {}


    get name(): string {
        return this._name;
    }
}

export const Backgrounds = Object.entries(backgrounds).map(([name, characteristics]) => {
    return new Background(name);
});

export default Backgrounds;