import {useTypedMessage} from "../hooks/useTypedMessage"

export default function FightLog ({ message }) {

    const typedMessage = useTypedMessage(message)

    return (
        <div className="fightlog">
            <div className="message">{typedMessage}</div>
        </div>
    )
}