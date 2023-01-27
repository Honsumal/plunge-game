import { wait } from "./wait";

export async function lifeChecker(a, b, c, e, setAnnouncerMessage) {
    await wait(1000)
    if (!e.isAlive()) {
        console.log(`Battle concluded`)
        setAnnouncerMessage(`${e.name} has fallen!`);
        await wait(1000000);
        return
    } else if (!a.isAlive() && !b.isAlive() && !c.isAlive()) {
        console.log(`Battle concluded`)
        setAnnouncerMessage(`The party has fallen!`);
        await wait(1000000);
        return
    } 
}