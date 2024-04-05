import React, { Component } from 'react';
import './App.css';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';

class App extends Component {
  constructor(props) {
    super(props);
    this.pathfindingVisualizerRef = React.createRef(); // Create a ref for PathfindingVisualizer

  }

  // trigger Dijkstra's visualization
  visualizeDijkstra = () => {
    if (this.pathfindingVisualizerRef.current) {
      this.pathfindingVisualizerRef.current.visualizeDijkstra();
    }
  };

  visualizeBfs = () => {
    if (this.pathfindingVisualizerRef.current) {
      this.pathfindingVisualizerRef.current.visualizeBfs();
    }
  };

  visualizeDfs = () => {
    if (this.pathfindingVisualizerRef.current) {
      this.pathfindingVisualizerRef.current.visualizeDfs();
    }
  };

  resetGrid = () => {
    if (this.pathfindingVisualizerRef.current) {
      this.pathfindingVisualizerRef.current.resetGrid();
    }
  };



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="header">Pathfinding Visualizer</h1>
          <button onClick={this.visualizeDijkstra}>Visualize Dijkstra's Algorithm</button>
          <button onClick={this.visualizeBfs}>Visualize BFS</button>
          <button onClick={this.visualizeDfs}>Visualize DFS</button>
          <button onClick={this.resetGrid}>Reset Grid</button>
          {/* Add other buttons with their respective methods */}
          
        </header>
        <PathfindingVisualizer ref={this.pathfindingVisualizerRef} />
      </div>
    );
  }
}

export default App;
