import { Description } from '@material-ui/icons'
import React, { useState, useEffect, Component } from 'react'

export default class Cards extends Component {

  render(){
      const {id, name, precio, description, image} = this.props.prod
      return(
          
            <div>
             <div className="card ms-3 animate__animated animate__fadeIn" style={{ maxWidth: 540 }}>
                 <div className="row no-gutters">
                     <div className="col-md-4">
                         <img src={`./assets/productos/${image}.jpg`} className="card-img" alt="" />
                     </div>
                 <div className="col-md-8">
                     <div className="card-body">
                         <h5 className="card-title">{name}</h5>
                         <p className="card-text">{description}</p>
                         <p className="card-text">
                             <small className="text-muted">{precio}</small>
                         </p>
                        <button to="">
                        Más...
                        </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          
      )
  }
}
