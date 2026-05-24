import {Route,Routes, NavLink} from "react-router-dom";
import Technicien from "./technicien";
import ProductForm from "./produits";
import hp from "./image/icons/Copilot_20260504_110028.png"
import "./css/header.css"
export default function HeaderUser() {

   return (
    <header>
        <div className="logo"><img src={hp} alt="" /></div>
        <ul>
            
            <li><NavLink to="/produits">Produits</NavLink></li>
            <li><NavLink to="/technicien">technicien</NavLink></li>
            <li><NavLink to="/Fournisseur">fournisseur</NavLink></li>
            <li><NavLink to="/livreur">livreuse</NavLink></li>
        </ul>
    </header>
   )



}