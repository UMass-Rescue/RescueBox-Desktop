import { useParams } from 'react-router-dom';
import RunImageObjDect from './model-run-pages/img-obj-dect-model/run-image-obj-dect';
import RunISR from './model-run-pages/isr-model/run-isr';
import RunSBF from './model-run-pages/sbf-model/run-sbf';

const currentModels = {
  'obj-detection-model': RunImageObjDect,
  'isr-model': RunISR,
  'sbf-model': RunSBF,
};

function ModelRun() {
  const { modelUid } = useParams();

  const CurrentModel = modelUid
    ? currentModels[modelUid as keyof typeof currentModels]
    : () => <div>No model found</div>;

  return <CurrentModel />;
}

export default ModelRun;
