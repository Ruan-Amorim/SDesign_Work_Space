import axios from "axios";

const API_TOKEN = "dawZ2bQ1wSy5WGKEQe1BCUYTYn6IYFty";
const TABLE_URL = "https://api.baserow.io/api/database/rows/table/956440/";

export async function getOrders() {
  const res = await axios.get(TABLE_URL, {
    headers: {
      Authorization: `Token ${API_TOKEN}`,
    },
  });

  return res.data.results;
}