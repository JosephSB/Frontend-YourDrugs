import React from 'react'
import { NavLink } from 'react-router-dom';

const Target = (props) =>{
    return(
        <div className="Target-Product center flex-column">
            <img className="Img-Product" src={props.data.img} alt={props.data.name}></img>
            <span className="Subtitle">{props.data.name}</span>
            <span className="Subtitle green">{props.data.type}</span>
            <div>
                <i className={props.data.score >= 1 ? "fas fa-star" : "fas fa-star desactive"}></i>
                <i className={props.data.score >= 2 ? "fas fa-star" : "fas fa-star desactive"}></i>
                <i className={props.data.score >= 3 ? "fas fa-star" : "fas fa-star desactive"}></i>
                <i className={props.data.score >= 4 ? "fas fa-star" : "fas fa-star desactive"}></i>
                <i className={props.data.score >= 5 ? "fas fa-star" : "fas fa-star desactive"}></i>
            </div>
            <NavLink className="Button" exact to={`/products/${props.data.name}`}>
                 Info</NavLink>
        </div>
    )
}

export default Target
