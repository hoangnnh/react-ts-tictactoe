import React, { useState } from 'react';
import Cell from './Cell';
import styles from '../styles/Board.module.css';

type Player = 'X' | 'O';

const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const checkWinner = (
    board: (Player | null)[]
): { winner: Player; line: number[] } | null => {
    for (const [a, b, c] of winningLines) {
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            return { winner: board[a], line: [a, b, c] };
        }
    }
    return null;
};



const Board: React.FC = () => {
    const [history, setHistory] = useState<((Player | null)[])[]>([Array(9).fill(null)]);
    const playerForMove = (move: number): Player => (move % 2 === 0 ? 'X' : 'O');
    const [currentStep, setCurrentStep] = useState(0);
    const [winnerInfo, setWinnerInfo] = useState<{ winner: Player; line: number[] } | null>(null);

    const board = history[currentStep];
    const currentPlayer: Player = currentStep % 2 === 0 ? 'X' : 'O';


    const resetGame = () => {
        setHistory([Array(9).fill(null)]);
        setCurrentStep(0);
        setWinnerInfo(null);
    };

    const handleClick = (index: number) => {
        if (board[index] !== null || winnerInfo) return;

        const newBoard = [...board];
        newBoard[index] = currentPlayer;

        const newHistory = [...history.slice(0, currentStep + 1), newBoard];
        const result = checkWinner(newBoard);

        setHistory(newHistory);
        setCurrentStep(newHistory.length - 1);
        setWinnerInfo(result);
    };

    const renderBoard = () => {
        const rows = [];

        for (let row = 0; row < 3; row++) {
            const cells = [];

            for (let col = 0; col < 3; col++) {
                const index = row * 3 + col;
                const value = board[index];
                const isWinningCell = winnerInfo?.line.includes(index) ?? false;

                cells.push(
                    <Cell
                        key={index}
                        value={value}
                        onClick={() => handleClick(index)}
                        highlight={isWinningCell}
                    />
                );
            }

            rows.push(
                <div key={row} className={styles.row}>
                    {cells}
                </div>
            );
        }

        return rows;
    };

    return (
        <div className={styles.gameLayout}>
            <div>
                <div className={styles.grid}>{renderBoard()}</div>
                <div className={styles.statusBlock}>
                    {winnerInfo ? (
                        <p className={styles.winnerMessage}>Winner: {winnerInfo.winner}</p>
                    ) : board.every(cell => cell) ? (
                        <p className={styles.drawMessage}>It's a draw!</p>
                    ) : (
                        <p className={styles.currentPlayer}>Current Player: {currentPlayer}</p>
                    )}
                    <button onClick={resetGame} className={styles.resetButton}>🔁 Reset Game</button>
                </div>
            </div>

            <div className={styles.history}>
                <h3>Move History</h3>
                <ul className={styles.historyList}>
                    {history.map((_, move) => {
                        const isCurrent = move === currentStep;
                        const label =
                            move === 0
                                ? 'Go to Start'
                                : `Go to Move #${move} (${move % 2 === 0 ? 'O' : 'X'} moved)`;
                        return (
                            <li key={move} className={styles.historyItem}>
                                <button
                                    onClick={() => setCurrentStep(move)}
                                    className={isCurrent ? styles.current : ''}
                                >
                                    {label}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>

    );
};

export default Board;
