import React, { useState, useEffect, useId } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios';
import {v4} from 'uuid'


import '../components/fruta.css'

const Fruta = () => {

    const [nombre, setNombre] = useState("")
    const [id, setId] = useState(0)
    const [imagen, setImagen] = useState("")
    const [frutas, setFrutas] = useState([])
    

    const hadleAdd = () => {
        axios.post('http://localhost:3002/create',{
            id: id,
            nombre:nombre,
            imagen:imagen,
           
         }).then(()=>{
           Swal.fire({
             position: 'top-end',
             icon: 'success',
             title: 'Your work has been saved',
             showConfirmButton: false
           })
         })
    }

    useEffect(() => {
        handleGet()
        console.log(id)
    }, [])


    const handleGet = () => {
        axios.get('http://localhost:3002/').then((response) => {
            setFrutas(response.data)
            console.log(frutas)
        })
    }

    return (
        <div className='container text-center w-50 p-5'>
            <div id='Formulario container' >
                <form>
                <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">id</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            onChange={(event) => { setId(event.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            onChange={(event) => { setNombre(event.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Imagen</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            onChange={(event) => { setImagen(event.target.value) }} />
                    </div>
                    <button onClick={hadleAdd} type="submit" className="btn btn-danger">Enviar</button>
                </form>
            </div>
            <br />

            <div className="row">
            
                {
                    frutas.map((dato, key) => {
                        return (
                            <div className="col-sm-6 mb-3 mb-sm-0 py-2">
                                <div  key={dato.id} className="card">
                                <img  id="imagen" src={dato.img} class="card-img-top" alt="..."/>
                                    <div className="card-body">
                                        <h5 className="card-title">{dato.nombre}</h5>
                                    </div>
                                </div>
                                </div>
                        )
                    })
                }
                
            </div>
        </div>
    )
}

export default Fruta