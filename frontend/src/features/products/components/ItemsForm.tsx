import { Grid, MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {LoadingButton} from '@mui/lab';
import FileInput from '../../../components/UI/FileInput/FileInput';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCategories } from '../../categories/categoriesSlice';
import { ProductMutation } from '../../../types';
import { fetchCategories } from '../../categories/categoriesThunks';
import { selectProductCreating } from '../productsSlice';
import { selectUser } from '../../users/usersSlice';
import { Navigate } from 'react-router-dom';

interface Props {
  onSubmit: (mutation: ProductMutation) => void;
}

const ItemsForm: React.FC<Props> = ({onSubmit}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const categories = useAppSelector(selectCategories);
  const createLoading = useAppSelector(selectProductCreating);
  const [state, setState] = useState<ProductMutation>({
    category: '',
    title: '',
    price: '',
    description: '',
    image: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchCategories());
    setLoading(false);
  }, [dispatch]);

  if (!user) {
    return <Navigate to="/login"/>
  }
  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setState(prevState => ({
        ...prevState, [name]: files[0]
      }));
    }
  };

  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            select
            id="category" label="Category"
            value={state.category}
            onChange={inputChangeHandler}
            name="category"
            required
          >
            <MenuItem value="" disabled>Please select a category</MenuItem>
            {categories.map(category => (
              <MenuItem key={category._id} value={category._id}>
                {category.title}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs>
          <TextField
            id="title" label="Title"
            value={state.title}
            onChange={inputChangeHandler}
            name="title"
            required
          />
        </Grid>

        <Grid item xs>
          <TextField
            id="price" label="Price"
            value={state.price}
            onChange={inputChangeHandler}
            name="price"
            required
          />
        </Grid>

        <Grid item xs>
          <TextField
            multiline rows={3}
            id="description" label="Description"
            value={state.description}
            onChange={inputChangeHandler}
            name="description"
          />
        </Grid>

        <Grid item xs>
          <FileInput
            label="Image"
            name="image"
            onChange={fileInputChangeHandler}
          />
        </Grid>

        <Grid item xs>
          <LoadingButton disabled={loading} loading={createLoading} type="submit" color="primary" variant="contained">
            Create
          </LoadingButton >
        </Grid>
      </Grid>
    </form>
  );
};

export default ItemsForm;