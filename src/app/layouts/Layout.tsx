import React from 'react';
import styles from './Layout.module.scss';
import { Footer, Header } from '@/widgets';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <Header />
            <main className={styles.content_container}>{children}</main>
            <Footer />
        </div>
    );
};
