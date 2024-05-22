import React from 'react';
import { PHOTOS_GET } from '../../api';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import FeedPhotoItem from './FeedPhotoItem';
import styles from './FeedPhoto.module.css';

const FeedPhotos = ({ page, user, setModalPhoto, setInfinite }) => {
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    async function fethPhotos() {
      const total = 3;
      const { url, options } = PHOTOS_GET({ page, total, user });
      const { response, json } = await request(url, options);
      if (response && response.ok && json.length < total) setInfinite(false);
      console.log('Requeste :', json);
    }
    fethPhotos();
  }, [request, user, page, setInfinite]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <ul className={`${styles.feed} animeLeft `}>
        {data.map((photo) => (
          <FeedPhotoItem
            key={photo.id}
            photo={photo}
            setModalPhoto={setModalPhoto}
          />
        ))}
      </ul>
    );
};

export default FeedPhotos;
