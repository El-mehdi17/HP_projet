

import {Route,Routes,Navigate} from "react-router-dom"
import Accuile from "./Accuile"
import Produits from "./Produits"
import Services from "./Services"
import Contact from "./Contact"
import Inscription from "./Inscription"
import Connexion from "./Connexion"
import Dashboard from "./Dashboard"
import MotDePasseOublie from "./MotDePasseOublie"

export default function Corps(){

   return(
    <Routes>
        <Route path="/" element={<Navigate to="/Accuile" />} />
        <Route path="/Accuile"  element={<Accuile />} />
        <Route path="/produits" element={<Produits />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact"  element={<Contact />} />
        <Route path="/Inscription" element={<Inscription />} />
        <Route path="/Connexion"   element={<Connexion />} />
        <Route path="/dashboard"   element={<Dashboard />} />
        <Route path="/mot-de-passe-oublie" element={<MotDePasseOublie />} />
    </Routes>
   )

}
