import { wait } from "./wait";

export async function lifeChecker(a, b, c, e, setAnnouncerMessage) {
    await wait(1000)
    if (!e.isAlive()) {
        setAnnouncerMessage(`Melchor has fallen!`);
        await wait(1000000);
        return
    } else if (!a.isAlive() && !b.isAlive() && !c.isAlive()) {
        setAnnouncerMessage(`The party has fallen!`);
        await wait(1000000);
        return
    } 
}