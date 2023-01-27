import Enemy from "./enemy";

export default class Pambu extends Enemy {
    constructor () {
        const name = 'Pambu';
        const epithet = 'the Monekey Kin';
        const level = 2;
        const hp = 200;
        const maxHp = 200;
        const atk = 9;
        const spd = 9;
        const move_count = 1;
        const standard = 'Singing Man Slam';

        super (name, epithet, level, hp, maxHp, atk, spd, move_count, standard);
    };

    strike (opp) {
        return this.attack(opp)
    }
    
}