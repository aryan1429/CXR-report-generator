import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import Overview from './pages/Overview';

// Placeholder Pages
const Upload = () => <div className="text-white">Upload Page Component</div>;
const Evidence = () => <div className="text-white">Evidence Page Component</div>;
const Disagreement = () => <div className="text-white">Disagreement Page Component</div>;
const Reports = () => <div className="text-white">Reports Page Component</div>;
const About = () => <div className="text-white">About Page Component</div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="upload" element={<Upload />} />
          <Route path="evidence" element={<Evidence />} />
          <Route path="disagreement" element={<Disagreement />} />
          <Route path="reports" element={<Reports />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
