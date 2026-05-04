import OrderList from "./OrderList";

export default function AllOrders() {
  return (
    <div>
      <h2 className="title2">Todos os carros</h2>
      <OrderList filter="todos" />
    </div>
  );
}