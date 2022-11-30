import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import styles from './Header.module.css';
import { ReactComponent as Dogs } from '../../Assets/dogs.svg';
import { UserContext } from '../../UserContext';

const Header = () => {
  const { data, userLogout } = React.useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link to="/" aria-label="Dog - Home">
          <Dogs />
        </Link>
        {data ? (
          <Link to="/conta" className={styles.login}>
            <button onClick={userLogout}>Sair</button>
            {data.nome}
          </Link>
        ) : (
          <Link to="/login" className={styles.login}>
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
