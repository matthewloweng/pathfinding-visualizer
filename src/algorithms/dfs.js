// Performs Depth-First Search (DFS) and returns all nodes in the order
// they were visited. This version does not guarantee the shortest path.
export function dfs(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    const stack = [startNode];
  
    while (stack.length) {
      const currentNode = stack.pop();
      if (!currentNode.isVisited) {
        currentNode.isVisited = true;
        visitedNodesInOrder.push(currentNode);
  
        if (currentNode === finishNode) {
          return visitedNodesInOrder;
        }
  
        const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
        for (const neighbor of unvisitedNeighbors) {
          if (!neighbor.isVisited) {
            neighbor.previousNode = currentNode;
            stack.push(neighbor);
          }
        }
      }
    }
  
    return visitedNodesInOrder;
  }
  
  function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
  }
  