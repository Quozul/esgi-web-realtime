import { useParams } from "react-router-dom";

export default function Quiz() {
  const { id } = useParams();

  return <div>{id}</div>;
}
