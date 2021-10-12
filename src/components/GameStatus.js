function actionStatus(playerState) {
    if (playerState.ActionsLeft === 0) {
        return [`You have no actions left.`];
    } else {
        if (playerState.Cooldown == 0 && playerState.ActionsLeft > 10) {
            return ["You can use your action."];
        } else {
            let res = [`You have ${playerState.ActionsLeft} actions left.`];
            if (playerState.Cooldown > 0) {
                if (playerState.Cooldown === 1) {
                    return [res[0], `You have to wait for 1 night.`]
                } else {
                    return [res[0], `You have to wait for ${playerState.Cooldown} nights.`];
                }
            }
        }
    }
}

function GameStatus({ messages, playerState, publicState, playersPublicStatus }) {
    return <div>
        {messages.map((msg, _) =>
            <div key={msg}> {msg.text} </div>
        )}
        <p></p>
        {actionStatus(playerState).map((line, _) =>
            <div key={line}> {line} </div>
        )}
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
        <table>
            <thead>
                <tr>
                    <th>Scenario</th>
                </tr>
            </thead>
            <tbody>
                {publicState.Scenario.map((role, _) =>
                    <tr key={role}>
                        <td> {role} </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
}

export default GameStatus;