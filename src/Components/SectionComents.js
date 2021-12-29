import React,{useEffect,useState} from 'react'
import Comment from './Comment'
import Loader from './Loader';
import {useParams} from 'react-router';
import { helpHttp } from '../Helpers/helpHttp'


const SectionComents = ()=>{
    const [commets, setCommets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [stars, setStars] = useState(1);
    const [message, setMessage] = useState('');
    const [send, setSend] = useState(true);
    const {nameProduct} = useParams()
    const [errSend, setErrSend] = useState(null);

    const SendMessage =()=>{
        const Form = {
            product: nameProduct.toLowerCase(),
            score: stars,
            hour: `${ObtenerFecha()} ${obtenerHora()}`,
            comment: message
        }
        let token = window.localStorage.getItem('session_key')
        let headers
        if(token == null){
            headers = {
                'Content-Type': 'application/json'
            }
        }else{
            headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
        let options = {
            body: Form,
            headers
        }
        let url = `${process.env.REACT_APP_API_HOST}/api/comments/${Form.product}`
        helpHttp().post(url,options).then(res => {
            if(!res.err){
                alert("Su comentario fue enviado")
                setErrSend(null)
                setSend(true)
                window.location.href = `/products/${Form.product.toUpperCase()}`;
            }else{
                if(res.status == 403) setErrSend('NO ESTAS REGISTRADO')
                setSend(false)
            } 
        })
        setMessage('')
    }

    const obtenerHora = () =>{
        let hour = ""
        let hora = (new Date()).getHours()
        let minuto = (new Date()).getMinutes()
        if(minuto<=9) minuto = `0${minuto}`
        if(hora >12)hour = `${hora - 12}:${minuto} PM`
        else hour =  `${hora}:${minuto} AM`
        return hour
    }

    const ObtenerFecha= () =>{
        let  f = new Date();
        return (f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear())
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_HOST}/api/comments/${nameProduct.toLowerCase()}`)
            .then(res=> res.json())
            .then(data => {
                setCommets(data)
                if(data.error) setError(data.error)
                setLoading(false)
                setSend(false)
            })
    }, [send === true]);

    const handleChange = (e) =>{
        if(message.length <= 100) setMessage(e.target.value)
        //setForm({...form,[e.target.name]:e.target.value})
    }
    const handleClick = (e) =>{
        if(stars === 5) setStars(1)
        else {
            setStars(stars + 1)
        }
    }
    const validateMessage = () =>{
        if(message.length > 0 && stars >=1) SendMessage()
        else setErrSend('Datos Ingresados no validos')
    }

    return(
        <div className="SectionComments center flex-column">
            <h1 className="Subtitle">COMENTARIOS SOBRE EL PRODUCTO</h1>
            <div className="ContainComents flex-row">
                <i className="UserImg fas fa-user-circle white fa-4x"></i>
                <div className="flex-start-column">
                    <div className="Score" onClick={handleClick}>
                        <span className="Subtitle">Score: </span>
                        <i className={stars >= 1 ? "fas fa-star" : "fas fa-star desactive"}></i>
                        <i className={stars >= 2 ? "fas fa-star" : "fas fa-star desactive"}></i>
                        <i className={stars >= 3 ? "fas fa-star" : "fas fa-star desactive"}></i>
                        <i className={stars >= 4 ? "fas fa-star" : "fas fa-star desactive"}></i>
                        <i className={stars >= 5 ? "fas fa-star" : "fas fa-star desactive"}></i>
                    </div>
                    <textarea 
                    onChange={handleChange}
                    value={message}
                    className="TextAreaComentario" name="comment" 
                    rows="2" cols="40" placeholder="Escribe aquí tu comentario:">
                    </textarea>
                    <button onClick={validateMessage} className="ButtonComment">SEND</button>
                </div>
            </div>
            {errSend && <p className="Subtitle err">{errSend}</p>}
            <div className="ContainComents flex-column">
            { loading 
                ?
                <Loader message="CARGANDO COMENTARIOS"/>
                :
                <>
                 {error ?<h2 className="Subtitle">NO HAY COMENTARIOS DE ESTE PRODUCTO</h2>
                        :commets.map(comentario => <Comment key={comentario._id} data={comentario}/>)}
                </>
                
            }
            </div>
        </div>
    )
}

export default SectionComents
