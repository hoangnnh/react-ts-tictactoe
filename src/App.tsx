import React from 'react';

import Board from './components/Board';
import Footer from './components/Footer';
import styles from './styles/App.module.css';

const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 style={{textAlign: 'center'}}>Tic-Tac-Toe</h1>
      <Board />
      <Footer />
    </div>
  );
};

export default App;
