/* eslint-disable react/jsx-props-no-spreading */
import { Button } from '@shadcn/components/ui/button';
import { ModelAppConfig } from 'src/shared/models';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { log } from 'electron-log/renderer';
import { Label } from '@shadcn/components/ui/label';
import { Input } from '@shadcn/components/ui/input';
import Slider from '@shadcn/components/ui/slider';
import GreenRunIcon from '@shadcn/components/GreenRunIcon';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const defaultValues = {
  targetDir: 'No Path Selected',
  knownDir: 'No Path Selected',
  outputFilePath: 'No Path Selected',
  parameters: {
    blockSizeInKiB: 16,
    targetProbability: 90,
  },
};

const SBFJobInputsSchema = yup.object().shape({
  targetDir: yup.string().required().not([defaultValues.targetDir]),
  knownDir: yup.string().required().not([defaultValues.knownDir]),
  outputFilePath: yup.string().required().not([defaultValues.outputFilePath]),
  parameters: yup.object().shape({
    blockSizeInKiB: yup.number().required(),
    targetProbability: yup.number().required(),
  }),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function SBFModelRun({
  modelAppConfig,
}: {
  modelAppConfig: ModelAppConfig;
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(SBFJobInputsSchema),
  });

  const navigate = useNavigate();

  const knownDir = watch('knownDir');
  const targetDir = watch('targetDir');
  const outputFilePath = watch('outputFilePath');
  const blockSizeInKiB = watch('parameters.blockSizeInKiB');
  const targetProbability = watch('parameters.targetProbability');

  const onSubmit: SubmitHandler<
    yup.InferType<typeof SBFJobInputsSchema>
  > = async (data) => {
    const jobUid = await window.job
      .runJob({
        modelUid: modelAppConfig.uid,
        inputs: [
          { path: data.knownDir, path_key: 'Known Dataset' },
          {
            path: data.targetDir,
            path_key: 'Target Dataset',
          },
        ],
        outputs: [{ path: data.outputFilePath, path_key: 'SQL Database' }],
        parameters: [
          {
            blockSizeInKiB: data.parameters.blockSizeInKiB,
          },
          {
            targetProbability: data.parameters.targetProbability,
          },
        ],
      })
      .then((job) => job.uid);
    log(jobUid);
    navigate('/jobs');
  };

  return (
    <div className="m-3 flex-1 flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl text-left">
          Small Block Forensics (SBF)
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
      <form
        className="flex-1 flex flex-col mt-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="font-semibold text-lg">Known Dataset Directory</h2>
              <div className="flex flex-col gap-2">
                <div className="flex items-center mt-2">
                  <Input
                    type="text"
                    className="flex-1 mr-2"
                    value={knownDir}
                    {...(register('knownDir'),
                    {
                      required: true,
                    })}
                    readOnly
                  />
                  <Button
                    type="button"
                    onClick={async () => {
                      const selectedDir =
                        await window.fileSystem.selectDirectory();
                      if (selectedDir) {
                        setValue('knownDir', selectedDir);
                        trigger('knownDir');
                      }
                    }}
                  >
                    Browse
                  </Button>
                </div>
                {errors.knownDir && (
                  <span className="text-sm text-red-500">
                    A known dataset directory is required
                  </span>
                )}
              </div>
            </div>
            <div className="order-3 md:order-none">
              <h2 className="font-semibold text-lg">Output SQL File Path</h2>
              <div className="flex flex-col gap-2">
                <div className="flex items-center mt-2">
                  <Input
                    type="text"
                    className="flex-1 mr-2"
                    value={outputFilePath}
                    readOnly
                  />
                  <Button
                    type="button"
                    onClick={async () => {
                      const selectedFilePath =
                        await window.fileSystem.selectFilePath();
                      if (selectedFilePath) {
                        setValue('outputFilePath', selectedFilePath);
                        trigger('outputFilePath');
                      }
                    }}
                  >
                    Browse
                  </Button>
                </div>
                {errors.outputFilePath && (
                  <div className="text-red-500 text-sm">
                    An output SQL file path is required
                  </div>
                )}
              </div>
            </div>
            <div>
              <h2 className="font-semibold text-lg">Target Directory</h2>
              <div className="flex flex-col gap-2">
                <div className="flex items-center mt-2">
                  <Input
                    type="text"
                    className="flex-1 mr-2"
                    value={targetDir}
                    readOnly
                  />
                  <Button
                    type="button"
                    onClick={async () => {
                      const selectedDir =
                        await window.fileSystem.selectDirectory();
                      if (selectedDir) {
                        setValue('targetDir', selectedDir);
                        trigger('targetDir');
                      }
                    }}
                  >
                    Browse
                  </Button>
                </div>
                {errors.targetDir && (
                  <div className="text-red-500 text-sm">
                    A target dataset directory is required
                  </div>
                )}
              </div>
            </div>
          </div>
          <h2 className="font-bold text-lg md:text-xl lg:text-2xl mt-6">
            Select Parameters
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
            <div>
              <Label className="block font-semibold text-lg">
                Block Size (KiB)
              </Label>
              <div className="grid grid-cols-6 items-center mt-2">
                <Slider
                  {...register('parameters.blockSizeInKiB', { required: true })}
                  min={4}
                  max={64}
                  step={4}
                  defaultValue={[blockSizeInKiB]}
                  className="col-span-5"
                />
                <div className="col-span-1 ml-5 whitespace-nowrap text-lg text-center bg-gray-200 rounded-full px-2 py-1">
                  {Number(blockSizeInKiB).toFixed(0)} KiB
                </div>
              </div>
            </div>
            <div>
              <Label className="block font-semibold text-lg">
                Target Probability (0-1)
              </Label>
              <div className="grid grid-cols-6 items-center mt-2">
                <Slider
                  {...register('parameters.targetProbability', {
                    required: true,
                  })}
                  min={50}
                  max={100}
                  step={1}
                  defaultValue={[targetProbability]}
                  className="col-span-5"
                />
                <div className="col-span-1 ml-5 text-lg text-center bg-gray-200 rounded-full px-2 py-1">
                  {Number(targetProbability).toFixed(0)}%
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full p-4">
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
