import "./Loader.css";

interface LoaderProps {
  text?: string;
}

export default function Loader({ text = "Loading..." }: LoaderProps) {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <div className="loader-text">{text}</div>
    </div>
  );
}
