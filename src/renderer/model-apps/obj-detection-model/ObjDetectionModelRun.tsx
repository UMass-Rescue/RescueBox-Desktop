/* eslint-disable react/jsx-props-no-spreading */
import SelectDirField from '@shadcn/components/SelectDirField';
import { Button } from '@shadcn/components/ui/button';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const modelTypes = ['yolov3', 'tiny-yolov3', 'retina'];

export type ImgObjDetParams = {
  inputs: string;
  outputs: string;
  modelType: string;
};

function ObjDetectionModelRun() {
  const [inputs, setInputs] = useState('No Path Selected');
  const [outputs, setOutputs] = useState('No Path Selected');
  const [modelType, setModelType] = useState(modelTypes[0]);
  const [isValid, setIsValid] = useState(true);

  const navigate = useNavigate();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      inputs === 'No Path Selected' ||
      inputs === '' ||
      outputs === 'No Path Selected' ||
      outputs === '' ||
      modelType === ''
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const jobUid = await window.job
        .runJob({
          modelUid: 'obj-detection-model',
          inputs: [{ path: inputs, path_key: 'Images to Analyze' }],
          outputs: [{ path: outputs, path_key: 'Images with Bounding Boxes' }],
          parameters: [{ modelType }],
        })
        .then((job) => job.uid);
      navigate('/jobs');
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={(e) => onSubmit(e)}>
      <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">
        Image Object Detection
      </h1>
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl">
          Input Directory
        </h1>
        <SelectDirField val={inputs} setVal={setInputs} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl">
          Output Directory
        </h1>
        <SelectDirField val={outputs} setVal={setOutputs} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl">Parameters</h1>
        <div className="grid grid-container grid-cols-8 gap-2 ">
          <h1 className="text-lg font-medium text-left w-auto col-span-1 place-content-center">
            Model Type
          </h1>
          <select
            value={modelType}
            onChange={(e) => setModelType(e.target.value)}
            title="Model Type"
            className="p-2 w-full  h-min justify-start items-start border border-slate-400 rounded-lg bg-inherit text-md col-span-7"
          >
            {modelTypes.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>
        {!isValid && (
          <span className="text-red-500 text-sm p-1">
            All fields must have a value
          </span>
        )}
      </div>
      <Button size="lg" type="submit" className="fixed bottom-0 right-0 m-10">
        Run
      </Button>
    </form>
  );
}

export default ObjDetectionModelRun;
