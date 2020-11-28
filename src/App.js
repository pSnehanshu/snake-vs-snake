import { useState, useEffect } from "react";
import { times, find, cloneDeep } from "lodash-es";
import styled from 'styled-components';
import { createGame, move, Directions } from "./lib/snake/engine";

const isCellSame = (c1) => (c2) => c1.x === c2.x && c1.y === c2.y;

const TableGrid = styled.table`
  border-collapse: collapse;
`;
const TableRow = styled.tr``;
const TableCell = styled.td`
  height: 10px;
  width: 10px;
  border: 1px solid #ccc;
  background-color: ${(props) => props.paint}
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

function PlayGrid({ game: { bounds, snakes, food } }) {
  const getPaint = (x, y) => {
    const cell = { x, y };

    if (isCellSame(food)(cell)) {
      return 'orange';
    }

    /* if (find(snakes[0].cells, isCellSame(cell))) {
      return 'black';
    } */

    let snake = find(snakes, (snake) => find(snake.cells, isCellSame(cell)))
    if (snake) {
      return snake.color;
    }

    return 'transparent';
  };

  return (
    <TableGrid>
      <tbody>
        {times(bounds.y, (i) => (
          <TableRow key={i}>
            {times(bounds.x, (j) => <TableCell key={j} paint={getPaint(i, j)} />)}
          </TableRow>
        ))}
      </tbody>
    </TableGrid>
  );
}

const bounds = {
  width: 50,
  height: 50,
};

function App() {
  const [game, setGame] = useState(createGame());
  const mySnakeId = 1;

  useEffect(() => {
    const timer = setInterval(
      () => setGame(g => {
        return {
          ...g,
          snakes: g.snakes.map(snake => move(snake, bounds)),
        };
      }),
      250
    );
    return () => clearInterval(timer);
  }, []);

  const recordDirection = (e) => {
    let direction;
    const mySnake = game.snakes[mySnakeId];

    if (e.code === 'ArrowUp' || e.code === 'KeyW') {
      if (mySnake.direction !== Directions.SOUTH) {
        direction = Directions.NORTH;
      }
    } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
      if (mySnake.direction !== Directions.NORTH) {
        direction = Directions.SOUTH;
      }
    } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
      if (mySnake.direction !== Directions.WEST) {
        direction = Directions.EAST;
      }
    } else if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
      if (mySnake.direction !== Directions.EAST) {
        direction = Directions.WEST;
      }
    }

    if (direction) {
      setGame(g => {
        let snakes = cloneDeep(g.snakes);
        snakes[mySnakeId].direction = direction;

        return {
          ...g,
          snakes,
        };
      });
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', recordDirection);
    return () => window.removeEventListener('keyup', recordDirection);
  });

  return (
    <Center>
      <PlayGrid game={game} />
      {/* <pre>{JSON.stringify(snake1, null, 2)}</pre> */}
    </Center>
  );
}

export default App;
