import Enemy from "./enemy";

export default class Jerry extends Enemy {
    constructor () {
        const name = 'Jerry';
        const epithet = 'the Boy';
        const level = 1;
        const hp = 100;
        const maxHp = 100;
        const atk = 6;
        const spd = 15;
        const move_count = 1;
        const standard = 'Ashen Cloud';

        super (name, epithet, level, hp, maxHp, atk, spd, move_count, standard);
    };

    strike (opp) {
        return this.attack(opp)
    }
    
}