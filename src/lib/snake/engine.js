const Directions = {
  NORTH: 1,
  EAST: 2,
  WEST: 3,
  SOUTH: 4,
};

const createCell = (x = 0, y = 0) => ({ x, y });

const createSnake = (x = 2, y = 2, color = 'black') => ({
  cells: [createCell(x, y + 5), createCell(x, y + 4), createCell(x, y + 3), createCell(x, y + 2), createCell(x, y + 1), createCell(x, y)], // first cell is the head
  direction: Directions.EAST,
  color,
});

const createFood = (x, y) => ({ x, y })
const createBound = (x, y) => ({ x, y })

const createGame = () => ({
  snakes: [createSnake(), createSnake(3, 5, 'green')],
  food: createFood(20, 39),
  bounds: createBound(50, 50),
});

const wrap = (point, bound) => {
  const newPoint = point % bound;
  return newPoint < 0 ? bound + newPoint : newPoint;
}

const move = (snake, bounds) => {
  const newHead = (() => {
    const head = snake.cells[0];
    switch (snake.direction) {
      case Directions.WEST: return createCell(head.x, wrap(head.y - 1, bounds.width));
      case Directions.NORTH: return createCell(wrap(head.x - 1, bounds.height), head.y);
      case Directions.SOUTH: return createCell(wrap(head.x + 1, bounds.height), head.y);
      case Directions.EAST:
      default: return createCell(head.x, wrap(head.y + 1, bounds.width));
    }
  })();

  return {
    ...snake,
    cells: [newHead, ...(snake.cells).slice(0, snake.cells.length - 1)]
  };
};

export {
  createCell,
  createSnake,
  createGame,
  move,
  Directions,
};
