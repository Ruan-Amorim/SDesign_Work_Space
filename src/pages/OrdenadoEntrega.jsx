import OrderList from "./OrderList";

export default function OrdenadoEntrega() {
  return (
    <div>
      <h2 className="title2">Lista de entrega Ordenada</h2>
      <OrderList filter="ordenado_entrega" />
    </div>
  );
}