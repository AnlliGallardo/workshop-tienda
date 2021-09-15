import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import { Productos } from '../data/productos';



export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={Productos} />

                </Switch>
            </div>
        </Router>
    )
}
