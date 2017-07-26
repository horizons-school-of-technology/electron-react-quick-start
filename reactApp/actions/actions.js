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

export function login() {
  return {
    type: 'LOGIN',
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

export function regUsername(regUsername) {
  return {
    type: 'REGUSERNAME',
    regUsername
  };
}

export function regPassword(regPassword) {
  return {
    type: 'REGPASSWORD',
    regPassword
  };
}

export function verPassword(verPassword) {
  return {
    type: 'VERPASSWORD',
    verPassword
  };
}

export function register() {
  return {
    type: 'REGISTER',
  };
}
