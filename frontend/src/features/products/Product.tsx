import { Card, CardContent, CardHeader, CardMedia, CircularProgress, Grid, styled, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOnePost, selectProductOnefetch} from './productsSlice';
import { fetchOneProducts } from './productsThunks';
import { apiURL } from '../../constants';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '25%',
});
const Product: React.FC = () => {
  const {id} = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const item = useAppSelector(selectOnePost);
  const loading = useAppSelector(selectProductOnefetch);

  let cardImage;

  if (item?.image) {
    cardImage = apiURL + '/' + item?.image;
  }

  useEffect(() => {
    dispatch(fetchOneProducts(id));
  }, [dispatch, id]);

  return (
    <>
      {loading ? <CircularProgress/> : (
        <Grid item sm md={6} lg={4}>
          <Card sx={{height: '100%'}}>
            <ImageCardMedia image={cardImage} title={item?.title}/>
            <CardHeader title={item?.title}/>
            <CardContent>
              <strong>{item?.price} KGS</strong>
            </CardContent>
            <Typography component="h1" variant="h5">{item?.description}</Typography>
            <Typography component="h1" variant="h5">{item?.category.title}</Typography>
            {/*<Typography component="h1" variant="h5">{user.displayName}</Typography>*/}
          </Card>
        </Grid>
      )}

    </>
  );
};

export default Product;