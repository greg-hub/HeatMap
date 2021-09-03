import React from 'react';
import './App.css';
import HeatMap from './components/heat-map';
const sourceData = require('./data/onto-transactions.json'); 

const App = () => { 
  return (
    <div className="App">
      <HeatMap data={sourceData}/>
    </div>
  );
}

export default App;