import React from 'react';
import './App.css';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="header">Pathfinding Visualizer</h1>
        <button>Visualize Dijkstra's Algorithm</button>
        <button>Visualize BFS</button>
        <button>Visualize DFS</button>
        <button>Reset Grid</button>
      </header>
      <PathfindingVisualizer></PathfindingVisualizer>
    </div>
  );
}

export default App;
