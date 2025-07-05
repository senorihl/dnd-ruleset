import races from './races.json'

export class Race {
    constructor(private _name: string) {}


    get name(): string {
        return this._name;
    }
}

export const Races = Object.entries(races).map(([name, characteristics]) => {
    return new Race(name);
});

export default Races;