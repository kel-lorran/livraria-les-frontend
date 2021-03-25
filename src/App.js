import { Provider } from 'react-redux';

import Routes from './pages/routes'
import './App.css';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
