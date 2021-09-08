import React,{useState} from 'react';
import { useHistory } from "react-router-dom";
import { helpHttp } from '../Helpers/helpHttp'
import { NavLink } from 'react-router-dom';

const inicialForm={
    userName: "",
    password: "",
    password2: "",
    name: "",
    Email: "",
}

const validateForm =(form) =>{
    let errors = {}
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    if(!form.name.trim()) errors.name= "El campo esta vacio"
    else if(!regexName.test(form.name.trim())) errors.name= "El campo solo acepta letras y espacios en blanco"
    if(!form.Email.trim()) errors.email= "El campo esta vacio"
    else if(!regexEmail.test(form.Email.trim())) errors.email= "El Email es incorrecto"

    if(!form.password.trim()) errors.password= "El campo esta vacio"
    else if(!regexPassword.test(form.password.trim())) errors.password= "La contraseña tiene que tener letras, mayuscula y numero"
    if(!form.password2.trim()) errors.password2= "El campo esta vacio"
    else if(!regexPassword.test(form.password2.trim())) errors.password2= "La contraseña tiene que tener letras, mayuscula y numero"
    if(form.password !== form.password2) {
        errors.password= "La contraseña no coinciden"
        errors.password2= "La contraseña no coinciden"
    }
    return errors
}


const Register =()=> {
    const [pass, setPass] = useState("Password");
    const [form, setForm] = useState(inicialForm);
    const [terms, setTerms] = useState(false);
    const [err, setErr] = useState({});
    const [errPost, setErrPost] = useState("");

    let history = useHistory();

    const handleSubmit = (e)=>{
        e.preventDefault()
        let options = {
            body: form,
            headers: {"content-type": "application/json"}
        }
        let url = "http://192.168.1.5:3000/api/Users/addUser"
        if(Object.keys(validateForm(form)).length === 0){
            if(terms){
                helpHttp().post(url,options).then(res => {
                    if(!res.err){
                        if(res.message === "Usted se resgistro Exitosamente"){
                            alert(res.message)
                            history.push('/Login');
                        }else setErrPost(res.message)
                        
                    }else setErrPost("Algo salio mal, vuelve a intentar")
                })
            }else setErrPost("Para Registrarse tiene que aceptar nuestros terminos")
        }else setErrPost("Los Campos estan vacios")
    }
    const handleChange = (e) =>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    const HandlePass = ()=>{
        setPass("text")
        setTimeout(() => {
            setPass("Password")
        }, 2000);
    }
    const handleBlur = (e) =>{
        handleChange(e)
        setErr(validateForm(form))
    }
    const handleChexbox = (e) => {
        setTerms(e.target.checked);
      }
    return(
        <div className="Container-Products flex-column">
            <div className="animateBg"></div>
            <div className="Content-Form">
                <form onSubmit={handleSubmit} className="flex-column">
                    <p className="Title-Form">Registrate</p>
                    <input className="Input-Form" onChange={handleChange} onBlur={handleBlur}
                    type="text" placeholder="Name:" name="name"></input>
                    {err.name && <p className="message-err">{err.name}</p>}
                    <input className="Input-Form" onChange={handleChange} 
                    type="text" placeholder="Username:" name="userName"></input>

                    <input className="Input-Form" onChange={handleChange} onBlur={handleBlur}
                    type="Email" placeholder="Email:" name="Email"></input>
                    {err.email && <p className="message-err">{err.email}</p>}
                    <div className="Container-Password center">
                        <input className="Input-Pass" onChange={handleChange} onBlur={handleBlur}
                        type={pass} placeholder="Password:" name="password"></input>
                        <span className="Look" onClick={HandlePass}>
                            <i className="fas fa-eye"></i>
                        </span>
                    </div>
                    {err.password && <p className="message-err">{err.password}</p>}
                    <div className="Container-Password center">
                        <input className="Input-Pass" onChange={handleChange} onBlur={handleBlur}
                        type={pass} placeholder="Repeat Password:" name="password2"></input>
                        <span className="Look" onClick={HandlePass}>
                            <i className="fas fa-eye"></i>
                        </span>
                    </div>
                    {err.password2 && <p className="message-err">{err.password2}</p>}
                    <label className="Subtitle">
                        <input className="Input-Check" onChange={handleChexbox} type="checkbox"></input>
                        You accept our terms and conditions
                    </label>
                    {errPost.length >0 && <p className="subtitle err">{errPost}</p>}
                    <input className="Btn-Form" type="submit" value="REGISTER"></input>
                    <NavLink  className="nav-link" exact to="/Login" activeClassName="active">
                        You have acount? ¡Login!
                    </NavLink>
                    
                </form>
            </div>
        </div>
    )
}

export default Register