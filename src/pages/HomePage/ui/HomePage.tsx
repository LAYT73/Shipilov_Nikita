import React from 'react';
import styles from './HomePage.module.scss';
import { About, Hero } from '@/widgets';

const HomePage: React.FC = () => {
    return (
        <div className={styles.homepage}>
            <Hero />
            <About />
        </div>
    );
};

export default HomePage;
