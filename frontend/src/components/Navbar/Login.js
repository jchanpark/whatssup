import { useState } from "react"
import axios from "axios";
import SignUp from "./SignUp";


export default function Login() {

  const [state, setState] = useState({
    name: "",
    password: "",
    email: "",
    activeUser: false,
    error: ""
  });

  const onSubmitLoginForm = async (event) => {
    event.preventDefault();
    const user = {  email: state.email, password: state.password };
    axios.post("http://localhost:8080/login", user)
      .then((response) => {
        setState(prev => ({ ...prev, error: response.data.error, email: state.email, activeUser: true }));
      });
  };

  const onClick = (event) => {
    event.preventDefault();
    setState({
      name: "",
      password: "",
      email: "",
      activeUser: false,
      error: ""
    })
  }

  if (state.activeUser && !state.error) {
    return (
      <>
        <h5> What's sup {state.name}</h5>
        <button onClick={onClick}>Logout</button>
      </>
    )
  } else {
    return (
      <>
        <form onSubmit={onSubmitLoginForm}>
          <input
            type="text"
            className="form-control"
            placeholder="enter email"
            onChange={e => (setState(prev => ({ ...prev, email: e.target.value })))}
          />
          <input
            type="text"
            className="form-control"
            placeholder="enter password"
            onChange={e => (setState(prev => ({ ...prev, password: e.target.value })))}
          />
          <button>Login</button>
          <h6>{state.error}</h6>
        </form>
        <SignUp state={state} setState={setState}></SignUp>
      </>
    )
  }
}