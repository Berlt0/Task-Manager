
import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './login.css';


export function Login  () {
    const navigate = useNavigate();
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");

    axios.defaults.withCredentials = true;

      useEffect(() => {
        axios.get('http://localhost:3000/me')
      .then(res => {
        console.log(res.data.user);
        navigate('/task'); // auto redirect if already logged in
      })
      .catch(() => {
        console.log('Not authenticated');
      });
  }, []);

    const login = async(e) => {
        e.preventDefault();

        try{
        const request = await axios.post('http://localhost:3000/login', {

        username: username,
        password: password
    })       

    setUsername("");
    setPassword("");
    navigate('/task');

    }catch(error) {
        console.error('Login failed', error);
    }

   

}

    

  return (
    <div className="login-container">
        <form className="login-form">
            <input className="username" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input className="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button className="btn" type="submit" onClick={login}>Login</button>   
        </form>
    </div>
  );
};








