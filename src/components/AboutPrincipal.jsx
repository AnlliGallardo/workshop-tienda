import React, { Component } from 'react'
import Cards from '../components/Cards'






export default class ListContainer extends Component {
    constructor() {
        super()
        this.state = {
            prod: [],
            // searchTerm: 'Batman',
            // error: ''
        }
    }

    async componentDidMount() {
        const url = 'http://localhost:3004/productos'
        const resp = await fetch(url)
        const data = await resp.json()
        this.setState({prod:data})
    }

    render() {

        
        return (
            <div>

                    {
                        this.state.prod.map((producto, index) => {
                            return (
                                < Cards
                                 key={producto.name}
                                 prod={producto.image}
                                 />
                                
                            )
                        })
                    }

                </div>
            // </div>

        )
    }
}