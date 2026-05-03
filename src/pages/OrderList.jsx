import { useEffect, useState } from "react";
import { getOrders } from "../services/baserow";
import { useNavigate } from "react-router-dom";

export default function OrderList({ filter }) {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const data = await getOrders();
      setOrders(data);
    }
    load();
  }, []);

  const hoje = new Date().toISOString().split("T")[0];

  // FILTRO CENTRALIZADO
  const applyFilter = (list) => {
    switch (filter) {
      case "atrasados":
        return list.filter(o => o.entrega && o.entrega < hoje);

      case "hoje":
        return list.filter(o => o.entrega === hoje);

      case "em_producao":
        return list.filter(o =>
          o.status !== "Recebido" &&
          o.status !== "Concluído"
        );

      case "todos":
        return list;

      case "ordenado_entrega":
        return [...list].sort(
          (a, b) => new Date(a.entrega) - new Date(b.entrega)
        );

      default:
        return list;
    }
  };

  const filtered = applyFilter(orders);

  return (
    <div style={{ padding: 20 }}>
      {filtered.map((o) => (
        <div
          key={o.id}
          onClick={() => navigate(`/task/${o.id}`)}
          style={{
            padding: 15,
            marginBottom: 10,
            borderRadius: 10,
            background: "#fff",
            border: "1px solid #ddd",
            cursor: "pointer"
          }}
        >
          <strong>{o.carro || "Sem nome"}</strong>

          <div style={{ fontSize: 12, color: "#666" }}>
            {o.placa}
          </div>

          <div style={{ fontSize: 12 }}>
            {o.status}
          </div>

          <div style={{ fontSize: 12 }}>
            {o.entrega}
          </div>
        </div>
      ))}
    </div>
  );
}