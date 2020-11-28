const Directions = {
  NORTH: 1,
  EAST: 2,
  WEST: 3,
  SOUTH: 4,
};

const createCell = (x = 0, y = 0) => ({ x, y });

const createSnake = (x, y) => ({
  cells: [createCell(x, y)], // first cell is the head
  direction: Directions.EAST,
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
  move,
  Directions,
};
