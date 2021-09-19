function LobbyUserList(props) {
  const users = props.Users;
  /*
        {users.forEach((u) => {
          console.log("Rendering user");
          <tr>
            <th scope='row'>{u.Position}</th>
            <td>{u.Name}</td>
            <td>{u.Id}</td>
          </tr>;
        })}    */
  const userList = users.map((u) => (
    <tr>
      <th scope='row'>{u.Position}</th>
      <td>{u.Name}</td>
      <td>{("" + u.Id).substr(0, 9) + "..."}</td>
    </tr>
  ));
  return (
    <table className='table'>
      <thead className='table-dark'>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Name</th>
          <th scope='col'>Id</th>
        </tr>
      </thead>
      <tbody>{userList}</tbody>
    </table>
  );
}

export default LobbyUserList;
