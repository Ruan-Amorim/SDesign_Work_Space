import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder, STATUS_OPTIONS } from "../services/baserow";

const Input = ({ label, value, onChange, error }) => (
  <div style={{ marginBottom: 15 }}>
    <label>{label}</label>
    <input
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "95%",
        padding: 10,
        borderRadius: 8,
        border: error ? "1px solid red" : "1px solid #ccc",
        background: "whitesmoke",
        color: "#000"
      }}
    />
    {error && (
      <div style={{ color: "red", fontSize: 12 }}>{error}</div>
    )}
  </div>
);

const Select = ({ label, value, onChange, options, error }) => (
  <div style={{ marginBottom: 15 }}>
    <label>{label}</label>
    <select
      value={value || ""}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{
        width: "100%",
        padding: 10,
        borderRadius: 8,
        border: error ? "1px solid red" : "1px solid #ccc",
        background: "whitesmoke",
        color: "#000"
      }}
    >
      <option value="">Selecione</option>
      {options.map(opt => (
        <option key={opt.id} value={opt.id}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && (
      <div style={{ color: "red", fontSize: 12 }}>{error}</div>
    )}
  </div>
);

export default function CreateTask() {
  const navigate = useNavigate();

  const [task, setTask] = useState({
    carro: "",
    placa: "",
    cliente: "",
    pecas_quebradas: "",
    etapas_servico: "",
    status_id: "",
    texto_servico: "", // ✔ já existia, agora será usado
    entrega: "",
    entrada: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setTask(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!task.carro) newErrors.carro = "Informe o carro";
    if (!task.placa) newErrors.placa = "Informe a placa";
    if (!task.status_id) newErrors.status_id = "Selecione o status";
    if (!task.entrega) newErrors.entrega = "Informe a data de entrega";

    if (task.entrada && task.entrega) {
      if (task.entrega < task.entrada) {
        newErrors.entrega = "Entrega não pode ser antes da entrada";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    await createOrder(task);
    navigate("/");
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h1 style={{fontSize: "1.8em"}}>Nova Ordem de Serviço</h1>

      <Input
        label="Carro"
        value={task.carro}
        onChange={(v) => handleChange("carro", v)}
        error={errors.carro}
      />

      <Input
        label="Placa"
        value={task.placa}
        onChange={(v) => handleChange("placa", v)}
        error={errors.placa}
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
        onChange={(v) => handleChange("status_id", v)}
        error={errors.status_id}
      />

      <Input
        label="Peças quebradas"
        value={task.pecas_quebradas}
        onChange={(v) => handleChange("pecas_quebradas", v)}
      />

      <Input
        label="Etapas"
        value={task.etapas_servico}
        onChange={(v) => handleChange("etapas_servico", v)}
      />

      {/*  NOVO CAMPO */}
      <div style={{ marginBottom: 15 }}>
        <label>Descrição do serviço</label>
        <textarea
          value={task.texto_servico || ""}
          onChange={(e) => handleChange("texto_servico", e.target.value)}
          style={{
            width: "95%",
            minHeight: 200,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
            background: "whitesmoke",
            color: "#000"
          }}
        />
      </div>

      <Input
        label="Entrada (YYYY-MM-DD)"
        value={task.entrada}
        onChange={(v) => handleChange("entrada", v)}
      />

      <Input
        label="Entrega (YYYY-MM-DD)"
        value={task.entrega}
        onChange={(v) => handleChange("entrega", v)}
        error={errors.entrega}
      />

      <button
        onClick={handleSubmit}
        style={{
          width: "95%",
          padding: 15,
          background: "#2ecc71",
          color: "#fff",
          border: "none",
          borderRadius: 10,
          marginTop: 10,
          fontWeight: "bold"
        }}
      >
        Criar Ordem
      </button>
    </div>
  );
}