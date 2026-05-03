import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrders, STATUS_OPTIONS, updateOrder } from "../services/baserow";

// INPUT (fora do componente)
const Input = ({ label, value, onChange }) => (
  <div style={{ marginBottom: 15 }}>
    <label style={{ fontSize: 17, color: "#444343" }}>{label}</label>
    <input
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "95%",
        padding: 10,
        borderRadius: 8,
        border: "1px solid #ccc",
        margin: "auto",
        textAlign: "center",
      }}
    />
  </div>
);

// SELECT (fora do componente)
const Select = ({ label, value, onChange, options }) => (
  <div style={{ marginBottom: 15 }}>
    <label style={{ fontSize: 17, color: "#444343" }}>{label}</label>

    <select
      value={value || ""}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{
        width: "100%",
        padding: 12,
        borderRadius: 8,        
        border: "1px solid #ccc", 
        background: "#444343",
        textAlign: "center",
        fontSize: 14
      }}
    >
      <option value="">Selecione</option>

      {options.map(opt => (
        <option key={opt.id} value={opt.id}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default function Task() {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await getOrders();
      const found = data.find(o => o.id == id);

      if (!found) return;

      // GARANTE status_id sempre presente
      const statusObj = STATUS_OPTIONS.find(
        s => s.label === found.status
      );

      setTask({
        ...found,
        status_id: found.status_id || statusObj?.id || ""
      });
    }

    load();
  }, [id]);

  if (!task) return <p>Carregando...</p>;

  const handleChange = (field, value) => {
    setTask(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // SINCRONIZA ID + TEXTO
  const handleStatusChange = (id) => {
    const selected = STATUS_OPTIONS.find(s => s.id === id);

    setTask(prev => ({
      ...prev,
      status_id: id,
      status: selected?.label || ""
    }));
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      
      {/* HEADER */}
      <h2 style={{
        marginBottom: 20,
        fontSize: "1.6em",
        textTransform: "uppercase",
      }}>
        {task.carro || "Sem nome"}
      </h2>

      {/* INFO */}
      <div style={{
        background: "#fff",
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
        border: "1px solid #eee"
      }}>
        <h3>INFORMAÇÕES</h3>

        <Input
          label="Carro"
          value={task.carro}
          onChange={(v) => handleChange("carro", v)}
        />

        <Input
          label="Placa"
          value={task.placa}
          onChange={(v) => handleChange("placa", v)}
        />

        <Input
          label="Cliente"
          value={task.cliente}
          onChange={(v) => handleChange("cliente", v)}
        />

        <Select
          label="Status"
          value={task.status_id}
          options={STATUS_OPTIONS}
          onChange={handleStatusChange}
        />
      </div>

      {/* SERVIÇO */}
      <div style={{
        background: "#fff",
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
        border: "1px solid #eee"
      }}>
        <h3>SERVIÇO</h3>

        <Input
          label="Peças quebradas"
          value={task.pecas_quebradas}
          onChange={(v) => handleChange("pecas_quebradas", v)}
        />

        <Input
          label="Etapas do serviço"
          value={task.etapas_servico}
          onChange={(v) => handleChange("etapas_servico", v)}
        />

        <div style={{ marginBottom: 15 }}>
          <label style={{ fontSize: 12, color: "#666" }}>
            Descrição do serviço
          </label>
          <textarea
            value={task.texto_servico || ""}
            onChange={(e) =>
              handleChange("texto_servico", e.target.value)
            }
            style={{
              width: "95%",
              minHeight: 200,
              padding: 10,
              borderRadius: 8,
              border: "1px solid #ccc",
              margin: "auto",
              display: "block"
            }}
          />
        </div>
      </div>

      {/* DATAS */}
      <div style={{
        background: "#fff",
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
        border: "1px solid #eee"
      }}>
        <h3>DATAS</h3>

        <Input
          label="Data de entrada"
          value={task.entrada}
          onChange={(v) => handleChange("entrada", v)}
        />

        <Input
          label="Data de entrega"
          value={task.entrega}
          onChange={(v) => handleChange("entrega", v)}
        />
      </div>

      {/* BOTÃO */}
      <button
        onClick={() => updateOrder(task)}
        style={{
          width: "100%",
          padding: 15,
          background: "#3498db",
          color: "white",
          border: "none",
          borderRadius: 10,
          fontSize: 16,
          cursor: "pointer"
        }}
      >
        💾 Salvar Alterações
      </button>
    </div>
  );
}