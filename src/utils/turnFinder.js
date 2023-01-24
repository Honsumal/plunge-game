export function turnFinder (ally, enemy, turnCounter, allyGlobalTurnCounter, enemyGlobalTurnCounter, setAllyTurnCounter, setEnemyTurnCounter) {
    let allyTurnCounter = allyGlobalTurnCounter;
    let enemyTurnCounter = enemyGlobalTurnCounter;

    while (allyTurnCounter < turnCounter && enemyTurnCounter < turnCounter) {
        allyTurnCounter += ally.spd;
        enemyTurnCounter += enemy.spd;
        //console.log(allyTurnCounter,enemyTurnCounter, 'unga')
    }

    if (allyTurnCounter > turnCounter && allyTurnCounter > enemyTurnCounter) {
        //console.log (allyTurnCounter, enemyTurnCounter, 1);
        allyTurnCounter -= turnCounter;
        setAllyTurnCounter(allyTurnCounter);
        setEnemyTurnCounter(enemyTurnCounter);
        return 0
    } else if (allyTurnCounter === turnCounter && allyTurnCounter > enemyTurnCounter) {
        //console.log (allyTurnCounter, enemyTurnCounter, 2);
        allyTurnCounter -= turnCounter;
        setAllyTurnCounter(allyTurnCounter);
        setEnemyTurnCounter(enemyTurnCounter);
        return 0
    } else if (enemyTurnCounter > turnCounter && enemyTurnCounter > allyTurnCounter) {
        //console.log (allyTurnCounter, enemyTurnCounter, 3)
        enemyTurnCounter -= turnCounter;
        setAllyTurnCounter(allyTurnCounter);
        setEnemyTurnCounter(enemyTurnCounter);
        return 1
    } else if (enemyTurnCounter === turnCounter && enemyTurnCounter > allyTurnCounter) {
        //console.log (allyTurnCounter, enemyTurnCounter, 4);
        enemyTurnCounter -= turnCounter;
        setAllyTurnCounter(allyTurnCounter);
        setEnemyTurnCounter(enemyTurnCounter);
        return 1
    } else {
        //console.log(allyTurnCounter, enemyTurnCounter, 5);
        allyTurnCounter -= turnCounter;
        setAllyTurnCounter(allyTurnCounter);
        setEnemyTurnCounter(enemyTurnCounter);
        return 0
    }
        
}