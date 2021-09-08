import React from 'react';

const ProductoCart = (props) =>{
    return (
        <div className="Producto flex-row-between">
            <div className="flex-row center">
                <img className="Img-Cart" alt={props.data.nameProduct} src={`http://192.168.1.5:3000/images/${props.data.nameProduct.toUpperCase()}.png`}></img>
                <span className="Subtitle margin">{props.data.nameProduct}</span>
                <span className="Subtitle margin green">x{props.data.cantidad}</span>
            </div>
            <div className="flex-row center">
                <span className="Subtitle green">${props.data.total}</span>
                <button onClick={() => props.delete(props.data.key)} className="Boton-Producto-Adquirido">
                    <i className="fas fa-window-close" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    )
}

export default ProductoCart