import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios';

import '../components/fruta.css'

const Fruta = () => {

    const [nombre, setNombre] = useState("")
    const [id, setId] = useState(0)
    const [imagen, setImagen] = useState("")
    const [frutas, setFrutas] = useState([])
    const [editar, setEditar] = useState(false)

    useEffect(() => {
        handleGet()
    }, [])

    const handleGet = () => {
        axios.get('http://localhost:3002/').then((response) => {
            setFrutas(response.data)
            console.log(frutas)
        })
    }

    const hadleAdd = () => {
        axios.post('http://localhost:3002/create', {
            id: id,
            nombre: nombre,
            imagen: imagen,
        }).then(() => {
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false
            })
        })
    }

    const hadleEdit = (dato) => {
        setEditar(true)
        setId(dato.id)
        setNombre(dato.nombre)
        setImagen(dato.img)
    }

    const hadleUpdate = () => {
        axios.put(`http://localhost:3002/edit`, {

            id: id,
            nombre: nombre,
            imagen: imagen,

        }).then(() => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Datos actualizados',
                showConfirmButton: false
            })
        })
    }

    const handleDelete = (id, nomb) => {

        Swal.fire({
            title: 'Eliminar?',
            text: `Deseas eliminar la fruta ${nomb}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'

        }).then((result) => {
            if (result.isConfirmed) {

                axios.delete(`http://localhost:3002/delete/${id}`).then(() => {
                    handleGet()
                    console.log('Fruta eliminada', nomb)
                })

                Swal.fire(
                    'Deleted!',
                    nomb + ' Ha sido eleminada',
                    'success'

                )
            }
        })

    }





    return (

        <div className='container text-center mb-3'>
            <div className='col-4  py-2' >
            
                <form className="form-group">
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">id</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            value={id}
                            onChange={(event) => { setId(event.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            value={nombre}
                            onChange={(event) => { setNombre(event.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Imagen</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            value={imagen}
                            onChange={(event) => { setImagen(event.target.value) }} />
                    </div>
                    {
                        editar == true
                            ? <button onClick={hadleUpdate} type="submit" className="btn btn-primary">Actualizar</button>
                            : <button onClick={hadleAdd} type="submit" className="btn btn-danger">Enviar</button>
                    }

                </form>
            </div>
            <br />

            <div className="row">

                {
                    frutas.map((dato, key) => {
                        return (
                            <div className="col-sm-4 mb-3 mb-sm-0 py-2">
                                <div key={dato.id} className="card">
                                    <img id="imagen" src={dato.img} class="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{dato.nombre}</h5>
                                        <div class="d-grid gap-2 d-md-block ">
                                            <button class="btn btn-outline-success" type="button"
                                                onClick={() => {
                                                    hadleEdit(dato)
                                                }}
                                            >Editar</button>
                                            <button
                                                class="btn btn-outline-danger"
                                                type="button"
                                                onClick={() => {
                                                    handleDelete(dato.id, dato.nombre)
                                                }}
                                            >Eliminar</button>
                                        </div>
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