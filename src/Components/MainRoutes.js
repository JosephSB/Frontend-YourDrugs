import React,{useState,useEffect} from 'react'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import HomePage from '../Pages/Home';
import Header from '../Components/Header';
import Footer from './Footer';
import Products from '../Pages/Products';
import InfoProducto from '../Pages/InfoProduct';
import Cart from '../Pages/Cart';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import PerfilUser from '../Pages/PerfilUser';

const MainRoutes = () =>{
    const [carr, setCarr] = useState([]);

    useEffect(() => {
        if(window.localStorage.getItem('products') != null && window.localStorage.getItem('products') !== ""){
            setCarr(JSON.parse(window.localStorage.getItem('products')))
        }else{
            window.localStorage.setItem('products', "")
        }
    }, []);

    return(
        <>
            <Router>
            <Header/>
            <Switch>
                <Route exact path="/" component={HomePage}></Route>
                <Route exact path="/Products" component={Products}></Route>
                <Route exact path="/Products/:nameProduct" component={() => <InfoProducto setCarr={setCarr} carr={carr}/>}></Route>
                <Route exact path="/Cart" component={() => <Cart setCarr={setCarr} carr={carr}/>}></Route>
                <Route exact path="/Login" component={Login}></Route>
                <Route exact path="/Register" component={Register}></Route>
                <Route exact path="/Perfil/:userName" component={PerfilUser}></Route>
            </Switch>
            <Footer/>
            </Router>
        </>
    )
}

export default MainRoutes