import { render } from 'preact'
import './index.css'
import { App } from './app.jsx'
import {Login} from './login.jsx'
import {AppRoute} from './router.jsx'

render(<AppRoute />, document.getElementById('app'))
