import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrders } from "../services/baserow";


export default function Dashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getOrders();
      setOrders(data);
    }
    load();
  }, []);

  // Normaliza data sem bug de timezone
  const normalizeDate = (dateStr) => {
    if (!dateStr) return null;
    return new Date(dateStr + "T00:00:00");
  };

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const hojeStr = hoje.toISOString().split("T")[0];

  // Em produção
  const emProducao = orders.filter(
    (o) => o.status !== "Recebido" && o.status !== "Concluído"
  ).length;

  //  Atrasados (data menor que hoje)
  const atrasados = orders.filter((o) => {
    if (!o.entrega) return false;
    return normalizeDate(o.entrega) < hoje;
  }).length;

  // Em dia (até 3 dias)
  const emDia = orders.filter((o) => {
    if (!o.entrega) return false;

    const diff =
      (normalizeDate(o.entrega) - hoje) / (1000 * 60 * 60 * 24);

    return diff >= 0 && diff <= 3;
  }).length;

  // Entrega hoje
  const entregaHoje = orders.filter((o) => {
    if (!o.entrega) return false;
    return o.entrega === hojeStr;
  }).length;

  // Próximas entregas (SEM passado + ordenado correto)
  const proximasEntregas = [...orders]
    .filter((o) => o.entrega)
    .map((o) => ({
      ...o,
      entregaDate: normalizeDate(o.entrega),
    }))
    .filter((o) => o.entregaDate >= hoje)
    .sort((a, b) => a.entregaDate - b.entregaDate)
    .slice(0, 5);

  // Formatação inteligente de data
  const formatEntrega = (dateStr) => {
    if (!dateStr) return "-";

    const data = normalizeDate(dateStr);
    const diffDays = Math.round(
      (data - hoje) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return "Hoje";
    if (diffDays === 1) return "Amanhã";

    if (diffDays > 1 && diffDays <= 7) {
      return data.toLocaleDateString("pt-BR", {
        weekday: "long",
      });
    }

    return data.toLocaleDateString("pt-BR");
  };

  // Card
  const Card = ({ title, value, color, onClick }) => (
    <div

    onClick={onClick}
      style={{
        minWidth: "25vw",
        flex: 1,
        padding: 20,
        borderRadius: 12,
        background: color,
        color: "white",
        textAlign: "center",
      }}
    >
      <h3>{title}</h3>
      <h1>{value}</h1>
    </div>
  );

  return (
    
    <div style={{ padding: 20 }}>
      <h1 style={{textShadow: "1px 1px 3px #000", margin: "10px 0 25px 0"}}><span style={{color: "red"}}>S</span>Design - Work Space</h1>
     
      <h2>Informações rápidas</h2>

      {/* DASHBOARD */}
      <div
        style={{
          display: "flex",
          gap: 15,
          flexWrap: "wrap",
        }}
      >
        <Card
          title="Em Produção"
          value={emProducao}
          color="#3498db"
        />
        <Card
          title="Atrasados"
          value={atrasados}
          color="#e74c3c"
          onClick={() => navigate("/atrasados")}
        />
        <Card title="Em Dia" value={emDia} color="#2ecc71" />
        <Card
          title="Entrega Hoje"
          value={entregaHoje}
          color="#f1c40f"
        />
      </div>

      {/* PRÓXIMAS ENTREGAS */}
      <div style={{ marginTop: 30 }}>
        <h2>📦 Próximas Entregas</h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {proximasEntregas.map((o) => (
            <div
              onClick={() => navigate(`/task/${o.id}`)}
              key={o.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 15,
                boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.14)",
                borderRadius: 10,
                background: "#75718a28",
              }}
            >
              {/* Carro */}
              <div>
                <strong style={{color: "whitesmoke"}}>{o.carro}</strong>
                <div style={{ fontSize: 14, color: "#999898" }}>
                  {o.placa}
                </div>
              </div>

              {/* Status */}
              <div style={{ fontWeight: "bold",}}>
                {o.status}
              </div>

              {/* Data formatada */}
              <div style={{ textAlign: "right", color: "whitesmoke", textTransform: "uppercase", }}>
                {formatEntrega(o.entrega)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="CantainerBotoesHome">
          <div className="BotaoHome BotaoHome1" onClick={() => navigate(`/nova`)}><p>+ Novo carro</p></div>
          <div className="BotaoHome" onClick={() => navigate(`/todos/`)}><p>Ver todos os carros</p></div>
      </div>
    </div>
  );
}