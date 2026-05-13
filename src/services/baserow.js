import axios from "axios";

const API_TOKEN = "dawZ2bQ1wSy5WGKEQe1BCUYTYn6IYFty";
const TABLE_URL = "https://api.baserow.io/api/database/rows/table/956440/";

export function mapOrders(data) {
  return data
    .filter(item =>
      item.field_8339519 && // remove vazios
      item.field_8339553?.value !== "Concluído" // 👈 REMOVE CONCLUÍDOS
    )
    .map(item => ({
      id: item.id,
      carro: item.field_8339519,
      cliente: item.field_8339537,
      placa: item.field_8339522,
      pecas_quebradas: item.field_8339538,
      etapas_servico: item.field_8339540,
      status: item.field_8339553?.value,
      status_id: item.field_8339553?.id, // 👈 IMPORTANTE (você usa no select)
      texto_servico: item.field_8339544,
      entrega: item.field_8339555,
      entrada: item.field_8339557,
    }));
}

export async function getOrders() {
  const res = await axios.get(TABLE_URL, {
    headers: {
      Authorization: `Token ${API_TOKEN}`,
    },
    params: {
      user_field_names: true,
      page: 1,
      page_size: 500,
    }
  });
  console.log(res.data)
  return mapOrders(res.data.results);
}

export async function updateOrder(order) {
  const url = `https://api.baserow.io/api/database/rows/table/956440/${order.id}/`;

  await axios.patch(
    url,
    {
      field_8339519: order.carro,
      field_8339553: order.status_id,
      field_8339522: order.placa,
      field_8339537: order.cliente,
      field_8339538: order.pecas_quebradas,
      field_8339544: order.texto_servico,
      field_8339540: order.etapas_servico,
      field_8339555: order.entrega,
      field_8339557: order.entrada,
    },
    {
      headers: {
        Authorization: `Token ${API_TOKEN}`,
      },
      params: {
        user_field_names: true,
        page: 1,
        page_size: 500,
      }
    }
  );
}

export async function createOrder(order) {
  const response = await fetch(
    "https://api.baserow.io/api/database/rows/table/956440/?user_field_names=false",
    {
      method: "POST",
      headers: {
        "Authorization": `Token ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        field_8339519: order.carro,
        field_8339522: order.placa,
        field_8339537: order.cliente,
        field_8339538: order.pecas_quebradas,
        field_8339540: order.etapas_servico,
        field_8339553: order.status_id, //  ID DO SELECT
        field_8339544: order.texto_servico,
        field_8339555: order.entrega,
        field_8339557: order.entrada,
      }),
    }
  );

  return await response.json();
}

export const STATUS_OPTIONS = [
  { id: 6041980, label: "Recebido" },
  { id: 6041981, label: "Desmontagem" },
  { id: 6041982, label: "Funilaria" },
  { id: 6041983, label: "Preparação" },
  { id: 6041984, label: "Pintura" },
  { id: 6041987, label: "Acabamento" },
  { id: 6041985, label: "Polimento" },
  { id: 6041986, label: "Montagem" },
  { id: 6041988, label: "Pronto para Entrega"},
  { id: 6041989, label: "Concluído" },
];