import {Button, Card, CardContent, CardHeader, CardMedia, CircularProgress, Grid, styled, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {deleteLoading, selectOnePost, selectProductOnefetch} from './productsSlice';
import {deleteProduct, fetchOneProducts} from './productsThunks';
import { apiURL } from '../../constants';
import DeleteIcon from '@mui/icons-material/Delete';
import {selectUser} from "../users/usersSlice";



const ImageCardMedia = styled(CardMedia)({
  height: '0',
  paddingTop: '55%',
});
const Product: React.FC = () => {
  const {id} = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const item = useAppSelector(selectOnePost);
  const loading = useAppSelector(selectProductOnefetch);
  const removeLoading = useAppSelector(deleteLoading);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  let cardImage;

  if (item?.image) {
    cardImage = apiURL + '/' + item?.image;
  }

  useEffect(() => {
    dispatch(fetchOneProducts(id));
  }, [dispatch, id]);

  const removeProduct = async (id: string) => {
    await dispatch(deleteProduct(id));
    navigate('/');
  }

  return (
    <>
      {loading ? <CircularProgress/> : (
        <Grid item sm md={6} lg={4}>
          <Card sx={{height: '100%', width: '50%', padding: '15px', marginBottom: '30px'}}>
            {cardImage && (
              <ImageCardMedia image={cardImage} title={item?.title} />
            )}
            <CardHeader title={item?.title}/>
            <CardContent>
              <strong>{item?.price} KGS</strong>
            </CardContent>
            <Typography component="h1" variant="h6">{item?.description}</Typography>
            {item?.category?.title && (
              <Typography component="h1" variant="h6">{item.category.title}</Typography>
            )}
            <Grid container justifyContent="flex-end">
              {user && (
                <Button type="button" onClick={() => removeProduct(id)} disabled={removeLoading ? removeLoading === id : false}>
                  {removeLoading && removeLoading === id && <CircularProgress/>}
                  <DeleteIcon/>
                </Button>
              )}
            </Grid>
          </Card>
        </Grid>
      )}

    </>
  );
};

export default Product;