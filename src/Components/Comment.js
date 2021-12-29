import React from 'react'

const Comment = (props)=>{
    return(
        <div className="Comentario flex-column">
            <div className="HeadComentario flex-row">
                <i className="UserImg fas fa-user-circle fa-4x center"></i>
                <div className="Comment flex-column">
                    <div className="flex-row">
                        <span className="Subtitle margin">{props.data.userName}</span>
                        <span className="Subtitle margin">{props.data.hour}</span>
                    </div>
                    <div className="Score">
                        <i className={props.data.score >= 1 ? "fas fa-star" : "fas fa-star desactive"}></i>
                        <i className={props.data.score >= 2 ? "fas fa-star" : "fas fa-star desactive"}></i>
                        <i className={props.data.score >= 3 ? "fas fa-star" : "fas fa-star desactive"}></i>
                        <i className={props.data.score >= 4 ? "fas fa-star" : "fas fa-star desactive"}></i>
                        <i className={props.data.score >= 5 ? "fas fa-star" : "fas fa-star desactive"}></i>
                    </div>
                </div>
            </div>
            <div className="BodyComment center">
                <p className="ParrafoComment">
                {props.data.comment}
                </p>
            </div>
        </div>
    )
}

export default Comment