import Header from "../components/Header";
import MafiaButton from "../components/buttons/MafiaButton";

function Admin() {
  return (
    <div>
      <Header text='Admin Panel' />
      <div className='admin-container'>
        <MafiaButton label='End Day' func='EndDay' isBig={true} />
        <br />
        <MafiaButton label='End Night' func='EndNight' isBig={true} />
      </div>
    </div>
  );
}

export default Admin;
