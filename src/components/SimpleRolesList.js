function SimpleRolesList({ players }) {
    return <div>
        <table>
            <thead>
                <tr>
                    <th>Player</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                {players.map((player) => (
                    <tr key={player.Name}>
                        <td> {player.Name} </td>
                        <td> {player.RoleName} </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default SimpleRolesList;