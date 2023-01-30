import { useState } from "react"
import { useFetch } from "../../hooks/useFetch"
import { ManufacturerContext } from "./ManufacturerContext"
//Notificaciones
import swal from 'sweetalert'

export const ManufacturerProvider = ({children}) => {
    
const {data, manufacturers, features, categorys, isLoading} = useFetch("http://localhost:3000/api")

const [input, setInput] = useState({
    name: ''
})

const fetchRequests = (method, bodyValue, petiteUrl) => {
    const requestInit = {
      method: method,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(bodyValue)
    }
    fetch("http://localhost:3000/manufacturer/" + petiteUrl , requestInit )    //addManufacturer
      .then(res => res.json())
      .then(console.log)
  }

  const reload = () => {
    window.location.reload(true);
  }

  //notificaciones
  const addSuccess = () => {
    swal({
      title: 'Agrego un nuevo elemento 🦄',
      body: 'Creación exitosa 🦄',
      icon: 'success',
      button: 'Aceptar'
    })
      .then(() => {
        reload()
      });
  }

  const updateSeccess = () => {
    swal({
      title: 'Elemento actualizado 🦄',
      body: 'Actialización exitosa 🦄',
      icon: 'success',
      button: 'Aceptar'
    })
      .then(() => {
        reload()
      });
  }

  const deleteOption = () => {
    swal({
      title: "Está seguro?",
      text: "Una vez eliminado, No se podra recuperar!🦄",
      icon: "warning",
      buttons: ["Cancelar", "Continuar"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("El campo ha sido eliminado!", {
          icon: "success",
        }).then(() => {
          reload()
        });
      } else {
        swal({
          title: 'Tu campo esta a salvo! 🦄',
          body: 'Operación exitosa 🦄',
          icon: 'success',
          button: 'Aceptar'
        });
      }
    });
  }

  const opDenied = () => {
    swal({
      title: 'El elemento esta relacionado a uno o mas productos, no se puede eliminar 🦄 ',
      body: 'Operación rechazada 🦄',
      icon: 'warning',
      button: 'Aceptar'
    })
  }

  const inputEmpty = () => {
    swal({
      title: 'El campo es requerido 🦄 ',
      body: 'Operación rechazada 🦄',
      icon: 'warning',
      button: 'Aceptar'
    })
  }

  const alreadyExist = () => {
    swal({
      title: 'El campo ya existe 🦄 ',
      body: 'Operación rechazada 🦄',
      icon: 'warning',
      button: 'Aceptar'
    })
  }

  //elimina acentos
  let sinDiacriticos = (function(){
    let de = 'ÁÃÀÄÂÉËÈÊÍÏÌÎÓÖÒÔÚÜÙÛÑÇáãàäâéëèêíïìîóöòôúüùûñç',
         a = 'AAAAAEEEEIIIIOOOOUUUUNCaaaaaeeeeiiiioooouuuunc',
        re = new RegExp('['+de+']' , 'ug');

    return texto =>
        texto.replace(
            re, 
            match => a.charAt(de.indexOf(match))
        );
})();

  return (
    < ManufacturerContext.Provider value={{ isLoading, data, categorys, manufacturers, features, input, setInput, fetchRequests, addSuccess, updateSeccess, opDenied, deleteOption, inputEmpty, sinDiacriticos, alreadyExist }} >
        { children }
    </ ManufacturerContext.Provider>
  )
}
