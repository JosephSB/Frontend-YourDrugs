import React,{useEffect,useState} from 'react'
import ProductoCart from '../Components/Cart-Product';

const Cart = (props) =>{
    const [total, setTotal] = useState(0);

    const calcularPrecioTotal = () =>{
        let x = 0;
        props.carr.forEach(item => {
            x = x + item.total
        });
        setTotal(x)
    }
    
    useEffect(() => {
        calcularPrecioTotal()
    }, []);

    const EliminarProducto = (data) =>{
        const newCarr = props.carr.filter(product => product.key !== data);
        props.setCarr(newCarr)
        window.localStorage.setItem('products', JSON.stringify(newCarr))
    }

    return (
        <>
            <div className="Container-Cart">
                <div className="Header-Cart">
                    <h1 className="Subtitle">TUS COMPRAS</h1>
                    <div className="Container-SubTotal">
                        <div className="Sub-Total">
                            <h3 className="Subtitle margin-0">Sub-Total</h3>
                            <h4 className="Subtitle margin-0 precio" id="Letter-Carrito-SubTotal">${total} </h4>
                        </div>
                        <button className="Boton-Comprar">COMPRAR</button>
                    </div>
                </div>
                <div className="Products-Cart flex-column-row">
                    {props.carr.length > 0 ? props.carr.map((product)=>
                        <ProductoCart delete={EliminarProducto} key={product.key} data={product}/>)
                    :
                        <span className="Title precio">NO HAY PRODUCTOS REGISTRADOS</span>
                    }
                    
                </div>
            </div>
        </>
    )
}

export default Cart