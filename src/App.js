import React, { useEffect, useState } from "react";
import "./App.css";
//Initialize n number
const INITIAL_N = 3;

export default function App() {
  const [n, setN] = useState(INITIAL_N);
  const [matrix, setMatrix] = useState();


  const generateMatrix = (n) => {
    let rows = [];
    //create Matrix loop columns into rows
    for (let row = 0; row < n; row++) {
      let column = [];

      for (let cell = 0; cell < n; cell++) {
        column.push(Math.floor(Math.random() * 999));
      }

      rows.push(column);
    }

    setMatrix(rows);
  };

  const increaseMatrix = () => {
    generateMatrix(n + 1);

    setN(n + 1);
  };

  const decreaseMatrix = () => {
    generateMatrix(n - 1);

    setN(n - 1);
  };

  const sumRow = (row) => {
    let total = 0;

    row.forEach((cell) => {
      total += cell;
    });

    return total;
  };

  const sumMatrix = (matrix) => {
    let total = 0;

    matrix.forEach((row) => {
      total += sumRow(row);
    });

    return total;
  };

  useEffect(() => {
    generateMatrix(INITIAL_N);
  }, []);

  return (
    <div className="App">
      <table>
        <tbody>
          {matrix?.map((row, rowIndex) => (
            <tr>
              {row.map((cell, cellIndex) => (
                <td style={{ width: "40px" }}>
                  <input
                    style={{ width: "40px" }}
                    value={cell}
                    type="number"
                    max={999}
                    onChange={(e) => {
                      let updatedMatrix = [...matrix];

                      let value = parseInt(e.target.value);
                    
                      if (value > 999 || value < 0) {
                        return;
                      }

                      updatedMatrix[rowIndex][cellIndex] = parseInt(value);

                      setMatrix(updatedMatrix);
                    }}
                  ></input>
                </td>
              ))}
              <td>{sumRow(row)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>{matrix && sumMatrix(matrix)}</div>
      <button onClick={decreaseMatrix}>-</button>
      <button onClick={increaseMatrix}>+</button>
    </div>
  );
}
