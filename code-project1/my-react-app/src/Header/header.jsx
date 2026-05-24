import { Route,Routes,NavLink } from "react-router-dom";
import axios from "axios";
import "./css/code.css";
import Remplir from "./Remplir";
import Home from "./Home";
import Contact from "./contact";
import hp from "./image/icons/Copilot_20260504_110028.png"
export default function Header(){
    return(
<>
<style>
{`
@media print {
    .no-print {
        display: none !important;
    }
}
`}
</style>
<header className="no-print">
    <div className="logoa"><img src={hp} alt="" /></div>
    <div className="menu">
<NavLink to="/">Home</NavLink>
<NavLink to="/about">Remplir</NavLink>
<NavLink to="/contact">Contact SAV</NavLink>
</div>
</header>

<Routes>
<Route path="/" element={<Home />} />
<Route path="/about" element={<Remplir />} />
<Route path="/contact" element={<Contact />} />
</Routes>

 </>
    )
}
