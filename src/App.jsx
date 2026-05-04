import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Task from "./pages/Task";
import CreateTask from "./pages/CreateTask";
import AllOrders from './pages/AllOrders';
import Atrasados from './pages/Atrasados';
import EmProducao from './pages/EmProducao';
import EntregaHoje from './pages/EntregaHoje';
import OrdenadoEntrega from './pages/OrdenadoEntrega';
import RiscoAtraso from './pages/RiscoAtraso';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/task/:id" element={<Task />} />
        <Route path="/nova" element={<CreateTask />} />
        <Route path="/todos" element={<AllOrders />} />
        <Route path="/atrasados" element={<Atrasados />} />
        <Route path="/em_producao" element={<EmProducao />} />
        <Route path="/entrega_hoje" element={<EntregaHoje />} />
        <Route path="/ordenado_entrega" element={<OrdenadoEntrega />} />
        <Route path="/risco_atraso" element={<RiscoAtraso />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
