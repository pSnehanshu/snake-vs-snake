import { useState, useEffect } from "react";
import { times, find } from "lodash-es";
import styled from 'styled-components';
import { createSnake, move, Directions } from "./lib/snake/engine";

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

function PlayGrid({ height = 50, width = 50, snake, food }) {
  const getPaint = (x, y) => {
    const cell = { x, y };

    if (isCellSame(food)(cell)) {
      return 'orange';
    }

    if (find(snake.cells, isCellSame(cell))) {
      return 'black';
    }

    return 'transparent';
  };

  return (
    <TableGrid>
      <tbody>
        {times(height, (i) => (
          <TableRow key={i}>
            {times(width, (j) => <TableCell key={j} paint={getPaint(i, j)} />)}
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
  const [snake1, setSnake1] = useState(createSnake(2, 2));
  const [food] = useState({ x: 20, y: 9 });

  useEffect(() => {
    const timer = setInterval(
      () => setSnake1(snake => move(snake, bounds)),
      250
    );
    return () => clearInterval(timer);
  }, []);

  const recordDirection = (e) => {
    let direction;

    if (e.code === 'ArrowUp' || e.code === 'KeyW') {
      if (snake1.direction !== Directions.SOUTH) {
        direction = Directions.NORTH;
      }
    } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
      if (snake1.direction !== Directions.NORTH) {
        direction = Directions.SOUTH;
      }
    } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
      if (snake1.direction !== Directions.WEST) {
        direction = Directions.EAST;
      }
    } else if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
      if (snake1.direction !== Directions.EAST) {
        direction = Directions.WEST;
      }
    }

    if (direction) {
      setSnake1(snake => ({
        ...snake,
        direction,
      }));
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', recordDirection);
    return () => window.removeEventListener('keyup', recordDirection);
  });

  return (
    <Center>
      <PlayGrid height={bounds.height} width={bounds.width} snake={snake1} food={food} />
      {/* <pre>{JSON.stringify(snake1, null, 2)}</pre> */}
    </Center>
  );
}

export default App;
