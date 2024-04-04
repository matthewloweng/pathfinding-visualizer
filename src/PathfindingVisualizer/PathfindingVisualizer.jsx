import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';

import { bfs } from '../algorithms/bfs';
import { dfs } from '../algorithms/dfs';


import './PathfindingVisualizer.css';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }


  animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder, animationSpeed) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder, animationSpeed);
        }, animationSpeed * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const nodeClassName = `node-${node.row}-${node.col}`;
        document.getElementById(nodeClassName).className =
          'node node-visited';
      }, animationSpeed * i);
    }
  }
  
  animateShortestPath(nodesInShortestPathOrder, animationSpeed) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const nodeClassName = `node-${node.row}-${node.col}`;
        document.getElementById(nodeClassName).className =
          'node node-shortest-path';
      }, animationSpeed * i * 2); // You may want to further slow down the shortest path animation
    }
  }


  // animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
  //   for (let i = 0; i <= visitedNodesInOrder.length; i++) {
  //     if (i === visitedNodesInOrder.length) {
  //       setTimeout(() => {
  //         this.animateShortestPath(nodesInShortestPathOrder);
  //       }, 10 * i);
  //       return;
  //     }
  //     setTimeout(() => {
  //       const node = visitedNodesInOrder[i];
  //       const nodeClassName = `node-${node.row}-${node.col}`;
  //       document.getElementById(nodeClassName).className =
  //         'node node-visited';
  //     }, 10 * i);
  //   }
  // }

  // animateShortestPath(nodesInShortestPathOrder) {
  //   for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
  //     setTimeout(() => {
  //       const node = nodesInShortestPathOrder[i];
  //       const nodeClassName = `node-${node.row}-${node.col}`;
  //       document.getElementById(nodeClassName).className =
  //         'node node-shortest-path';
  //     }, 50 * i);
  //   }
  // }

  visualizeDijkstra() {
    const animationSpeed = 20;
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    // this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder, animationSpeed);
  }

  visualizeBfs() {
    const animationSpeed = 10;
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = bfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    // this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder, animationSpeed);
  }

  visualizeDfs() {
    const animationSpeed = 10;
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder, animationSpeed);
  }
  
  

  resetGrid() {
    // Get a fresh grid with the original start and finish nodes
    const newGrid = getInitialGrid();
    
    this.setState({ grid: newGrid }, () => {
      // Reset the visual state of all nodes
      for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 50; col++) {
          const nodeClassName = `node-${row}-${col}`;
          let nodeClass = 'node';
          
          // Preserve the start and finish node classes
          if (row === START_NODE_ROW && col === START_NODE_COL) {
            nodeClass += ' node-start';
          } else if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
            nodeClass += ' node-finish';
          }
  
          document.getElementById(nodeClassName).className = nodeClass;
        }
      }
    });
  }
  
  

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <>
        <button onClick={() => this.visualizeDijkstra()}>
          Visualize Dijkstra's Algorithm
        </button>
        <button onClick={() => this.visualizeBfs()}>
          Visualize BFS
        </button>
        <button onClick={() => this.visualizeDfs()}>
          Visualize DFS
        </button>

        <button onClick={() => this.resetGrid()}>
          Reset Grid
        </button>
        <div className="grid">
          {grid.map((row, rowIdx) =>
            row.map((node, nodeIdx) => {
              const { row, col, isFinish, isStart, isWall } = node;
              return (
                <Node
                  key={nodeIdx}
                  col={col}
                  isFinish={isFinish}
                  isStart={isStart}
                  isWall={isWall}
                  mouseIsPressed={mouseIsPressed}
                  onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                  onMouseEnter={(row, col) =>
                    this.handleMouseEnter(row, col)
                  }
                  onMouseUp={() => this.handleMouseUp()}
                  row={row}
                />
              );
            })
          )}
        </div>
      </>
    );
  }
};

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};


