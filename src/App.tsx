import React from 'react';
import './style/App.css';
import Home from './home';
import 'antd/dist/antd.css';
import './style/global.scss';
import DetailItem from './detail';
import { HashRouter, Route, Routes } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<DetailItem />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
