var eventSource = null;
var serverId = null;
var currentEventSource = null;

function ConnectToLobby(newServerId) { ConnectTo(newServerId, "lobby") }
function ConnectToGame(newServerId) { ConnectTo(newServerId, "game") }

function ConnectTo(newServerId, eventsSource) {
    if (!IsConnectedTo(newServerId, eventsSource)) {
        serverId = newServerId;
        eventSource = new EventSource(`${process.env.REACT_APP_SERVER_URL}/events/${eventsSource}/${serverId}`);
        eventSource.onerror = err => {
            console.log("Event stream error: ", err);
        }
    }
}

function Disconnect() {
    eventSource.close();
    eventSource = null;
    serverId = null;
    currentEventSource = null;
}

function IsConnectedTo(otherServerId, eventsSource) {
    return serverId !== null && otherServerId === serverId &&
        currentEventSource !== null && eventsSource === currentEventSource;
}

function Subscribe(callback) {
    eventSource.onmessage = callback
}

const EventController = {
    ConnectToLobby: ConnectToLobby,
    ConnectToGame: ConnectToGame,
    Disconnect: Disconnect,
    IsConnectedTo: IsConnectedTo,
    Subscribe: Subscribe
}

export default EventController;