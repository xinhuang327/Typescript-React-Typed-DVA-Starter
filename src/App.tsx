
import "babel-polyfill"
import dva from 'typed-dva'

import count from './models/count'
import router_app from './router_app'

import { browserHistory } from "react-router"

import "./app.css"

const app = dva({ history: browserHistory })

app.model(count)

app.router(router_app)

let renderFunc = app.start('#app')

declare var module: any

if (module.hot) {
	module.hot.accept('./router_app', () => {
		renderFunc(router_app)
	})
}