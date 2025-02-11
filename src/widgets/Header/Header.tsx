import React from 'react';
import styles from './Header.module.scss';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}></div>
        </header>
    );
};

export default Header;
