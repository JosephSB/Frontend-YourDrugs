import React,{useState,useEffect} from 'react'
import Loader from '../Components/Loader';
import Target from '../Components/Target';

const Products = ()=>{
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://192.168.1.5:3000/api/products`)
            .then(res=> res.json())
            .then(data => {
                setProductos(data)
                setLoading(false)
            })
    }, []);

    return(
        <div className="Container-Products center flex-column">
            <div className="animateBg"></div>
            {loading ?
                <Loader message="CARGANDO PRODUCTOS"/>
                :
                <>
                    <h2 className="Subtitle">NUESTROS PRODUCTOS</h2>
                    <div className="Products flex-wrap">
                        {productos.map(product => <Target key={product.id} data={product}/>)}
                    </div>
                </>
            }
        </div>
    )
}

export default Products