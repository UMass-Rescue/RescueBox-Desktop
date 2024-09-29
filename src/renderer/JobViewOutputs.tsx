import { useParams } from 'react-router-dom';

function JobViewOutputs() {
  const { uid } = useParams();

  return <h1>{uid}</h1>;
}

export default JobViewOutputs;
