import "./DataNotFound.css";

interface DataNotFoundProps {
  path: string;
}

export default function DataNotFound({ path }: DataNotFoundProps) {
  return (
    <div className="not-found">
      <strong>/{path}</strong>
      <h1>Não há nada aqui</h1>
      <span>{`:(`}</span>
    </div>
  );
}
