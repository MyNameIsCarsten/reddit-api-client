import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import './index.css'
import store from './components/App/store';
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
const render = () => {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App
          state={store.getState()}
          dispatch={store.dispatch}
        />
      </Provider>
    </React.StrictMode>
  )
}

render();
// Subscribe render to changes to the `store`
store.subscribe(render);
