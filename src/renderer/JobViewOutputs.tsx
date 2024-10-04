import { useParams } from 'react-router-dom';

function JobViewOutputs() {
  const { jobId } = useParams();

  return <h1>{jobId}</h1>;
}

export default JobViewOutputs;
