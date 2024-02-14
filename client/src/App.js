import { Route, Routes } from 'react-router-dom';
import { Login } from './components/login';
import { User } from './components/user';


import './App.css';
import { Todos } from './components/todos';

function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Routes>
        <Route
          path={'/'}
          element={
            isAuthenticated ? <User /> : <Login />
          }
        />

        <Route
          path={'/all-todos'}
          element={
            <Todos />
          }
        />
      </Routes>

    </div>
  );
}

export default App;
