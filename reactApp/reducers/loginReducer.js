import axios from 'axios';

const loginReducer = (state = {'username': "", 'password': ""}, action) => {
  switch (action.type) {
    case 'LOGIN':
    // get request to verify login
        axios.post('http://localhost:3005/login', {
          password: action.password,
          username: action.username,
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
        const newState3 = Object.assign(state);
        console.log(newState3);
        newState3.password = action.password
    return newState3;
    default:
      return state;
  }
};

export default loginReducer;
