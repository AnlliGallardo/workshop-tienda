import axios from 'axios';
import React, { useEffect, useState } from 'react'
import uuid from 'react-uuid'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import { fileUpload } from '../helpers/fileUpload'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import { Navbar } from './Navbar';



const baseUrl = "https://tiendita-app.herokuapp.com/productos/";


function ProductosRegistro() {

    const [producto, setProducto] = useState([]);
    const [value, setValue] = useState({    
            
            id: '',
            name: '',
            precio: '',
            iva: '',
            description: '',
            imagen: '',
        
    })

    const [tipomodal, setTipoModal] = useState("");
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);

    const Insertar = () =>{
        setModalInsertar(!modalInsertar)

    }
    const Eliminar = () =>{
        setModalEliminar(!modalEliminar)
    }

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        fileUpload(file)
        .then(response => {
            document.getElementById('image').value = response;
            value.imagen = response;
        }).catch(error => {
            console.log(error.message)
        })
    }

    const {id, name, precio, iva, description, imagen} = value;
    useEffect(() => {
       peticionGet();
    },[])
    

    const botonEnviar = () => {
        window.location.reload();
        peticionPost();
    }
    

    const handleChange = ({target}) => {
          setValue({
            ...value,
            [target.name]: target.value
          })
          console.log(value);
    }

    const SeleccionarProducto = (producto) => {
        setTipoModal('actualizar')
        setValue({
            
               id: producto.id,
               name: producto.name,
               precio: producto.precio,
               iva: producto.iva,
               description: producto.description,
               imagen: producto.imagen
            
        })
        console.log(producto)
        
   }

        const peticionGet = async () => {
            const res =  await fetch(baseUrl);
            const data = await res.json();
            console.log(data)
            setProducto(data)
            localStorage.getItem('producto', JSON.stringify('producto'))
        }

        
        const peticionPost = async () => {
            await axios.post(baseUrl,value)
            .then(response => {
                Insertar();
                peticionGet();
            console.log(response)
            }) 
            .catch(error => {
            console.log(error.message)
            })
            
        }

    const peticionDelete = async () => {
        await axios.delete(baseUrl+id)
        .then(response => {
            setModalEliminar(false);
            peticionGet();
        }).catch(error => {
            console.log(error.message);
        })
    }


    const peticionPut = async () => {
        await axios.put(baseUrl+id,value)
        .then(response => {
            Insertar();
            peticionGet();
            console.log(response)
        })
        .catch(error => {
            console.log(error.message)
        })
    }

    return (

        <div className="container">
        <br />
            <button id="btndark" className="btn btn-dark float-end"  onClick={Insertar}
            >Ingresar Producto Nuevo</button><br /><br /><br />
            <h4>Registro</h4>
            <br />
        
                    <table className="table" style={{textAlign:"center"}}>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Iva</th>
                                        <th >Descripción</th>
                                        <th>Imagen</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                
                    
                    <br /><br />
          {/* <div className="gap-2 d-md-flex justify-content-me">
          <button className="btn btn-primary btn-sm" 
          onClick={() => botonEnviar()}>Enviar</button>
              <button className="btn btn-warning btn-sm ">
                Editar
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => peticionPut()}>
                Eliminar
              </button>
              </div> */}

              <tbody style={{textAlign:"center"}}>
                        {
                            producto.map(pro => {
                                return(
                                    <tr key={pro.id}>
                                        
                                        <td>{pro.name}</td>
                                        <td>{pro.precio}</td>
                                        <td>{pro.iva}</td>
                                        <td>{pro.description}</td>
                                        <td><img src={pro.imagen} width="50px" height="50px" alt=""/></td>
                                        <td>
                                        <button className="btn btn-primary"
                                         onClick={() => {SeleccionarProducto(pro); Insertar()}}><AssignmentIcon/></button>
                                         {" "}
                                         <button className="btn btn-danger"
                                         onClick={() => {SeleccionarProducto(pro); Eliminar(true)}}><DeleteSweepIcon/></button>
                                         </td>
                                    </tr>
                                )
                            })
                        }
                            
                 </tbody>
            </table>

        <Modal id="form" isOpen={modalInsertar}>
        
              <h1 textAlign="center">Ingresar Nuevo Producto</h1>
              <ModalHeader>
              </ModalHeader>
                    <ModalBody>
                        
                        <input id="id" name="id" value={id}  onChange={handleChange} readOnly style={{display: 'none'}} />
                        <br/>
                        <label>Nombre de Producto</label>
                        <input className="form-control" id="name" name="name"  onChange={handleChange} value={value?value.name:''}/>
                        
                        <br/>
                        <label>Precio</label>
                        <input className="form-control" id="precio" name="precio"  onChange={handleChange} value={value?value.precio:''}/>
                        <br/>
                        <label>Iva</label>
                        <input className="form-control" id="iva" name="iva"  onChange={handleChange} value={value?value.iva:''}/>
                        <br/>
                        <label>Descripcion</label>
                        <input className="form-control" id="description" name="description"  onChange={handleChange} value={value?value.description:''}/>
                        <br/>
                        <input 
                            id="fileSelector"
                            type="file"
                            name="file"
                            style={{display:'none'}}
                            onChange={handleFileChange}
                            
                            />
                            <button className="btn btn-success"
                            onClick={handlePictureClick}
                            >Imagen</button>

                            <input 
                            type="text"
                            name="imagen"
                            id="image"
                            value={value?value.imagen:''}
                            onChange={handleChange}
                            className="form-control"
                            
                            />
                        <br/>         
                    </ModalBody>
              <ModalFooter>
                  {setTipoModal=='insertar'}
              <button className="btn btn-primary btn-sm" onClick={peticionPost}>
                Insertar
              </button>
              <button className="btn btn-success btn-sm" onClick={peticionPut}>
                Actualizar
              </button>
              <button className="btn btn-danger btn-sm" onClick={Insertar} data-bs-dismiss="modal">
                Cancelar
              </button>
              </ModalFooter>
        
          </Modal>

          <Modal isOpen={modalEliminar}>
                    <ModalBody>
                        Está seguro de eliminar el producto {value && value.name}
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger"
                       onClick={() => peticionDelete()}>Sí</button>
                        <button className="btn btn-secundary"
                       onClick={() => setModalEliminar(false)}>No</button>
                    </ModalFooter>
         </Modal>
          
        </div>
    
    )
}
 


export default ProductosRegistro