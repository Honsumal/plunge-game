import { wait } from "./wait";

export async function changeChar(nameNext, active, a, b, c, setInSeq, setActive, setAnnouncerMessage, rocks) {
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
                active.rotateTo(a, rocks);
                setActive(a);
                setAnnouncerMessage (`${active.name} retreated! ${a.name} stepped up to fight!`);
                if(rocks) {
                    await wait(2500)
                    setAnnouncerMessage(`${a.name} took damage from the hazards!`)
                }
            }

        } else if (b.name === nameNext) {
            if (!b.isAlive()) {
                setAnnouncerMessage (`${b.name} has already fallen, ${active.name} cannot switch to them!`)
            } else {
                active.rotateTo(b, rocks);
                setActive(b);
                setAnnouncerMessage (`${active.name} retreated! ${b.name} stepped up to fight!`);
                if(rocks) {
                    await wait(2500)
                    setAnnouncerMessage(`${b.name} took damage from the hazards!`)
                };
            }

        } else if (c.name === nameNext) {
            if (!c.isAlive()) {
                setAnnouncerMessage (`${c.name} has already fallen, ${active.name} cannot switch to them!`)
            } else {
                active.rotateTo(c, rocks);
                setActive(c);
                setAnnouncerMessage (`${active.name} retreated! ${c.name} stepped up to fight!`);
                if(rocks) {
                    await wait(2500)
                    setAnnouncerMessage(`${c.name} took damage from the hazards!`)
                };
            }
        }
        await wait(2500)
        active.turnStart();
        setInSeq(false);
    }  
}