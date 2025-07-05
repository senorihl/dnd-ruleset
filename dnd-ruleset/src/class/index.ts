import classes from './classes.json'
import {Abilities} from "../constants";

export class Class {

    private _description: string;
    private _hitDice: string;
    private _hitDiceModifier: Abilities;
    private _proficiencies: {
        savingThrows: Array<Abilities>,
        skills: Array<string>,
        skillsChoose: number,
        weapons: Array<string>,
        tools: Array<string>,
    } = {
        savingThrows: [],
        skills: [],
        skillsChoose: 0,
        weapons: [],
        tools: []
    };
    private _armors: Array<string> = [];
    private _startingEquipment: Array<string> = [];
    private _startingEquipmentAlt: null | Array<string> = null;
    private _startingGold: number;

    constructor(private _name: string) {}

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get hitDice(): string {
        return this._hitDice;
    }

    set hitDice(value: string) {
        this._hitDice = value;
    }

    get hitDiceModifier(): Abilities {
        return this._hitDiceModifier;
    }

    set hitDiceModifier(value: Abilities) {
        this._hitDiceModifier = value;
    }

    get proficiencies(): {
        savingThrows: Array<Abilities>;
        skills: Array<string>;
        skillsChoose: number;
        weapons: Array<string>;
        tools: Array<string>
    } {
        return this._proficiencies;
    }

    set proficiencies(value: Partial<{
        savingThrows: Array<Abilities>;
        skills: Array<string>;
        skillsChoose: number;
        weapons: Array<string>;
        tools: Array<string>
    }>) {
        this._proficiencies = {...this._proficiencies, ...value};
    }

    public resetProficiencies() {
        this._proficiencies = {
            savingThrows: [],
            skills: [],
            skillsChoose: 0,
            weapons: [],
            tools: []
        };
    }

    get armors(): Array<string> {
        return this._armors;
    }

    set armors(value: Array<string>) {
        this._armors = value;
    }

    get startingEquipment(): Array<string> {
        return this._startingEquipment;
    }

    set startingEquipment(value: Array<string>) {
        this._startingEquipment = value;
    }

    get startingEquipmentAlt(): Array<string> | null {
        return this._startingEquipmentAlt;
    }

    set startingEquipmentAlt(value: Array<string> | null) {
        this._startingEquipmentAlt = value;
    }

    get startingGold(): number {
        return this._startingGold;
    }

    set startingGold(value: number) {
        this._startingGold = value;
    }
}

export const Classes = Object.entries(classes as {[name: string]: any}).map(([name, characteristics]) => {
    const cClass = new Class(name);

    if (typeof characteristics.description === "string" && characteristics.description.length > 0) {
        cClass.description = characteristics.description;
    }

    if (typeof characteristics['hit-dice'] === "string" && /\d+d(2|4|6|8|10|12|20|100)/.test(characteristics['hit-dice'])) {
        cClass.hitDice = characteristics['hit-dice'];
    }

    if (typeof characteristics['hit-dice-modifier'] === "string" && ["STR", "DEX", "CON", "INT", "WIS", "CHA"].indexOf(characteristics['hit-dice-modifier']) > -1) {
        switch (characteristics['hit-dice-modifier']) {
            case "STR": cClass.hitDiceModifier = Abilities.STR; break;
            case "DEX": cClass.hitDiceModifier = Abilities.DEX; break;
            case "CON": cClass.hitDiceModifier = Abilities.CON; break;
            case "INT": cClass.hitDiceModifier = Abilities.INT; break;
            case "WIS": cClass.hitDiceModifier = Abilities.WIS; break;
            case "CHA": cClass.hitDiceModifier = Abilities.CHA; break;
        }
    }

    if (Array.isArray(characteristics.armors)) {
        cClass.armors = characteristics.armors.filter(e => typeof e === 'string');
    }

    if (Array.isArray(characteristics['starting-equipment'])) {
        cClass.startingEquipment = characteristics['starting-equipment'].filter(e => typeof e === 'string');
    }

    if (Array.isArray(characteristics['starting-equipment-alt'])) {
        cClass.startingEquipmentAlt = characteristics['starting-equipment-alt'].filter(e => typeof e === 'string');
    }

    if (typeof characteristics['starting-gold'] === 'number') {
        cClass.startingGold = characteristics['starting-gold'];
    }

    if (typeof characteristics.proficiencies === "object") {
        if (Array.isArray(characteristics.proficiencies['saving-throws'])) {
            const savingThrows: Abilities[] = [];

            for (const savingThrow of characteristics.proficiencies['saving-throws']) {
                if (typeof savingThrow === "string" && ["STR", "DEX", "CON", "INT", "WIS", "CHA"].indexOf(savingThrow) > -1) {
                    switch (savingThrow) {
                        case "STR": savingThrows.push(Abilities.STR); break;
                        case "DEX": savingThrows.push(Abilities.DEX); break;
                        case "CON": savingThrows.push(Abilities.CON); break;
                        case "INT": savingThrows.push(Abilities.INT); break;
                        case "WIS": savingThrows.push(Abilities.WIS); break;
                        case "CHA": savingThrows.push(Abilities.CHA); break;
                    }
                }
            }

            cClass.proficiencies.savingThrows = savingThrows;
        }

        if (Array.isArray(characteristics.proficiencies['skills'])) {
            cClass.proficiencies.skills = characteristics.proficiencies['skills'].filter(e => typeof e === 'string');
        }

        if (typeof characteristics.proficiencies['skills-choose'] === "number") {
            cClass.proficiencies.skillsChoose = characteristics.proficiencies['skills-choose'];
        }

        if (Array.isArray(characteristics.proficiencies['weapons'])) {
            cClass.proficiencies.weapons = characteristics.proficiencies['weapons'].filter(e => typeof e === 'string');
        }

        if (Array.isArray(characteristics.proficiencies['tools'])) {
            cClass.proficiencies.tools = characteristics.proficiencies['tools'].filter(e => typeof e === 'string');
        }
    }

    return cClass;
});

export default Classes;