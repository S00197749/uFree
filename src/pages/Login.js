import React, {useEffect, useState} from 'react';
import { Navigate } from "react-router-dom";

function Login() {
  const [users, setUsers] = useState([])
  const [goToHome, setGoToHome] = React.useState(false);

  if (goToHome) {
    return <Navigate to="/home" />;
  }

  const fetchData = async () => {
    const result = await fetch('https://schedule-functions.azurewebsites.net/api/Login?code=ymRPtxrxcTGwyYOWSVwIm9BZGh2olzmZ_t73lsFg6FcIAzFu1hk6iw==&username=lsweeney&password=pw1234')
    const jsonResult = await result.json();

    setUsers(jsonResult)
  }

  const submitData = async () =>{
    const myData = {
      userName: '',
      password: '',
      email: ''
    }

    const result = await fetch('http://localhost:7221/api/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myData)
    })

    const jsonResult = await result.json();
    setUsers(prev=>[...prev, jsonResult])
  }

  return (
    <div class="container">
        <div class="row mt-6"></div>
        <div class="row mt-6"></div>
        <div class="row mt-6"></div>
        <div class="row d-flex justify-content-center mt-6">
            <div class="col-md-6 mt-6">
              <h2 class="heading">Schedule App</h2>
                <div class="card px-5 py-5">
                  <form>
                    <div class="form-data">
                        <div class="forms-inputs mb-4"> <span>Username</span> <input required autocomplete="off" type="text"/>
                            <div class="invalid-feedback">A valid email is required!</div>
                        </div>
                        <div class="forms-inputs mb-4"> <span>Password</span> <input required autocomplete="off" type="password"/>
                            <div class="invalid-feedback">Password must be 8 character!</div>
                        </div>
                        <div class="mb-2"> <button type='submit' class="btn btn-primary login-btn w-100" onClick={() => {setGoToHome(true);}} > {" "} Login</button> </div>
                        <div class="mb-3"> <a>Register</a> </div>
                    </div>
                  </form>
                    <div id='loginError' hidden>
                        <div class="text-center d-flex flex-column"> <i class='bx bxs-badge-check'></i> <span class="text-center fs-1">You have been logged in <br/> Successfully</span> </div>
                    </div>
                </div>
                <div>
                  <button onClick={fetchData} class="btn btn-primary">Get Users</button>
                  <h2>User:</h2>
                  {users.map(user =>
                    <div>
                      <h5>Id: {user.user_Id}</h5>
                      <h5>Username: {user.user_Name}</h5>
                      <h5>Email: {user.user_Email}</h5>
                    </div>)}
                </div>
            </div>
        </div>        
    </div>
  );
}

export default Login;