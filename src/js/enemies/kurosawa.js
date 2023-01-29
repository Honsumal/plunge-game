import Enemy from "./enemy";

export default class Kurosawa extends Enemy {
    constructor () {
        const name = 'Kurosawa';
        const epithet = 'the Gemknight';
        const level = 8;
        const hp = 600;
        const maxHp = 600;
        const atk = 19;
        const spd = 30;
        const move_count = 2;
        const standard = 'Aquamarine Arbalest';
        const special_1 = 'Ruby Requiem';
        const special_2 = 'Dancing Dodge'

        super (name, epithet, level, hp, maxHp, atk, spd, move_count, standard, special_1, special_2);
        this.enrage = false;
        this.enrage_timer = 2;
    };

    spec_1 (opp) {
        opp.doomed = true;
        opp.doom_count = 2;
        console.log(`${this.name} uses Ruby Requiem! ${opp.name}'s days are numbered!`)
    }

    spec_2 () {
        this.protect = true;
        console.log(`${this.name} adopts a defensive stance, ready to dodge the next attack!`)
    }
}