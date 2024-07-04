import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';


const sampleProjects = [
  { id: 1, name: '24015-237 WHC Delaware Ranch, TX-46MW', status: 'Active', client: '03-07-2024' },
  { id: 2, name: '24015-254 WHC - Green Mallard', status: 'Active', client: '02-07-2024' },
  { id: 3, name: '24015.145_WHC-Hillsboro-1', status: 'Active', client: '05-07-2024' },
  { id: 4, name: 'McCarthy Demo', status: 'Active', client: '04-07-2024' },
  { id: 5, name: '24015.260 pcl-case', status: 'Active', client: '01-07-2024' },
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [pMultiplierData, setPMultiplierData] = useState({
    start: '',
    end: '',
    soilLayers: [],
  });

  const filteredProjects = sampleProjects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSoilLayer = () => {
    if (pMultiplierData.soilLayers.length < 16) {
      setPMultiplierData(prev => ({
        ...prev,
        soilLayers: [...prev.soilLayers, { depth: '', value: '' }],
      }));
    }
  };

  const handleSoilLayerChange = (index, field, value) => {
    const updatedLayers = [...pMultiplierData.soilLayers];
    updatedLayers[index][field] = value;
    setPMultiplierData(prev => ({ ...prev, soilLayers: updatedLayers }));
  };

  const handleSubmit = () => {
    const jsonData = JSON.stringify(pMultiplierData);
    console.log('Data to be sent to backend:', jsonData);
    // Here you would typically send this data to your Python backend
  };

  return (
    <div className="App">
      <header>
        <h1>Project Dashboard</h1>
        <nav>
          <button onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'active' : ''}>Dashboard</button>
          <button onClick={() => setActiveTab('pMultiplier')} className={activeTab === 'pMultiplier' ? 'active' : ''}>P Multiplier</button>
        </nav>
      </header>

      {activeTab === 'dashboard' && (
        <div className="dashboard">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <table>
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Created Date</th>
                <th>Status</th>
                <th></th>
                
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map(project => (
                <tr key={project.id}>
                  <td>{project.name}</td>
                  
                  <td>{project.client}</td>
                  <td>{project.status}</td>
                  <td><button className="submit-btn">Run</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'pMultiplier' && (
        <div className="pMultiplier">
          <h2>P Multiplier</h2>
          <div className="input-group">
            <label>P Multiplier Start:</label>
            <input
              type="number"
              step="0.01"
              value={pMultiplierData.start}
              onChange={(e) => setPMultiplierData(prev => ({ ...prev, start: e.target.value }))}
            />
          </div>
          <div className="input-group">
            <label>P Multiplier End:</label>
            <input
              type="number"
              step="0.01"
              value={pMultiplierData.end}
              onChange={(e) => setPMultiplierData(prev => ({ ...prev, end: e.target.value }))}
            />
          </div>
          <h3>Soil Layers</h3>
          {pMultiplierData.soilLayers.map((layer, index) => (
            <div key={index} className="soil-layer">
              <input
                type="number"
                step="0.01"
                placeholder="Depth"
                value={layer.depth}
                onChange={(e) => handleSoilLayerChange(index, 'depth', e.target.value)}
              />
              <input
                type="number"
                step="0.01"
                placeholder="Value"
                value={layer.value}
                onChange={(e) => handleSoilLayerChange(index, 'value', e.target.value)}
              />
            </div>
          ))}
          <button onClick={handleAddSoilLayer} disabled={pMultiplierData.soilLayers.length >= 16}>
            + Add Soil Layer
          </button>
          <button onClick={handleSubmit} className="submit-btn">Submit</button>
        </div>
      )}
    </div>
  );
}

export default App;
