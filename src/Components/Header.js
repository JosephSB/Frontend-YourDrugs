import React,{useState, useEffect}  from 'react'
import { NavLink } from 'react-router-dom';

const Header = ()=>{
    const [userName, setUserName] = useState();
    const [route, setRoute] = useState("/Login");

    useEffect(() => {
        if(window.localStorage.getItem('userName') == null) setUserName("Inicia Sesion")
        else {
            let x= window.localStorage.getItem('userName')
            setUserName(x)
            setRoute(`/Perfil/${x}`)
        }
    }, []);

    return(
        <>
            <div className="Header flex-row">
                <div className="Span-Session">
                <NavLink className="nav-link" exact to={route} activeClassName="active">
                    <i className="fas fa-user"></i> {userName}
                </NavLink>
                </div>
                <NavLink className="nav-link" exact to="/products" activeClassName="active"><i className="fas fa-tablets"></i> PRODUCTS</NavLink>
                <div className="Cont-Img center">
                    <NavLink exact to="/" activeClassName="activeImg">
                        <img className="ImgLogo flex-row" src={`${process.env.REACT_APP_API_HOST}/images/Logotipo.png`} alt="YourDrugs"></img>
                    </NavLink>
                </div>
                <NavLink className="nav-link" exact to="/Cart" activeClassName="active">
                    <i className="fas fa-shopping-cart"></i> CART
                    {(window.localStorage.getItem('products') !== "" &&  window.localStorage.getItem('products') !== null) &&<>
                        {JSON.parse(window.localStorage.getItem('products')).length > 0 &&
                            <span className="Span-Products-Cart center">
                                {JSON.parse(window.localStorage.getItem('products')).length} 
                            </span>
                        }
                    </>}
                </NavLink>
            </div>
        </>
    )
}

export default Header