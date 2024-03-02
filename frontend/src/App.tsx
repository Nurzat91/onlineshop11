import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import Home from './features/forum/Home';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Register from './features/users/Register';
import Login from './features/users/Login';

function App() {

  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<ErrorPage/>} />
          </Routes>
        </Container>
      </main>
    </>
  )
}

export default App
