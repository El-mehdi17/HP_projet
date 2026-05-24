import { Form } from "lucide-react";
import {Routes,Route,Navigate} from "react-router-dom"
import Livreur from "./livreur";
import ProductForm from "./produits";
import Technicien from "./technicien";
import Fournisseur from "./Fournisseur";

export default function Corps(){

    return(
        <Routes>
             <Route path="/" element={<Navigate to="/livreur" />} />
            <Route path="/produits" element={<ProductForm />} />
            <Route path="/technicien" element={<Technicien />} />
            <Route  path="/Fournisseur" element={<Fournisseur />}/>
            <Route  path="/livreur" element={<Livreur />} />
        </Routes>
    )
}
