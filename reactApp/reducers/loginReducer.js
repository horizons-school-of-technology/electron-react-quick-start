import axios from 'axios';

const loginReducer = (state = {'username': "", 'password': ""}, action) => {
  switch (action.type) {
    case 'LOGIN':
    // get request to verify login
    console.log(state.username);
    console.log(state.password);
        axios.post('http://localhost:3005/login', {
          password: state.password,
          username: state.username,
        })
        const newState = Object.assign(state);
        newState.username = action.username
        newState.password = action.password
      return newState;

    case 'USERNAME':
          const newState2 = Object.assign(state);
          newState2.username = action.username
    return newState2;

    case 'PASSWORD':
        console.log(state);
        const newState3 = Object.assign(state);
        newState3.password = action.password
    return newState3;
    default:
      return state;
  }
};

export default loginReducer;
