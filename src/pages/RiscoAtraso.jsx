import OrderList from "./OrderList";

export default function RiscoAtraso() {
  return (
    <div>
      <h2 className="title2">Risco de Atraso</h2>
      <OrderList filter="risco_atraso" />
    </div>
  );
}