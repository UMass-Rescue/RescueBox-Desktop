import GreenRunIcon from '@shadcn/components/icons/GreenRunIcon';
import InputField from '@shadcn/components/InputField';
import LoadingScreen from '@shadcn/components/LoadingScreen';
import ParameterField from '@shadcn/components/ParameterField';
import { Button } from '@shadcn/components/ui/button';
import { useTaskSchema } from '@shadcn/lib/hooks';
import { buildRequestBody } from '@shadcn/lib/utils';
import { Controller, useForm } from 'react-hook-form';
import { useOutletContext, useParams } from 'react-router-dom';
import {
  InputSchema,
  ParameterSchema,
  SchemaAPIRoute,
} from 'src/shared/generated_models';
import { RunJobArgs } from 'src/shared/models';

export default function ModelRunTask() {
  const { modelUid, order } = useParams();
  const apiRoutes: SchemaAPIRoute[] = useOutletContext();
  const thisApiRoute = apiRoutes.find((route) => String(route.order) === order);

  const {
    data: taskSchema,
    error: taskSchemaError,
    isValidating: taskSchemaIsValidating,
  } = useTaskSchema(modelUid, order);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  if (!modelUid || !order) {
    return <div>Invalid Model UID or Task ID.</div>;
  }

  if (!thisApiRoute) {
    return <div>Task not found.</div>;
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

  const onSubmit = (data: any) => {
    const runJobArgs: RunJobArgs = {
      taskSchemaAtTimeOfRun: taskSchema,
      modelUid,
      taskUid: order,
      requestBody: buildRequestBody(taskSchema, data),
    };
    window.job.runJob(runJobArgs);
  };

  return (
    <div className="flex pl-2 items-center flex-col">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-2xl font-bold mb-4">{thisApiRoute.short_title}</h1>
        <div className="grid grid-cols-1 gap-6">
          {taskSchema.inputs.map((inputSchema: InputSchema) => (
            <div key={inputSchema.key}>
              <Controller
                name={inputSchema.key}
                control={control}
                rules={{ required: `Field is required.` }}
                render={({ field }) => (
                  <InputField
                    inputSchema={inputSchema}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors[inputSchema.key] && (
                <span className="text-red-500 text-xs mt-1">
                  {errors[inputSchema.key]?.message?.toString()}
                </span>
              )}
            </div>
          ))}
        </div>
        {taskSchema.parameters.length > 0 && (
          <>
            <hr className="mt-8 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {taskSchema.parameters.map((parameterSchema: ParameterSchema) => (
                <div key={parameterSchema.key}>
                  <Controller
                    name={parameterSchema.key}
                    control={control}
                    rules={{
                      required: `Field is required.`,
                      validate: {
                        validInt: (v) =>
                          (parameterSchema.value.parameterType === 'int'
                            ? !Number.isNaN(v) && Number.isInteger(v)
                            : true) || `Value must be an integer.`,
                        validFloat: (v) =>
                          (parameterSchema.value.parameterType === 'float'
                            ? !Number.isNaN(v)
                            : true) || `Value must be a float.`,
                      },
                    }}
                    defaultValue={parameterSchema.value.default || ''}
                    render={({ field }) => (
                      <ParameterField
                        parameterSchema={parameterSchema}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {errors[parameterSchema.key] && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors[parameterSchema.key]?.message?.toString()}
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
