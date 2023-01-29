import Enemy from "./enemy";

export default class Kurosawa extends Enemy {
    constructor () {
        const name = 'Kurosawa';
        const epithet = 'the Gemknight';
        const level = 8;
        const hp = 600;
        const maxHp = 600;
        const atk = 23;
        const spd = 23;
        const move_count = 2;
        const standard = 'Aquamarine Arbalest';
        const special_1 = 'Ruby Requiem';

        super (name, epithet, level, hp, maxHp, atk, spd, move_count, standard, special_1);
        this.awoken = false;
        this.awoken_timer = 5
    };

    spec_1 (opp) {
        opp.doom_count = 4;
        console.log(`${e.name} uses Ruby Requiem! ${opp.name}'s days are numbered!`)
    }
}