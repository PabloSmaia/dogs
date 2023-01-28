import React from 'react';
import useFetch from '../../Hooks/useFetch';
import useForm from '../../Hooks/useForm';
import Button from '../form/Button';
import Input from '../form/Input';
import styles from './UserPhotoPost.module.css';

const UserPhotoPost = () => {
  const peso = useForm();
  const idade = useForm('number');
  const nome = useForm('number');
  const [img, setImage] = React.useState({});
  const { data, error, loading, request } = useFetch();

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleImgChange() {}

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form action={handleSubmit}>
        <Input label="None" type="text" name="nome" />
        <Input label="Peso" type="text" name="peso" />
        <Input label="Idade" type="text" name="idade" />
        <input type="file" name="img" id="img" onChange={handleImgChange} />
        <Button> Enviar</Button>
      </form>
    </section>
  );
};

export default UserPhotoPost;
