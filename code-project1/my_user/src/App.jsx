
import Login from './header-user/login'
import './App.css'
import {BrowserRouter} from "react-router-dom"
import HeaderUser from "./header-user/header_user"
import Technicien from './header-user/technicien'
import ProductForm from './header-user/produits'
import Livreur from "./header-user/livreur"
import Corps from './header-user/corps'

function App() {



  return (
    <BrowserRouter>

    
    <HeaderUser />
     <Corps />



    </BrowserRouter>
  )
}

export default App
