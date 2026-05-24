import {BrowserRouter} from "react-router-dom"
import Header from "./Home/header"
import { AuthProvider } from "./Home/AuthContext"
import './App.css'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
