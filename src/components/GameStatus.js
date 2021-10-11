function GameStatus({ messages, playersPublicStatus }) {
    console.log(messages)
    console.log(playersPublicStatus)
    return <div>
        {messages.map((msg, _) =>
            <div key={msg}> {msg.text} </div>
        )}
        <p></p>
        <table>
            <thead>
                <tr>
                    <th>Player</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Vote</th>
                </tr>
            </thead>
            <tbody>
                {playersPublicStatus.map((status, _) =>
                    <tr key={status.Name}>
                        <td> {status.Name} </td>
                        <td> {status.RoleName} </td>
                        <td> {status.IsDead ? "Dead" : "Alive"} </td>
                        <td> {status.VoteTarget} </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
}

export default GameStatus;