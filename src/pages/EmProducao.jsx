import OrderList from "./OrderList";

export default function EmProducao() {
  return (
    <div>
      <h2 className="title2">Carros em Produção</h2>
      <OrderList filter="em_producao" />
    </div>
  );
}