// Performs Breadth-First Search and returns all nodes in the order
// they were visited. Also makes nodes point back to their previous node,
// allowing us to compute the shortest path by backtracking from the finish node.
export function bfs(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    let queue = [startNode];
    startNode.isVisited = true;
  
    while (queue.length) {
      const currentNode = queue.shift();
      visitedNodesInOrder.push(currentNode);
  
      if (currentNode === finishNode) {
        return visitedNodesInOrder;
      }
  
      const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
      for (const neighbor of unvisitedNeighbors) {
        neighbor.isVisited = true;
        neighbor.previousNode = currentNode;
        queue.push(neighbor);
      }
    }
  
    return visitedNodesInOrder;
  }
  
  // A helper function to get unvisited neighbors
  function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
  }
  