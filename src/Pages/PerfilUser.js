import React from 'react';
import { useParams } from 'react-router';

const PerfilUser = ()=>{
    console.log("holii")
    const {userName} = useParams()

    const handleClick = ()=>{
        window.localStorage.removeItem('userName')
        window.localStorage.removeItem('session_key')
        window.location.href = "/"
    }

    return(
        <div className="Container-Products flex-column">
            <p className="Title-Form">Hola {userName}</p>
            <p className="Subtitle">Bienvenido a YourDrugs</p>
            <p className="Subtitle">Estamos trabajando en mejorar nuestro sistema de usuarios</p>
            <p onClick={handleClick} className="Subtitle pointer green">Cerrar Sesion</p>
        </div>
    )
}

export default PerfilUser