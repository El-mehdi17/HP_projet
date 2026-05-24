import { NavLink,useLocation} from "react-router-dom";
import hp from "./images/icons/Copilot_20260504_110028.png"
import "./css/header.css"
import { useEffect, useState } from "react";
import Corps from "./Corps";
export default function Header(){

    let [click,setClick]=useState({a1:"effucase",a2:"",a3:"",a4:""})
    let loc=useLocation();

/////////////////////////////////



 useEffect(() => {
  const cas = () => {
    switch (loc.pathname) {
      case "/Accuile":
        setClick({ a1: "effucase", a2: "", a3: "", a4: "" });
        break;
      case "/produits":
        setClick({ a1: "", a2: "effucase", a3: "", a4: "" });
        break;
      case "/services":
        setClick({ a1: "", a2: "", a3: "effucase", a4: "" });
        break;
      case "/contact":
        setClick({ a1: "", a2: "", a3: "", a4: "effucase" });
        break;
      default:
        setClick({ a1: "", a2: "", a3: "", a4: "" });
    }
  };
    cas()
},[loc.pathname])

    return(
        <>
     <header>

       <div className="home">
        <nav className="nav_h_1">

                <NavLink  to="/Accuile" className={`a1 ${click.a1}`}  onClick={()=> setClick({a1:"effucase",a2:"",a3:"",a4:""})} >Accueil</NavLink>
                <NavLink  to="/produits" className={`a2 ${click.a2}`}  onClick={()=>setClick({a1:"",a2:"effucase",a3:"",a4:""})} >Produit</NavLink>
        </nav>
        <div className="logo">
                <img src={hp} alt="hp_image" />
        </div>
        <nav className="nav_h_2">
                <NavLink to="/services" className={`a3 ${click.a3}`}  onClick={()=>setClick({a1:"",a2:"",a3:"effucase",a4:""})} >Services</NavLink>
                <NavLink to="/contact"  className={`a4 ${click.a4}`}  onClick={()=>setClick({a1:"",a2:"",a3:"",a4:"effucase"})}>contact</NavLink>
        </nav>
        </div>
        <div className="inccrt">
                <NavLink to="/Connexion"><button className="conn_black">Connexion</button></NavLink>
                <NavLink to="/dashboard"><button className="conn_black">Dashboard</button></NavLink>
        </div>

     </header>

<Corps />



</>
    )
}
