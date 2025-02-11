import React from 'react';
import styles from './App.module.scss';
import Routing from './routing/Routing';

export const App: React.FC = () => {
    return (
        <div className={styles.app}>
            <Routing />
        </div>
    );
};
