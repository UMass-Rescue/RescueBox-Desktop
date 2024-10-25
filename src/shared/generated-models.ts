export interface components {
  schemas: {
    /** @example {
     *       "info": "# Welcome to the Face Match App\n\nThis app will help you to match faces in your images..."
     *     } */
    InfoPage: {
      /** @description Markdown content to render on the info page */
      info: string;
      author: string;
      version: string;
      /** Format: date-time */
      lastUpdated: string;
    };
    APIRoutes: (
      | components['schemas']['SchemaAPIRoute']
      | components['schemas']['NoSchemaAPIRoute']
    )[];
    SchemaAPIRoute: {
      /** @example /tasks/{name_of_task}/task_schema */
      task_schema: string;
      /** @example /tasks/{name_of_task} */
      run_task: string;
      /** @example /tasks/{name_of_task}/payload_schema */
      payload_schema: string;
      /** @example /tasks/{name_of_task}/sample_payload */
      sample_payload?: string;
      /** @example {A short title for the task} */
      short_title: string;
      /** @example 1 */
      order: number;
    };
    NoSchemaAPIRoute: {
      /** @example /tasks/{name_of_task} */
      run_task: string;
      /** @example /tasks/{name_of_task}/payload_schema */
      payload_schema?: string;
      /** @example /tasks/{name_of_task}/sample_payload */
      sample_payload?: string;
    };
    Input:
      | components['schemas']['FileInput']
      | components['schemas']['DirectoryInput']
      | components['schemas']['TextInput']
      | components['schemas']['BatchFileInput']
      | components['schemas']['BatchTextInput']
      | components['schemas']['BatchDirectoryInput'];
    FileInput: {
      path: string;
    };
    DirectoryInput: {
      path: string;
    };
    TextInput: {
      text: string;
    };
    BatchFileInput: {
      files: components['schemas']['FileInput'][];
    };
    BatchTextInput: {
      texts: components['schemas']['TextInput'][];
    };
    BatchDirectoryInput: {
      directories: components['schemas']['DirectoryInput'][];
    };
    TaskSchema: {
      inputs: components['schemas']['InputSchema'][];
      parameters: components['schemas']['ParameterSchema'][];
    };
    InputSchema: {
      key: string;
      label: string;
      /** @default  */
      subtitle: string | null;
      inputType: components['schemas']['InputType'];
    };
    /** @enum {string} */
    InputType:
      | 'file'
      | 'directory'
      | 'text'
      | 'textarea'
      | 'batchfile'
      | 'batchtext'
      | 'batchdirectory';
    ParameterSchema: {
      key: string;
      label: string;
      /** @default  */
      subtitle: string | null;
      value:
        | components['schemas']['RangedFloatParameterDescriptor']
        | components['schemas']['FloatParameterDescriptor']
        | components['schemas']['EnumParameterDescriptor']
        | components['schemas']['TextParameterDescriptor']
        | components['schemas']['RangedIntParameterDescriptor']
        | components['schemas']['IntParameterDescriptor'];
    };
    /** @enum {string} */
    ParameterType:
      | 'ranged_float'
      | 'float'
      | 'enum'
      | 'text'
      | 'ranged_int'
      | 'int';
    RangedFloatParameterDescriptor: {
      /** @default ranged_float */
      parameterType: components['schemas']['ParameterType'];
      range: components['schemas']['FloatRangeDescriptor'];
      default: number;
    };
    FloatParameterDescriptor: {
      /** @default float */
      parameterType: components['schemas']['ParameterType'];
      default: number;
    };
    EnumParameterDescriptor: {
      /** @default enum */
      parameterType: components['schemas']['ParameterType'];
      enumVals: {
        label?: string;
        key?: string;
      }[];
      messageWhenEmpty?: string;
      default: string;
    };
    TextParameterDescriptor: {
      /** @default text */
      parameterType: components['schemas']['ParameterType'];
      default: string | null;
    };
    RangedIntParameterDescriptor: {
      /** @default ranged_int */
      parameterType: components['schemas']['ParameterType'];
      range: components['schemas']['IntRangeDescriptor'];
      default: number;
    };
    IntParameterDescriptor: {
      /** @default int */
      parameterType: components['schemas']['ParameterType'];
      default: number | null;
    };
    IntRangeDescriptor: {
      min: number;
      max: number;
    };
    FloatRangeDescriptor: {
      min: number;
      max: number;
    };
    RequestBody: {
      inputs: {
        [key: string]: components['schemas']['Input'];
      };
      parameters: Record<string, never>;
    };
    ResponseBody:
      | components['schemas']['FileResponse']
      | components['schemas']['DirectoryResponse']
      | components['schemas']['MarkdownResponse']
      | components['schemas']['TextResponse']
      | components['schemas']['BatchFileResponse']
      | components['schemas']['BatchTextResponse']
      | components['schemas']['BatchDirectoryResponse'];
    /** @enum {string} */
    ResponseType:
      | 'file'
      | 'directory'
      | 'markdown'
      | 'text'
      | 'batchfile'
      | 'batchtext'
      | 'batchdirectory';
    FileResponse: {
      /** @default file */
      output_type: components['schemas']['ResponseType'];
      /** @enum {string} */
      file_type:
        | 'img'
        | 'csv'
        | 'json'
        | 'text'
        | 'audio'
        | 'video'
        | 'markdown';
      path: string;
      title?: string;
      subtitle?: string;
    };
    DirectoryResponse: {
      /** @default directory */
      output_type: components['schemas']['ResponseType'];
      path: string;
      title: string;
      subtitle?: string | null;
    };
    MarkdownResponse: {
      /** @default markdown */
      output_type: components['schemas']['ResponseType'];
      value: string;
      title?: string;
      subtitle?: string;
    };
    TextResponse: {
      /** @default text */
      output_type: components['schemas']['ResponseType'];
      value: string;
      title?: string;
      subtitle?: string;
    };
    BatchFileResponse: {
      /** @default batchfile */
      output_type: components['schemas']['ResponseType'];
      files: components['schemas']['FileResponse'][];
    };
    BatchTextResponse: {
      /** @default batchtext */
      output_type: components['schemas']['ResponseType'];
      texts: components['schemas']['TextResponse'][];
    };
    BatchDirectoryResponse: {
      /** @default batchdirectory */
      output_type: components['schemas']['ResponseType'];
      directories: components['schemas']['DirectoryResponse'][];
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}