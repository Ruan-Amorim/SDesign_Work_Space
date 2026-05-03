import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Task from "./pages/Task";
import CreateTask from "./pages/CreateTask";
import AllOrders from './pages/AllOrders';
import Atrasados from './pages/Atrasados';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/task/:id" element={<Task />} />
        <Route path="/nova" element={<CreateTask />} />
        <Route path="/todos" element={<AllOrders />} />
        <Route path="/atrasados" element={<Atrasados />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
