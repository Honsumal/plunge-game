import { wait } from "./wait";

export async function changeChar(nameNext, active, a, b, c, setInSeq, setActive, setAnnouncerMessage, deterius, field) {
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
                active.rotateTo(a, deterius);
                setActive(a);
                setAnnouncerMessage (`${active.name} retreated! ${a.name} stepped up to fight!`);
                if(deterius) {
                    await wait(2500)
                    setAnnouncerMessage(`${a.name} took damage from the hazards!`)
                }
            }

        } else if (b.name === nameNext) {
            if (!b.isAlive()) {
                setAnnouncerMessage (`${b.name} has already fallen, ${active.name} cannot switch to them!`)
            } else {
                active.rotateTo(b, deterius);
                setActive(b);
                setAnnouncerMessage (`${active.name} retreated! ${b.name} stepped up to fight!`);
                if(deterius) {
                    await wait(2500)
                    setAnnouncerMessage(`${b.name} took damage from the hazards!`)
                };
            }

        } else if (c.name === nameNext) {
            if (!c.isAlive()) {
                setAnnouncerMessage (`${c.name} has already fallen, ${active.name} cannot switch to them!`)
            } else {
                active.rotateTo(c, deterius);
                setActive(c);
                setAnnouncerMessage (`${active.name} retreated! ${c.name} stepped up to fight!`);
                if(deterius) {
                    await wait(2500)
                    setAnnouncerMessage(`${c.name} took damage from the hazards!`)
                };
            }
        }
        await wait(2500);
        
        if (field === 'Electric') {
            active.spd += Math.floor(active.spd * 0.2)
            setAnnouncerMessage(`The electric field boosted the incoming ally's speed!`)
            await wait(2500)
        }

        active.turnStart();
        setInSeq(false);
    }  
}