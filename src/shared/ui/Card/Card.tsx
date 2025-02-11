import React from 'react';
import styles from './Card.module.scss';
import { CardProps } from './Card.types.ts';

const Card: React.FC<CardProps> = ({ children }) => {
    return <div className={styles.card}>{children}</div>;
};

export default Card;
