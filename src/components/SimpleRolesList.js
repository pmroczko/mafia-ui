function SimpleRolesList({ players }) {
    return <div>
        <table>
            <thead>
                <tr>
                    <th>Player</th>
                    <th>Role</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {players.map((player) => (
                    <tr key={player.Name}>
                        <td> {player.Name} </td>
                        <td> {player.RoleName} </td>
                        <td> {player.IsDead ? "Dead" : "Alive"} </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default SimpleRolesList;