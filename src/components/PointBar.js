export default function PointBar ({ label, value, maxValue }) {
    return (
        <div>
            <div className='label'>{label}</div>
            <div>{value}/{maxValue}</div>
        </div>
    )
}