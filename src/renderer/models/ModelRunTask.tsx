import GreenRunIcon from '@shadcn/components/icons/GreenRunIcon';
import InputField from '@shadcn/components/InputField';
import LoadingScreen from '@shadcn/components/LoadingScreen';
import ParameterField from '@shadcn/components/ParameterField';
import { Button } from '@shadcn/components/ui/button';
import { useTaskSchema } from '@shadcn/lib/hooks';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import {
  InputSchema,
  ParameterSchema,
  RequestBody,
} from 'src/shared/generated_models';
import { RunJobArgs } from 'src/shared/models';

export default function ModelRunTask() {
  const { modelUid, order } = useParams();

  const {
    data: taskSchema,
    error: taskSchemaError,
    isValidating: taskSchemaIsValidating,
  } = useTaskSchema(modelUid, order);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RequestBody>({
    mode: 'onChange',
  });

  if (!modelUid || !order) {
    return <div>Invalid Model UID or Task ID.</div>;
  }

  if (taskSchemaIsValidating) {
    return <LoadingScreen />;
  }
  if (taskSchemaError) {
    return <div>Error loading task schema</div>;
  }
  if (!taskSchema) {
    return <div>No task schemas found</div>;
  }

  const onSubmit = (data: RequestBody) => {
    const runJobArgs: RunJobArgs = {
      modelUid,
      taskId: String(order),
      requestBody: data,
    };
    window.job.runJob(runJobArgs);
  };

  return (
    <div className="mt-6 m-2 flex items-center flex-col">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-2xl font-extrabold mb-4">Select Inputs</h1>
        <div className="grid grid-cols-1 gap-6">
          {taskSchema.inputs.map((inputSchema: InputSchema) => (
            <div key={`inputs.${inputSchema.key}`}>
              <Controller
                name={`inputs.${inputSchema.key}`}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputField
                    inputSchema={inputSchema}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.inputs?.[inputSchema.key] && (
                <span className="text-red-500 text-xs">
                  Please fill this field.
                </span>
              )}
            </div>
          ))}
        </div>
        {taskSchema.parameters.length > 0 && (
          <>
            <hr className="mt-8 mb-4" />
            <h1 className="text-2xl font-extrabold mb-4">Select Parameters</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {taskSchema.parameters.map((parameterSchema: ParameterSchema) => (
                <div key={`parameters.${parameterSchema.key}`}>
                  <Controller
                    name={`parameters.${parameterSchema.key}`}
                    control={control}
                    rules={{ required: true }}
                    defaultValue={parameterSchema.value.default || ''}
                    render={({ field }) => (
                      <ParameterField
                        parameterSchema={parameterSchema}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {errors.parameters?.[parameterSchema.key] && (
                    <span className="text-red-500 text-xs">
                      Please fill this field.
                    </span>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
        <div className="bottom-5 left-0 w-full mt-5 py-4">
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
