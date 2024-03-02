import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import Products from './features/products/Products';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Register from './features/users/Register';
import Login from './features/users/Login';
import NewItems from './features/products/NewItems';
import Product from './features/products/Product';

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
            <Route path="/" element={<Products />} />
            <Route path="/:id" element={<Product />} />
            <Route path="/new-item" element={<NewItems />} />
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
