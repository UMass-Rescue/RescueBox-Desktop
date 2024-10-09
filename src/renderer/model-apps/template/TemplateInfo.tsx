import { ModelAppConfig } from 'src/shared/models';

function TemplateInfo({ modelAppConfig }: { modelAppConfig: ModelAppConfig }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">
          {modelAppConfig.name}
        </h1>
        <p className="text-md lg:text-lg whitespace-pre-wrap">
          {modelAppConfig.description}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl">Input Type</h1>
        <ul className="text-md lg:text-lg list-disc ml-4">
          {modelAppConfig.inputTypes.map(
            (inputType: { type: string; description: string }) => {
              return (
                <li key={inputType.type + inputType.description}>
                  <strong>{inputType.type}:</strong> {inputType.description}
                </li>
              );
            },
          )}
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl">
          Output Type
        </h1>
        <ul className="text-md lg:text-lg list-disc ml-4">
          {modelAppConfig.outputTypes.map(
            (outputType: { type: string; description: string }) => {
              return (
                <li key={outputType.type + outputType.description}>
                  <strong>{outputType.type}:</strong> {outputType.description}
                </li>
              );
            },
          )}
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl">Parameters</h1>
        <ul className="text-md lg:text-lg list-disc ml-4">
          {modelAppConfig.parameters.map(
            (param: { name: string; type: string; description: string }) => {
              return (
                <li key={param.type + param.description + param.name}>
                  <strong>{param.name}:</strong> {param.description}
                </li>
              );
            },
          )}
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl">
          Constraints
        </h1>
        <ul className="text-md lg:text-lg list-disc ml-4">
          {modelAppConfig.constraints.map(
            (constraint: { name: string; description: string }) => {
              return (
                <li key={constraint.name + constraint.description}>
                  <strong>{constraint.name}:</strong> {constraint.description}
                </li>
              );
            },
          )}
        </ul>
      </div>
    </div>
  );
}

export default TemplateInfo;
