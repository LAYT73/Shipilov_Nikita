import React from 'react';
import { motion } from 'framer-motion';
import styles from './Header.module.scss';

const Header: React.FC = () => {
    const containerVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.2 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -80 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <motion.header
            className={styles.header}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className={styles.container}>
                <motion.div className={styles.header__logo} variants={itemVariants}>
                    <h1>Shipilov / </h1>
                    <div className={styles.words}>
                        <div className={styles.words__container}>
                            <motion.span className={styles.words__word} variants={itemVariants}>
                                React
                            </motion.span>
                            <motion.span className={styles.words__word} variants={itemVariants}>
                                TypeScript
                            </motion.span>
                            <motion.span className={styles.words__word} variants={itemVariants}>
                                NextJS
                            </motion.span>
                            <motion.span className={styles.words__word} variants={itemVariants}>
                                SCSS
                            </motion.span>
                        </div>
                    </div>
                </motion.div>
                <motion.div className={styles.header__nav} variants={itemVariants}>
                    <ul className={styles.nav__list}>
                        <motion.li className={styles.nav__item} variants={itemVariants}>
                            / About
                        </motion.li>
                        <motion.li className={styles.nav__item} variants={itemVariants}>
                            / Portfolio
                        </motion.li>
                        <motion.li className={styles.nav__item} variants={itemVariants}>
                            / Stack
                        </motion.li>
                        <motion.li className={styles.nav__item} variants={itemVariants}>
                            / Experience
                        </motion.li>
                        <motion.li className={styles.nav__item} variants={itemVariants}>
                            / Contacts
                        </motion.li>
                    </ul>
                </motion.div>
                <button>
                    <div className={styles.dots__border}></div>
                    <span className={styles.text__button}>Discuss for Projects</span>
                </button>
            </div>
        </motion.header>
    );
};

export default Header;
