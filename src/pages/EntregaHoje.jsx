import OrderList from "./OrderList";

export default function EntregaHoje() {
  return (
    <div>
      <h2 className="title2">Carros para entregar hoje</h2>
      <OrderList filter="hoje" />
    </div>
  );
}