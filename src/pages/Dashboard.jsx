import { useEffect, useState } from "react";
import { getOrders } from "../services/baserow";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getOrders();
      setOrders(data);
    }

    load();
  }, []);

  const emProducao = orders.filter(o => o.status == "Recebido").length;
  const atrasados = orders.filter(o => o.status === "atrasado").length;
  const emDia = orders.filter(o => o.status === "em_dia").length;

  const hoje = new Date().toISOString().split("T")[0];
  const entregaHoje = orders.filter(o => o.data_entrega === hoje).length;

  const Card = ({ title, value, color }) => (
    <div style={{
      flex: 1,
      padding: 20,
      borderRadius: 12,
      background: color,
      color: "white",
      textAlign: "center",
    }}>
      <h3>{title}</h3>
      <h1>{value}</h1>
    </div>
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>SDesign - Oficina</h1>

      <div style={{ display: "flex", gap: 15, flexWrap: "wrap" }}>
        <Card title="Em Produção" value={emProducao} color="#3498db" />
        <Card title="Atrasados" value={atrasados} color="#e74c3c" />
        <Card title="Em Dia" value={emDia} color="#2ecc71" />
        <Card title="Entrega Hoje" value={entregaHoje} color="#f1c40f" />
      </div>
    </div>
  );
}