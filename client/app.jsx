import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { DevTools } from './stores/dev_tools'
import configureStore from './stores/configure_store'
import { ComponentCreator, ParamProvider } from './components'
import './styles/resets.scss'
import './styles/app.scss'
import './styles/fonts'

const [store, history] = configureStore()

var div = document.createElement("div");
div.id = 'mount'
document.body.appendChild(div);

ReactDOM.render(
  <Provider store={store}>
    <div className="app">
      <Router history={history}>
        <Route path="/*" component={(props,state) => {
          return <ParamProvider params={props.params}>
            <ComponentCreator slug={'site'} />
          </ParamProvider>
        } } />
      </Router>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('mount')
)
