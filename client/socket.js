
function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => { var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8; return v.toString(16); });
}

let sessionID = localStorage.getItem('sessionID');
if (sessionID === null) {
  sessionID = guid();
  localStorage.setItem('sessionID', sessionID);
}

export default io(window.location.origin, { query: { sessionID } });