import PointBar from "./PointBar"

export default function CombatantSummary({ combatant })  {

    const ora = '#f77f00'
    const lmm = '#eae2b7'

    return (
        <div style={{ backgroundColor: combatant.ally ? lmm : ora}} className='card'>
            <div>{combatant.name}, {combatant.epithet}</div>
            <div>Lv: {combatant.level}</div>

            <PointBar combatant={combatant} />
        </div>

    )
}