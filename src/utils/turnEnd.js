import { wait } from "./wait"

export async function turnEnd (active, setAnnouncerMessage, a, b, c, setRotating, field) {
    if (active.slipStream_count > 0) {
        active.slipStream_count --;
        if (active.slipStream_count > 0) {
            setAnnouncerMessage(`Slipstream active for ${active.slipStream_count} more turns!`);
            await wait (2500);
        } else {
            active.spd = Math.ceil(active.spd / 1.2)
            setAnnouncerMessage(`Slipstream has worn off!`);
            await wait (2500);
        }
    }

    if (active.sStrike_count > 0) {
        active.sStrike_count --;
        if (active.sStrike_count > 0) {
            setAnnouncerMessage(`Spiky Strike active for ${active.sStrike_count} more turns!`);
            await wait (2500);
        } else {
            setAnnouncerMessage(`Spiky Strike has worn off!`);
            await wait (2500);
        }
    }

    if (active.wStrike_count > 0) {
        active.wStrike_count --;
        if (active.wStrike_count > 0) {
            setAnnouncerMessage(`Willful Strike active for ${active.wStrike_count} more turns!`);
            await wait (2500);
        } else {
            setAnnouncerMessage(`Willful Strike has worn off!`);
            await wait (2500);
        }
    }

    if (active.rot) {
        active.hp -= Math.floor(active.maxHp * 0.125);
        setAnnouncerMessage(`${active.name} took damage from the infection!`)
        await wait (2500);
    }

    if(active.doomed) {
        active.doom_count --;
        if (active.doom_count === 0) {
            active.hp -= active.maxHp;
            setAnnouncerMessage(`${active.name}'s elegy was sung!`)
            await wait (2500);
        } else {
            setAnnouncerMessage(`${active.name} is doomed in ${active.doom_count} turns!`);
            await wait(2500);
        }
    }
    
    if (field === "grass") {
        active.hp += Math.ceil(active.maxHp * 0.0625)
        if (active.hp > active.maxHp) {
            active.hp = active.maxHp
        }
        setAnnouncerMessage(`${active.name} was healed for ${Math.ceil(active.maxHp * 0.0625)} HP by the grassy field!`)
        await wait (2500);
    } else if (field === "superheated") {
        active.hp -= Math.floor(active.maxHp * 0.0625);
        setAnnouncerMessage(`${active.name} was damaged ${Math.floor(active.maxHp * 0.0625)} HP by the burning field!`)
        await wait (2500);
    } else if (field === "swamp") {
        active.spd -= Math.floor(active.spd * 0.2);
        setAnnouncerMessage(`${active.name} is weighed down by the swamp, decreasing their speed by ${Math.floor(active.spd * 0.2)}!`)
        await wait (2500);
    }

    if (!active.isAlive() && (a.isAlive() || b.isAlive() || c.isAlive())) {
        setAnnouncerMessage(`${active.name} has been defeated!`)
        await wait(2000)
        setAnnouncerMessage(`Send someone else in!`)
        setRotating(true);
    }
   
    //active.turnCount ++;
    console.log(active.turnCount)
    //setAnnouncerMessage(``)
}