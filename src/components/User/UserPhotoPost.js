import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PHOTO_POST } from '../../api';
import useFetch from '../../Hooks/useFetch';
import useForm from '../../Hooks/useForm';
import Button from '../form/Button';
import Input from '../form/Input';
import Error from '../Helper/Error';
import styles from './UserPhotoPost.module.css';
import Head from '../Helper/Head';

const UserPhotoPost = () => {
  const peso = useForm();
  const idade = useForm('number');
  const nome = useForm('number');
  const [img, setImage] = React.useState({});
  const { data, error, loading, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) navigate('/conta');
  }, [data, navigate]);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('img', img.raw);
    formData.append('nome', nome.value);
    formData.append('peso', peso.value);
    formData.append('idade', idade.value);

    const token = window.localStorage.getItem('token');
    const { url, options } = PHOTO_POST(formData, token);
    request(url, options);
  }

  function handleImgChange({ target }) {
    setImage({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title="poste a sua foto" />
      <form onSubmit={handleSubmit}>
        <Input label="None" type="text" name="nome" {...nome} />
        <Input label="Peso" type="text" name="peso" {...peso} />
        <Input label="Idade" type="text" name="idade" {...idade} />
        <input
          className={styles.file}
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}
        />
        {loading ? <Button disable> Enviando</Button> : <Button>Enviar</Button>}
        <Error error={error} />
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${img.preview}')` }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;
