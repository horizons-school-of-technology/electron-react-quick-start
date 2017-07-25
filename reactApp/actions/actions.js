export function onBoldClick() {
  return {
    type: 'BOLD'
  };
}

export function onChangeAction(newEditorState) {
  return {
    type: 'CHANGED',
    newEditorState
  };
}

export function login(username, password) {
  return {
    type: 'LOGIN',
    username,
    password
  };
}

export function saveUsername(username) {
  return {
    type: 'USERNAME',
    username
  };
}

export function savePassword(password) {
  return {
    type: 'PASSWORD',
    password
  };
}

export function regUsername(username) {
  return {
    type: 'REGUSERNAME',
    username
  };
}

export function regPassword(password) {
  return {
    type: 'REGPASSWORD',
    password
  };
}

export function verPassword(password) {
  return {
    type: 'VERPASSWORD',
    password
  };
}

export function register(username, password, verPassword) {
    console.log("action");
  return {
    type: 'REGISTER',
    username,
    password,
    verPassword,
  };
}
