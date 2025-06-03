import React from 'react';
import styles from '../styles/Cell.module.css';

type Props = {
    value: 'X' | 'O' | null;
    onClick: () => void;
    highlight?: boolean;
};

const Cell: React.FC<Props> = ({ value, onClick, highlight = false }) => {
    return (
        <button
            className={`${styles.cell} ${highlight ? styles.highlight : ''}`}
            onClick={onClick}
        >
            {value && <span className={styles.mark}>{value}</span>}
        </button>
    );
};

export default Cell;
