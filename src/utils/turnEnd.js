import { wait } from "./wait"

export async function turnEnd (active, setAnnouncerMessage) {
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
    
    //active.turnCount ++;
    console.log(active.turnCount)
    //setAnnouncerMessage(``)
}