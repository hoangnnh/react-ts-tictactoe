import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer style={styles.footer}>
            <p>Creator: <strong>Nguyen Ngoc Huy Hoang</strong></p>
            <p>ID: <strong>23520532</strong></p>
            <p>Class: <strong>SS004.P26</strong></p>
            <p>Instructor: <strong>Ms. Le Thi Phuong</strong></p>
            <p>
                Link:{' '}
                <a href="https://github.com/hoangnnh/react-ts-tictactoe" target="_blank" rel="noopener noreferrer">
                    https://github.com/hoangnnh/react-ts-tictactoe
                </a>
            </p>
        </footer>
    );
};

const styles = {
    footer: {
        marginTop: '48px',
        padding: '24px',
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #ccc',
        fontSize: '14px',
        color: '#333',
    },
};

export default Footer;
