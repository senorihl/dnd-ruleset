export function getMaxDiceResult(diceThrow: string): number {
    const m = /(\d+)d(2|4|6|8|10|12|20|100)/.exec(diceThrow);

    if (m && m.length === 3) {
        const nb = Number(m[1]);
        const faces = Number(m[2]);
        return nb * faces;
    }

    throw Error('Invalid dice format.');
}

export function getMinDiceResult(diceThrow: string): number {
    const m = /(\d+)d(2|4|6|8|10|12|20|100)/.exec(diceThrow);

    if (m && m.length === 3) {
        return Number(m[1]);
    }

    throw Error('Invalid dice format.');
}