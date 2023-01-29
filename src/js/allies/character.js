export default class Character {
    constructor (name, epithet, hp, maxHp, atk, baseAtk, spd, baseSpd, standard, special_1, special_2, rotate) {
        this.name = name;
        this.epithet = epithet
        this.level = 1;
        this.hp = hp;
        this.maxHp = maxHp;
        this.atk = atk;
        this.baseAtk = baseAtk;
        this.spd = spd;
        this.baseSpd = baseSpd;
        this.standard = standard;
        this.special_1 = special_1;
        this.special_2 = special_2;
        this.rotate = rotate;
        this.isActive = false;
        this.dipslay = false;
        this.doomed = false;
        this.rot = false;
        this.ravage = false;
        this.protect = false;
        this.barrier = false;
        this.ally = true;
        this.barrier_count = 0;
        this.pStrike_count = 0;
        this.wStrike_count = 0;
        this.sStrike_count = 0;
        this.slipstream_count = 0;
        this.turnCount = 0;
        this.doomCount = 10;
    }

    attack(opp) {
        //If Opponent Protect
        if (opp.protect) {
            opp.protect = false;
            console.log(`${this.name}'s attack bounced off the shield, cracking it!`)
        } else {
            opp.hp -= Math.floor(this.atk * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5));
            console.log(`${this.name} attacked ${opp.name} using ${this.standard} for ${Math.floor(this.atk * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5))} damage!`);

            // If Willstrike
            if (this.wStrike_count > 0) {
                this.hp += Math.floor(this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5) * (1 - this.rot * 0.7) * 0.15);
                console.log(`${this.name} drained ${Math.floor(this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5) * (1 - this.rot * 0.7) * 0.15)} health!`);
                if (this.hp > this.maxHp) {
                    this.hp = this.maxHp;
                }
            }

            // If Opponent Barrier
            if (opp.barrier) {
                //opp.barrier_count --;
                if (opp.barrier_count === 0) {
                    opp.barrier = false;
                    console.log(`The allies broke through ${opp.name}'s barrier!`);
                } else {
                    console.log(`${opp.name}'s barrier can withstand ${opp.barrier_count - 1} more hits!`)
                }
            }
        }
    }

    spec_1(opp) {
        switch(this.special_1) {
            case 'Pugilistic Strike':
                if (opp.protect) {
                    opp.protect = false;
                    console.log(`${this.name}'s attack bounced off the shield, cracking it!`)
                } else {
                    opp.hp -= Math.floor(this.atk * 0.5 * (1 + this.pStrike_count * 0.5) * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5));
                    console.log(`${this.name} attacked ${opp.name} using ${this.special_1} for ${Math.floor(this.atk * 0.5 * (1 + this.pStrike_count * 0.5) * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5))} damage!`);
                    this.pStrike_count ++;
        
                    // If Willstrike
                    if (this.wStrike_count > 0) {
                        this.hp += Math.floor(this.atk * 0.5 * (1 + this.pStrike_count * 0.5) * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5) * (1 - this.rot * 0.7) * 0.15);
                        console.log(`${this.name} drained ${Math.floor(this.atk  * 0.5 * (1 + this.pStrike_count * 0.5) * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5) * (1 - this.rot * 0.7) * 0.15)} health!`);
                        if (this.hp > this.maxHp) {
                            this.hp = this.maxHp;
                        }
                    }
        
                    // If Opponent Barrier
                    if (opp.barrier) {
                        //opp.barrier_count --;
                        if (opp.barrier_count === 0) {
                            opp.barrier = false;
                            console.log(`The allies broke through ${opp.name}'s barrier!`);
                        } else {
                            console.log(`${opp.name}'s barrier can withstand ${opp.barrier_count - 1} more hits!`)
                        }
                    }
                }
                break;
            case 'Willful Strike':
                //If Opponent Protect
                if (opp.protect) {
                    opp.protect = false;
                    console.log(`${this.name}'s attack bounced off the shield, cracking it!`)
                } else {
                    opp.hp -= Math.floor(this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5));
                    console.log(`${this.name} attacked ${opp.name} using ${this.special_1} for ${Math.floor(this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5))} damage!`);
                    
                    if (this.wStrike_count === 0) {
                        this.wStrike_count = 6;
                        console.log(`${this.name}'s attacks now drain allies for some health!`)
                    }
        
                    this.hp += Math.floor(this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5) * (1 - this.rot * 0.7) * 0.15);
                    console.log(`${this.name} drained ${Math.floor(this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5) * (1 - this.rot * 0.7) * 0.15)} health!`);
                    if (this.hp > this.maxHp) {
                        this.hp = this.maxHp;
                    }
        
                    // If Opponent Barrier
                    if (opp.barrier) {
                        //opp.barrier_count --;
                        if (opp.barrier_count === 0) {
                            opp.barrier = false;
                            console.log(`The allies broke through ${opp.name}'s barrier!`);
                        } else {
                            console.log(`${opp.name}'s barrier can withstand ${opp.barrier_count - 1} more hits!`)
                        }
                    }
                }
                break;
            case 'Spiky Strike': 
                //If Opponent Protect
                if (opp.protect) {
                    opp.protect = false;
                    console.log(`${this.name}'s attack bounced off the shield, cracking it!`)
                } else {
                    opp.hp -= Math.floor(this.atk * 0.8* (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5));
                    console.log(`${this.name} attacked ${opp.name} using ${this.special_1} for ${Math.floor(this.atk * 0.8* (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5))} damage!`);
                    
                    
                    if (this.sStrike_count === 0) {            
                        this.sStrike_count = 6;
                        console.log(`Spikes from ${this.name}'s attack formed a shield around allies, injuring enemies who attack!`)
                    }

                    // If Willstrike
                    if (this.wStrike_count > 0) {
                        this.hp += Math.floor(this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5) * (1 - this.rot * 0.7) * 0.15);
                        console.log(`${this.name} drained ${Math.floor(this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5) * (1 - this.rot * 0.7) * 0.15)} health!`);
                        if (this.hp > this.maxHp) {
                            this.hp = this.maxHp;
                        }
                    }

                    // If Opponent Barrier
                    if (opp.barrier) {
                        //opp.barrier_count --;
                        if (opp.barrier_count === 0) {
                            opp.barrier = false;
                            console.log(`The allies broke through ${opp.name}'s barrier!`);
                        } else {
                            console.log(`${opp.name}'s barrier can withstand ${opp.barrier_count - 1} more hits!`)
                        }
                    }
                }
                
        }
    }

    spec_2(opp) {
        switch(this.special_2) {
            case 'Ravage': 
                //If Opponent Protect
                if (opp.protect) {
                    opp.protect = false;
                    console.log(`${this.name}'s attack bounced off the shield, cracking it!`)
                } else {
                    opp.hp -= Math.floor(this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5));
                    console.log(`${this.name} attacked ${opp.name} using ${this.special_2} for ${Math.floor(this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5))} damage!`);

                    if (!opp.ravage) {
                        opp.ravage = true;
                        console.log(`${opp.name} has been ravaged and now takes extra damage!`)
                    };
                    
                    // If Willstrike
                    if (this.wStrike_count > 0) {
                        this.hp += Math.floor(this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5)*  (1 - this.rot * 0.7) * 0.15);
                        console.log(`${this.name} drained ${Math.floor(this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5) * (1 - this.rot * 0.7) * 0.15)} health!`);
                        if (this.hp > this.maxHp) {
                            this.hp = this.maxHp;
                        }
                    }

                    // If Opponent Barrier
                    if (opp.barrier) {
                        //opp.barrier_count --;
                        if (opp.barrier_count === 0) {
                            opp.barrier = false;
                            console.log(`The allies broke through ${opp.name}'s barrier!`);
                        } else {
                            console.log(`${opp.name}'s barrier can withstand ${opp.barrier_count - 1} more hits!`)
                        }
                    }
                }
                break
            case 'Slipstream':
                this.slipstream_count = 9;
                this.spd = Math.floor(this.spd * 1.2);                
                console.log(`${this.name} conjured up magicks to increase allied speed!`)
                break
            case 'Barrier': 
                this.protect = true;
                this.barrier = true;
                this.barrier_count = 5;
                console.log(`${this.name} formed a barrier around the allies, nullifying some damage!`)
                break
        }
    }

    rotateTo(next, rocks) {
        if (this.name === next.name) {
            console.log(`${this.name} is already in combat!`)
        }

        if (next.isAlive()) {
            this.isActive = false;
            this.atk = this.baseAtk;
            this.spd = this.baseSpd;
            this.rot = false;
            this.doomed = false;

            next.sStrike_count = this.sStrike_count;
            next.wStrike_count = this.wStrike_count;

            if (this.slipstream_count > 0) {
                next.slipStream_count = this.slipstream_count;
                next.spd = Math.floor(next.spd * 1.2);
            }

            if (this.protect) {
                next.protect = true;
            }

            if (this.barrier) {
                next.barrier = true;
                next.barrier_count = this.barrier_count;
            }

            if(this.dipslay) {
                next.dipslay = true;
                next.spd = Math.floor(next.spd * 0.5)
            }


            next.isActive = true;
            console.log(`${this.name} retreated! ${next.name} stepped up to fight!`)

            if(rocks){
                next.hp -= (Math.floor(next.maxHp * 0.125))
                console.log(`${next.name} took damage from the hazards!`)
            }
        } else {
            console.log(`${next.name} has already fallen, ${this.name} cannot switch out!`)
        }
    }

    turnStart () {
        if (this.sStrike_count > 0) {
            this.sStrike_count --;
            if (this.sStrike_count > 0) {
                console.log(`Spiky Strike active for ${this.sStrike_count} more turns!`)
            } else {
                console.log(`Spiky Strike has worn off!`)
            }
        };

        if (this.wStrike_count > 0) {
            this.wStrike_count --;
            if (this.wStrike_count > 0) {
                console.log(`Willful Strike active for ${this.wStrike_count} more turns!`)
            } else {
                console.log(`Willful Strike has worn off!`)
            }
        };

        if(this.slipStream_count > 0) {
            this.slipstream_count --;
            if(this.slipstream_count > 0) {
                console.log(`Slipstream active for ${this.slipstream_count} more turns!`)
            } else if (this.slipstream_count === 0) {
                this.spd /= 1.2;
                console.log(`Slipstream has worn off!`);
                console.log(this.slipstream_count)
            }
        }

        if(this.rot) {
            this.hp -= Math.floor(this.maxHp * 0.25)
        }

        this.turnCount ++;
    }

    printStats() {
        console.log(`Name: ${this.name}, ${this.epithet}; `, `Level: ${this.level};` ,`Hp: ${this.hp};`, `Atk: ${this.atk};`, `Spd: ${this.spd}`)
    }

    printActions() {
        console.log(`Standard Attack: ${this.standard};`, `Special 1: ${this.special_1};`, `Special 2: ${this.special_2};`, `Rotation Move: ${this.rotate}`)
    }

    isAlive() {
        return (this.hp > 0)
    }
}