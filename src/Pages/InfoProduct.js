import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router';
import Loader from '../Components/Loader';
import SectionComents from '../Components/SectionComents';

const InfoProducto = (props) =>{
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [cantidad, setCantidad] = useState(1);
    const [total, setTotal] = useState();
    const {nameProduct} = useParams()

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_HOST}/api/products/${nameProduct}`)
            .then(res=> res.json())
            .then(data => {
                setProduct(data)
                setTotal(data.price)
                setLoading(false)
            })
    }, []);

    const handleClick = (e)=>{
        let cant = cantidad
        if(e.target.innerHTML === " + "){
            cant++
            setCantidad(cantidad + 1)
            setTotal((product.price*cant).toFixed(2))
        }
        if(e.target.innerHTML === " - "){
            if(cantidad>1){
                cant--
                setCantidad(cantidad - 1)
                setTotal((product.price*cant).toFixed(2))
            }
        }
    }

    const addToCarr = () =>{
        let order = 0
        if(window.localStorage.getItem('products')){
            order = window.localStorage.getItem('products').length
        }
        let product = {
            key: order,
            cantidad: cantidad,
            total: total,
            nameProduct: nameProduct
        }
        props.setCarr((carr) => [...carr, product])
        alert("Su pedido se agrego al carrito")
        window.localStorage.setItem('products', JSON.stringify([...props.carr, product]))
    }

    return(
        <>
        <div className="Container-Products Banner2 center flex-column">
            { loading ?
                <Loader message="CARGANDO PRODUCTO"/>
                :
                <>
                <div className="Products flex-wrap">
                    <div className="Container-imgInfo center">
                        <img className="Bigimg" src={product.img} alt={product.name}></img>
                    </div>
                    <div className="InfoProducto">
                        <h2 className="TittleProduct">{product.name}</h2>
                        <div>
                            <i className={product.score >= 1 ? "fas fa-star" : "fas fa-star desactive"}></i>
                            <i className={product.score >= 2 ? "fas fa-star" : "fas fa-star desactive"}></i>
                            <i className={product.score >= 3 ? "fas fa-star" : "fas fa-star desactive"}></i>
                            <i className={product.score >= 4 ? "fas fa-star" : "fas fa-star desactive"}></i>
                            <i className={product.score >= 5 ? "fas fa-star" : "fas fa-star desactive"}></i>
                        </div>
                        <p className="Parrafo">{product.description}</p>
                        <p className="Parrafo green">{product.type}/{product.features[0].AMOUNT}</p>
                        <div className="ContainerStacks flex-wrap">
                            <div className="features flex-column">
                                <div className="Flex-Space">
                                    <span className="Subtitle">
                                        <i className="fas fa-skull-crossbones fa-2x white"></i>
                                        <progress value={product.features[0].TOXICITY} max="100"></progress>
                                    </span>
                                    <span className="Subtitle">
                                    <i className="fas fa-grin-hearts fa-2x"></i>
                                        <progress value={product.features[0].ECSTASY} max="100"></progress>
                                    </span>
                                </div>
                                <div className="Flex-Space">
                                    <span className="Subtitle">
                                    <i className="fas fa-grin-tongue-wink fa-2x"></i>
                                    <progress value={product.features[0].ADRENALIN} max="100"></progress>
                                    </span>
                                    <span className="Subtitle">
                                    <i className="fas fa-clock fa-2x white"></i>
                                    {product.features[0].DURATION}
                                    </span>
                                </div>
                            </div>
                            <div className="Venta center flex-column">
                                <div className="center">
                                    <div className="Content">
                                        <h2 className="LetterPrecio">${product.price}</h2>
                                        <span className="SpanFloat">PRECIO</span>
                                    </div>
                                    <div className="Content">
                                        <h2 className="LetterPrecio">${total}</h2>
                                        <span className="SpanFloat">TOTAL</span>
                                    </div>
                                </div>
                                <div className="SelectCant center">
                                    <button onClick={handleClick} className="Btn center"> - </button>
                                    <h2 className="LetterPrecio">{cantidad}</h2>
                                    <button onClick={handleClick}  className="Btn center"> + </button>
                                </div>
                            </div>
                        </div>
                        <button onClick={addToCarr} className="Btn-Buy center"> <i className="fas fa-cart-plus fa-2x"></i>ADD TO CART</button>
                    </div>
                </div>
                </>
            }
        </div>
        <SectionComents/>
        </>
    )
}

export default InfoProducto

/*                                    <h2 className="LetterPrecio">${product.price} /{total}</h2>*/