import React from 'react';
import { Link } from 'react-router-dom';
import useForm from '../../Hooks/useForm';
import Button from '../form/Button';
import Input from '../form/Input';
import { UserContext } from '../../UserContext';
import Error from '../Helper/Error';
import style from './LoginForm.module.css';
import styles from '../form/Button.module.css';
import Head from '../Helper/Head';

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  const { userLogin, error, loading } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }
  return (
    <div>
      <section className="animeLeft">
        <Head title="Login" />
        <h1 className="title">Login</h1>
        <form className={style.form} onSubmit={handleSubmit}>
          <Input label="Usuario" type="text" name="username" {...username} />
          <Input label="Senha" type="text" name="password" {...password} />
          {loading ? (
            <Button disabled>Carregando... </Button>
          ) : (
            <Button> entrar </Button>
          )}
          <Error error={error & 'Dados incorretos'} />
        </form>
        <Link className={style.perdeu} to="/login/perdeu">
          Esqueceu a Senha ?
        </Link>
        <div className={style.cadastro}>
          <h2 className={style.subtitle}>Cadastra-se</h2>
          <p>Ainda não possui conta ? Cadastra-se no site.</p>
          <Link className={styles.button} to="/login/criar">
            Cadastro
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LoginForm;
