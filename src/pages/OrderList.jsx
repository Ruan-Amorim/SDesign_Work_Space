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


  // FILTRO CENTRALIZADO
  const normalizeDate = (dateStr) => {
  if (!dateStr) return null;
  return new Date(dateStr + "T00:00:00");
};

const hojeDate = new Date();
hojeDate.setHours(0, 0, 0, 0);

const hojeStr = hojeDate.toLocaleDateString("en-CA");

const applyFilter = (list) => {
  switch (filter) {
    case "atrasados":
      return list.filter(o => {
        if (!o.entrega) return false;
        return normalizeDate(o.entrega) < hojeDate;
      });

    case "hoje":
      return list.filter(o => o.entrega === hojeStr);

    case "em_producao":
      return list.filter(o =>
        o.status !== "Recebido" &&
        o.status !== "Concluído"
      );

    case "risco_atraso":
    return list.filter(o => {
      if (!o.entrega) return false;
      if (o.status === "Concluído") return false;

      const diff = Math.floor(
        (normalizeDate(o.entrega) - hojeDate) /
        (1000 * 60 * 60 * 24)
      );

      return diff >= 1 && diff <= 2;
    });

    case "todos":
      return list;

    case "ordenado_entrega":
      return [...list]
        .filter(o => o.entrega)
        .sort(
          (a, b) =>
            normalizeDate(a.entrega) - normalizeDate(b.entrega)
        );

    default:
      return list;
  }
};

  const filtered = applyFilter(orders);

  const formatEntrega = (dateStr) => {
    if (!dateStr) return "-";

    const data = normalizeDate(dateStr);

    const diff = Math.floor(
      (data - hojeDate) / (1000 * 60 * 60 * 24)
    );

    if (diff === 0) return "Hoje";
    if (diff === 1) return "Amanhã";
    if (diff === -1) return "Ontem";

    if (diff > 1 && diff <= 7) {
      return data.toLocaleDateString("pt-BR", {
        weekday: "long",
      });
    }

    return data.toLocaleDateString("pt-BR");
  };
  const getCorEntrega = (dateStr) => {
    if (!dateStr) return "#333";

    const data = normalizeDate(dateStr);

    const diff = Math.floor(
      (data - hojeDate) / (1000 * 60 * 60 * 24)
    );

    if (diff === 0) return "#2ecc71"; // verde (hoje)
    if (diff === 1) return "#f1c40f"; // amarelo (amanhã)
    if (diff < 0) return "#e74c3c";   // vermelho (atrasado)

    return "#5c5c5c"; // padrão
  };
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
            boxShadow: "1px 1px 5px #00000038",
            cursor: "pointer"
          }}
        >
          <strong style={{color: "black"}}>{o.carro || "Sem nome"}</strong>

          <div style={{ fontSize: 13.5, color: "#3b3b3b" }}>
            {o.placa}
          </div>

          <div style={{ fontSize: 13.5, color: "#4e4e4e" }}>
            {o.status}
          </div>

          <div style={{
            fontSize: 13,
            fontWeight: "bold",
            color: getCorEntrega(o.entrega),
            textTransform: "uppercase"
          }}>
            {formatEntrega(o.entrega)}
          </div>
        </div>
      ))}
    </div>
  );
}