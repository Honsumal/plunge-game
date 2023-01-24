export default function PointBar ({ combatant }) {
    return (
        <div>
            <div className='label'>Hp {combatant.hp}/{combatant.maxHp}</div>
            <div> Atk: {combatant.atk} Spd: {combatant.spd}</div>
        </div>        
    )
}