import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import HelloWorld from "./components/HelloWorld.js"

const App = () => {
    return (
    <Routes>
        <Route path="/" element={<HelloWorld />} />
      </Routes>
  );
};

export default App;