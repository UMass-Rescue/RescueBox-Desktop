/* eslint-disable react/jsx-props-no-spreading */
import { Button } from '@shadcn/components/ui/button';
import { ModelAppConfig } from 'src/shared/models';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { log } from 'electron-log/renderer';
import { Label } from '@shadcn/components/ui/label';
import { Input } from '@shadcn/components/ui/input';
import { Select } from '@radix-ui/react-select';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shadcn/components/ui/select';
import Slider from '@shadcn/components/ui/slider';
import GreenRunIcon from '@shadcn/components/GreenRunIcon';
import React from 'react';

enum Weights {
  GANS = 'gans',
  PSNR_LARGE = 'psnr-large',
  PSNR_SMALL = 'psnr-small',
  NOISE_CANCEL = 'noise-cancel',
}

type ISRJobInputs = {
  inputDir: string;
  outputDir: string;
  parameters: {
    weights: Weights;
    scale: number;
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ISRModelRun({ modelAppConfig }: { modelAppConfig: ModelAppConfig }) {
  const { register, handleSubmit, watch, setValue } = useForm<ISRJobInputs>({
    mode: 'onChange',
  });
  const [showWeightsInfo, setShowWeightsInfo] = React.useState(false);

  const navigate = useNavigate();

  const watchedInputDir = watch('inputDir', 'No Path Selected');
  const watchedOutputDir = watch('outputDir', 'No Path Selected');
  const watchedScale = watch('parameters.scale', 2);

  const onSubmit: SubmitHandler<ISRJobInputs> = async (data) => {
    const jobUid = await window.job
      .runJob({
        modelUid: modelAppConfig.uid,
        inputs: [{ path: data.inputDir, path_key: 'Low-Res Images' }],
        outputs: [{ path: data.outputDir, path_key: 'High-Res Images' }],
        parameters: [data.parameters],
      })
      .then((job) => job.uid);
    log(jobUid);
    navigate('/jobs');
  };

  return (
    <div className="m-3">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl text-left">
          Image Super Resolution (ISR)
        </h1>
        <Link to={`/models/${modelAppConfig.uid}/details`}>
          <Button
            type="button"
            className="ml-auto"
            onClick={() => navigate('/model-info')}
          >
            Model Details
          </Button>
        </Link>
      </div>
      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="font-semibold text-lg">Input Directory</h2>
            <div className="flex items-center mt-2">
              <Input
                type="text"
                id="inputDirPath"
                className="flex-1 mr-2"
                value={watchedInputDir}
                readOnly
              />
              <Button
                id="inputDir"
                type="button"
                onClick={async () => {
                  const selectedDir = await window.fileSystem.selectDirectory();
                  if (selectedDir) {
                    setValue('inputDir', selectedDir);
                  }
                }}
              >
                Browse
              </Button>
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Output Directory</h2>
            <div className="flex items-center mt-2">
              <Input
                type="text"
                id="outputDirPath"
                className="flex-1 mr-2"
                value={watchedOutputDir}
                readOnly
              />
              <Button
                id="outputDir"
                type="button"
                onClick={async () => {
                  const selectedDir = await window.fileSystem.selectDirectory();
                  if (selectedDir) {
                    setValue('outputDir', selectedDir);
                  }
                }}
              >
                Browse
              </Button>
            </div>
          </div>
        </div>
        <h2 className="font-bold text-lg md:text-xl lg:text-2xl mt-6">
          Select Parameters
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div>
            <div className="flex items-center justify-between">
              <Label
                htmlFor="weights"
                className="block font-semibold text-lg mb-2"
              >
                Model Weights
              </Label>
              <button
                type="button"
                onClick={() => setShowWeightsInfo(!showWeightsInfo)}
                className="ml-2 text-xs px-2 py-1 border rounded transition-colors duration-200 bg-gray-300 hover:bg-opacity-80"
              >
                {showWeightsInfo ? 'Hide Details' : 'More Details'}
              </button>
            </div>
            <Select {...register('parameters.weights')}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Weights" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GANS">GANS</SelectItem>
                <SelectItem value="PSNR_LARGE">PSNR Large</SelectItem>
                <SelectItem value="PSNR_SMALL">PSNR Small</SelectItem>
                <SelectItem value="NOISE_CANCEL">Noise Cancel</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="scale" className="block font-semibold text-lg">
              Scaling Factor
            </Label>
            <div className="grid grid-cols-6 items-center mt-2">
              <Slider
                {...register('parameters.scale')}
                id="scale"
                min={1}
                max={4}
                step={0.1}
                defaultValue={[watchedScale]}
                className="col-span-5"
              />
              <span className="col-span-1 ml-5 text-lg text-center bg-gray-200 rounded-full px-2 py-1">
                {Number(watchedScale).toFixed(1)}×
              </span>
            </div>
          </div>
          {showWeightsInfo && (
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h3 className="font-bold text-md">GANS</h3>
                  <p className="text-sm mr-3">
                    Generally the best choice; focuses on visually appealing,
                    sharp images, ideal for perceptual quality over pixel
                    accuracy.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-md">PSNR Large</h3>
                  <p className="text-sm mr-3">
                    Best for high-quality image reconstruction with minimal
                    distortion and high Peak Signal-to-Noise Ratio.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-md">PSNR Small</h3>
                  <p className="text-sm mr-3">
                    Lightweight model for good image quality while conserving
                    resources.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-md">Noise Cancel</h3>
                  <p className="text-sm mr-3">
                    Ideal for upscaling noisy images, reducing noise and
                    enhancing clarity.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="fixed bottom-5 left-0 w-full p-4">
          <Button
            type="submit"
            className="w-full flex flex-row gap-2 hover:-translate-y-0.5 transition-all py-2 px-6 rounded-lg bg-green-600 hover:bg-green-500"
          >
            Run Model
            <GreenRunIcon />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ISRModelRun;
