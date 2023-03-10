import React from 'react';
import { PHOTOS_GET } from '../../api';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import FeedPhotoItem from './FeedPhotoItem'; 
import styles from './FeedPhoto.module.css'

const FeedPhotos = () => {
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    async function fethPhotos() {
      const { url, options } = PHOTOS_GET({ page: 1, total: 6, user: 0 });
      const { response, json } = await request(url, options);
    }
    fethPhotos();
  }, [request]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <ul>
        {data.map((photo) => (
          <FeedPhotoItem key={photo.id} photo={photo} />
        ))}
      </ul>
    );
};

export default FeedPhotos;
