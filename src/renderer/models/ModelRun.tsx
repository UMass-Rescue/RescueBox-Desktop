import { useParams } from 'react-router-dom';

function ModelRun() {
  const { modelUid } = useParams();

  return <div>Model Run Page for model uid {modelUid}</div>;
}

export default ModelRun;
