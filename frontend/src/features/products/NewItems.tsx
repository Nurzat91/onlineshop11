import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { createProduct } from './productsThunks';
import { ProductMutation } from '../../types';
import ItemsForm from './components/ItemsForm';

const NewItems = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (productMutation: ProductMutation) => {
    await dispatch(createProduct(productMutation)).unwrap();
    navigate('/');
  };
  return (
    <>
      <Typography variant="h4">New product</Typography>
      <ItemsForm onSubmit={onFormSubmit} />
    </>
  );
};

export default NewItems;