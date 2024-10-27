import GreenRunIcon from '@shadcn/components/icons/GreenRunIcon';
import InputField from '@shadcn/components/InputField';
import LoadingScreen from '@shadcn/components/LoadingScreen';
import ParameterField from '@shadcn/components/ParameterField';
import { Button } from '@shadcn/components/ui/button';
import { useTaskSchema } from '@shadcn/lib/hooks';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { InputSchema, ParameterSchema } from 'src/shared/generated_models';

export default function ModelRunTask() {
  const { modelUid, order } = useParams();

  const {
    data: taskSchema,
    error: taskSchemaError,
    isLoading: taskSchemaIsLoading,
  } = useTaskSchema(modelUid, Number(order));

  const { handleSubmit, control } = useForm({ mode: 'onChange' });

  if (!taskSchema) {
    return <div>No task schemas found</div>;
  }
  if (taskSchemaIsLoading) {
    return <LoadingScreen />;
  }
  if (taskSchemaError) {
    return <div>Error loading task schema</div>;
  }

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="mt-6 m-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-2xl font-extrabold mb-4">Select Inputs</h1>
        <div className="grid grid-cols-1 gap-6">
          {taskSchema.inputs.map((inputSchema: InputSchema) => (
            <div key={inputSchema.key}>
              <Controller
                name={inputSchema.key}
                control={control}
                render={({ field }) => (
                  <InputField
                    inputSchema={inputSchema}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          ))}
        </div>
        <hr className="mt-8 mb-4" />
        {taskSchema.parameters.length > 0 && (
          <>
            <h1 className="text-2xl font-extrabold mb-4">Select Parameters</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {taskSchema.parameters.map((parameterSchema: ParameterSchema) => (
                <div key={parameterSchema.key}>
                  <Controller
                    name={parameterSchema.key}
                    control={control}
                    render={({ field }) => (
                      <ParameterField
                        parameterSchema={parameterSchema}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
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
