import './App.css';
import React from 'react';


class App extends React.Component {

    state = {
        values: [
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '']
        ],
        player: "y",
        isWinner: false,
    }


    restartGame = () => {
        const newBoard = [
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '']
        ]

        this.setState({
            values: newBoard,
            player: 'y',
            isWinner: false
        })
    }

    cellClicked = (row, cell) => {
        if(this.state.isWinner) {
            return;
        }
        if (this.state.values[row][cell] !== '') {
            return
        }
        const currentValues = this.state.values;
        const currentPlayer = this.state.player === "y" ? "r" : "y";
        while ((row !== 5) && this.state.values[row + 1][cell] !== "y" && this.state.values[row + 1][cell] !== "r") {
            row++
        }
        currentValues[row][cell] = this.state.player;
        this.setState({
            values: currentValues,
            player: currentPlayer
        })
        this.checkWin(row,cell);
    }


    checkWin = (row, cell) => {
        
        let tempCell = cell;
        let secondCell, thirdCell, fourthCell = false;
        while (tempCell !== 0 && this.state.values[row][tempCell - 1] === this.state.player) {
            tempCell--
        }
        if (tempCell + 3 <= 6) {
            secondCell = this.state.values[row][tempCell] === this.state.values[row][tempCell+1];
            thirdCell = this.state.values[row][tempCell] === this.state.values[row][tempCell+2];
            fourthCell = this.state.values[row][tempCell] === this.state.values[row][tempCell+3];
            if (secondCell && thirdCell && fourthCell) {
                this.setState({
                    isWinner: true
                })
            }
        }

        tempCell = cell;
        let tempRow = row;

        while (tempRow !== 0 && this.state.values[tempRow - 1][cell] === this.state.player) {
            tempRow--
        }
        if (tempRow + 3 <= 5) {
            secondCell = this.state.values[tempRow][cell] === this.state.values[tempRow + 1][cell];
            thirdCell = this.state.values[tempRow][cell] === this.state.values[tempRow + 2][cell];
            fourthCell = this.state.values[tempRow][cell] === this.state.values[tempRow + 3][cell];
            if (secondCell && thirdCell && fourthCell) {
                this.setState({
                    isWinner: true
                })
            }
        }

        tempCell = cell;
        tempRow = row;
        while(tempRow !== 0 && tempCell !== 0 && this.state.values[tempRow - 1][tempCell - 1] === this.state.player) {
            tempCell--;
            tempRow--;
        }
        if(tempRow + 3 <= 5 && tempCell + 3 <= 6) {
            secondCell = this.state.values[row][cell] === this.state.values[tempRow + 1][tempCell + 1];
            thirdCell = this.state.values[row][cell] === this.state.values[tempRow + 2][tempCell + 2];
            fourthCell = this.state.values[row][cell] === this.state.values[tempRow + 3][tempCell + 3];
            if (secondCell && thirdCell && fourthCell) {
                this.setState({
                    isWinner: true
                })
            }
            
        }

        while(tempRow !== 0 && tempCell !== 6 && this.state.values[tempRow - 1][tempCell + 1] === this.state.player) {
            tempCell++;
            tempRow--;
        }
        if(tempRow + 3 <= 5 && tempCell + 3 >= 0) {
            secondCell = this.state.values[row][cell] === this.state.values[tempRow + 1][tempCell - 1];
            thirdCell = this.state.values[row][cell] === this.state.values[tempRow + 2][tempCell - 2];
            fourthCell = this.state.values[row][cell] === this.state.values[tempRow + 3][tempCell - 3];
            if (secondCell && thirdCell && fourthCell) {
                this.setState({
                    isWinner: true,
                })
            }
        }




    }



    render() {
        return (
            <div className="App">
                <br/>
                <table>
                    {
                        this.state.values.map((row, rowIndex) => {
                            return (
                                <tr>
                                    {
                                        row.map((cell, cellIndex) => {
                                            return (
                                                <td className={cell === "y" ? "yellow" : cell === "r" ? "red" : "white"}
                                                    onClick={() => this.cellClicked(rowIndex, cellIndex)}>

                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </table>
                <button onClick={() => this.restartGame()}>Restart Game</button>
                <h1 className={this.state.isWinner ? "winner" : "noWinner"}>{this.state.player === 'r' ? "Yellow Won" : "Red Won"}</h1>

            </div>
        );
    }

}

export default App;
