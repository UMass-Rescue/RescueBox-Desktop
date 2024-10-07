import { useParams } from 'react-router-dom';
import RunImageObjDect from './model-run-pages/run-image-obj-dect';

const currentModels = {
  'obj-detection-model': RunImageObjDect,
};

function ModelRun() {
  const { modelUid } = useParams();

  const CurrentModel = modelUid
    ? currentModels[modelUid as keyof typeof currentModels]
    : () => <div>No model found</div>;

  return <CurrentModel />;
}

export default ModelRun;
