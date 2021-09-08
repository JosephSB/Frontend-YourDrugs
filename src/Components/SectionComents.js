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
        fetch(`http://192.168.1.5:3000/api/comments/${nameProduct.toLowerCase()}`)
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
    const sendMessage = () =>{
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
        let url = `http://192.168.1.5:3000/api/comments/${Form.product}`
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
        console.log(Form)
    }

    return(
        <div className="SectionComments center flex-column">
            <h1 className="Subtitle">COMENTARIOS SOBRE EL PRODUCTO</h1>
            <div className="ContainComents flex-row">
                <img className="UserImg" src="http://assets.stickpng.com/images/585e4beacb11b227491c3399.png" alt="user"></img>
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
                    <button onClick={sendMessage} className="ButtonComment">SEND</button>
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
