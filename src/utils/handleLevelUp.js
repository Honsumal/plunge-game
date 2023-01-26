export function handleLevelUp (a, b, c) {
    console.log (a.turnCount, b.turnCount, c.turnCount)

    if (a.turnCount > b.turnCount && b.turnCount > c.turnCount) {
        a.levelUp();
        a.levelUp();
        b.levelUp();
    } else if (a.turnCount > c.turnCount && c.turnCount > b.turnCount) {
        a.levelUp();
        a.levelUp();
        c.levelUp();
    } else if (b.turnCount > a.turnCount && a.turnCount > c.turnCount) {
        a.levelUp();
        b.levelUp();
        b.levelUp();
    } else if (b.turnCount > c.turnCount && c.turnCount > a.turnCount) {
        b.levelUp();
        b.levelUp();
        c.levelUp();
    } else if (c.turnCount > a.turnCount && a.turnCount > b.turnCount) {
        a.levelUp();
        c.levelUp();
        c.levelUp();
    } else if (c.turnCount > b.turnCount && b.turnCount > a.turnCount) {
        b.levelUp();
        c.levelUp();
        c.levelUp();
    } else if (a.turnCount === b.turnCount && a.turnCount > c.turnCount) {
        a.levelUp();
        a.levelUp();
        b.levelUp();
        b.levelUp();
    } else if (a.turnCount === c.turnCount && a.turnCount > b.turnCount) {
        a.levelUp();
        a.levelUp();
        c.levelUp();
        c.levelUp();
    } else if (b.turnCount === c.turnCount && b.turnCount > a.turnCount) {
        b.levelUp();
        b.levelUp();
        c.levelUp();
        c.levelUp();
    } else if (a.turnCount === b.turnCount && a.turnCount < c.turnCount) {
        a.levelUp();
        b.levelUp();
        c.levelUp();
        c.levelUp();
    } else if (a.turnCount === c.turnCount && a.turnCount < b.turnCount) {
        a.levelUp();
        b.levelUp();
        b.levelUp();
        c.levelUp();
    } else if (b.turnCount === c.turnCount && b.turnCount < a.turnCount) {
        a.levelUp();
        a.levelUp();
        b.levelUp();
        c.levelUp();
    } else if (a.turnCount === b.turnCount && b.turnCount === c.turnCount) {
        a.levelUp();
        a.levelUp();
        b.levelUp();
        b.levelUp();
        c.levelUp();
        c.levelUp();
    }

    //console.log(a.level, b.level, c.level)
}