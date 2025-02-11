import React from 'react';
import styles from './HomePage.module.scss';
import { About } from '@/widgets';

const HomePage: React.FC = () => {
    return (
        <div className={styles.homepage}>
            <About />
        </div>
    );
};

export default HomePage;
