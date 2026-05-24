import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    id_produit:"",
    img:"",
    name:"",
    prix:"",
    client_name:"",
    client_email:"",
    client_status:"",
    client_description:"",
    technicien_id:"",
    technicien_name:"",
    technicien_specialite:"",
    technicien_tel:""

}
const formSlice = createSlice({
    name:"form",
    initialState,
    reducers:{

        setId_produit:(state, action) => {
            state.id_produit = action.payload;
        },
        setImages:(state,action)=>{
             state.img = action.payload;
        },
        setName:(state, action) => {
            state.name = action.payload;
        },
        setPrix:(state, action) => {
            state.prix = action.payload;
        },
        setClient_name:(state, action) => {
            state.client_name = action.payload;
        },
        setClient_email:(state, action) => {
            state.client_email = action.payload;
        },
        setClient_status:(state,action)=>{
            state.client_status = action.payload;
        },
        setClient_description:(state, action) => {
            state.client_description = action.payload;
        },
        setTechnicien_id:(state, action) => {
            state.technicien_id = action.payload;
        },
        setTechnicien_name:(state, action) => {
            state.technicien_name = action.payload;
        },
        setTechnicien_specialite:(state, action) => {
            state.technicien_specialite = action.payload;
        },
        setTechnicien_tel:(state, action) => {
            state.technicien_tel = action.payload;
        }
    }
})
export const {setId_produit,setImages, setName, setPrix, setClient_name, setClient_email, setClient_status, setClient_description, setTechnicien_id, setTechnicien_name, setTechnicien_specialite, setTechnicien_tel} = formSlice.actions;
const store = configureStore({
    reducer:{
        form: formSlice.reducer
    }
})
export default store;
