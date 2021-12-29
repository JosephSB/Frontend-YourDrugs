import React,{useState} from 'react';
import { NavLink } from 'react-router-dom';
//import { useHistory } from "react-router-dom";
import { helpHttp } from '../Helpers/helpHttp'

const inicialForm={
    userName:"",
    password:"",
}

const Login =()=> {
    const [pass, setPass] = useState("Password");
    const [form, setForm] = useState(inicialForm);
    const [err, setErr] = useState("");
    //let history = useHistory();

    const handleSubmit = (e)=>{
        e.preventDefault()
        let options = {
            body: form,
            headers: {"content-type": "application/json"}
        }
        let url = process.env.REACT_APP_API_HOST+"/api/Users/validateUser"
        if(form.userName !== "" && form.password !== ""){
            helpHttp().post(url,options).then(res => {
                if(!res.err){
                    if(res.message === "LOGIN SUCCESSFUL"){
                        console.log(res)
                        window.localStorage.setItem('session_key', res.token)
                        window.localStorage.setItem('userName', form.userName)
                        window.location.href = "/"
                        //history.push('/');
                    }else setErr(res.message)
                    
                }else setErr("Algo salio mal, vuelve a intentar")
            })
        }else{
            setErr("Ingrese todos sus datos")
        }
    }
    const handleChange = (e) =>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    const HandlePass = ()=>{
        setPass("Text")
        setTimeout(() => {
            setPass("Password")
        }, 1000);
    }
    return(
        <div className="Container-Products flex-column">
            <div className="animateBg"></div>
            <div className="Content-Form">
                <form onSubmit={handleSubmit} className="flex-column">
                    <p className="Title-Form">Inicia Sesion</p>
                    <input className="Input-Form" onChange={handleChange} type="text" placeholder="Username:" name="userName"></input>
                    <div className="Container-Password center">
                        <input className="Input-Pass" onChange={handleChange} type={pass} placeholder="Password:" name="password"></input>
                        <span className="Look" onClick={HandlePass}><i className="fas fa-eye"></i></span>
                    </div>
                    {err.length >0 && <p className="subtitle err">{err}</p>}
                    <input className="Btn-Form" type="submit" value="LOGIN"></input>
                    <NavLink  className="nav-link" exact to="/Register" activeClassName="active">
                        Don't have a YourDrugs account? ¡Sign Up!
                    </NavLink>
                    
                </form>
            </div>
        </div>
    )
}

export default Login