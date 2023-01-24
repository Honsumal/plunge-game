import { wait } from "./wait";

export async function changeChar(nameNext, active, a, b, c, setInSeq, setActive, setAnnouncerMessage) {
    setInSeq(true)
    if (active.name === nameNext) {
        setAnnouncerMessage(`${active.name} is already in combat!`);
        await wait(2500);
    } else if ((a.name === nameNext && !a.isAlive()) || (b.name === nameNext && !b.isAlive()) || (c.name === nameNext && !c.isAlive())) {
        setAnnouncerMessage(`${nameNext} has fallen, ${active.name} cannot switch out!`);
        await wait(2500);
    } else {
        if (a.name === nameNext) {
            if (!a.isAlive()) {
                setAnnouncerMessage (`${a.name} has already fallen, ${active.name} cannot switch to them!`)
            } else {
                active.rotateTo(a);
                setActive(a);
                setAnnouncerMessage (`${active.name} retreated! ${a.name} stepped up to fight!`);
            }

        } else if (b.name === nameNext) {
            if (!b.isAlive()) {
                setAnnouncerMessage (`${b.name} has already fallen, ${active.name} cannot switch to them!`)
            } else {
                active.rotateTo(b);
                setActive(b);
                setAnnouncerMessage (`${active.name} retreated! ${b.name} stepped up to fight!`);
            }

        } else if (c.name === nameNext) {
            if (!c.isAlive()) {
                setAnnouncerMessage (`${c.name} has already fallen, ${active.name} cannot switch to them!`)
            } else {
                active.rotateTo(c);
                setActive(c);
                setAnnouncerMessage (`${active.name} retreated! ${c.name} stepped up to fight!`);
            }
        }
        await wait(2500)
        active.turnStart();
        setInSeq(false);
    }  
}