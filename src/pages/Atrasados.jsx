import OrderList from "./OrderList";

export default function Atrasados() {
  return (
    <div>
      <h2 className="title2">Carros atrasados</h2>
      <OrderList filter="atrasados" />
    </div>
  );
}