import React from 'react';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__bottom}>
                © 2025 Nikita Shipilov. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
