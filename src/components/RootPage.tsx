import { Link } from "react-router-dom";

export function RootPage() {
  return (
    <>
      <div>
        <div className="sidebar">
          <Link to="/caixas">Caixa</Link> | {" "}
          <Link to="/vendas">Vendas</Link> | {" "}
          <Link to="/produtos">Produtos</Link> | {" "}
        </div>
      </div>
    </>
  );
}