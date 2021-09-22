import Header from "../components/Header";
import MafiaButton from "../components/buttons/MafiaButton";

function Admin() {
  return (
    <div>
      <Header text='Admin Panel' />
      <div class='admin-container'>
        <MafiaButton label='End Day' func='EndDay' />
        <MafiaButton label='End Night' func='EndNight' />
      </div>
    </div>
  );
}

export default Admin;
