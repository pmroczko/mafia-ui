var eventSource = null;
var serverId = null;

function ConnectTo(newServerId) {
    if (!IsConnectedTo(newServerId)) {
        serverId = newServerId;
        eventSource = new EventSource(`${process.env.REACT_APP_SERVER_URL}/events/${serverId}`);
        eventSource.onerror = err => {
            console.log("Event stream error: ", err);
        }
    }
}

function Close() {
    eventSource.close();
    eventSource = null;
    serverId = null;
}

function IsConnectedTo(otherServerId) {
    return serverId !== null && otherServerId === serverId;
}

function Subscribe(callback) {
    eventSource.onmessage = callback
}

const EventController = {
    ConnectTo: ConnectTo,
    Close: Close,
    IsConnectedTo: IsConnectedTo,
    Subscribe: Subscribe
}

export default EventController;