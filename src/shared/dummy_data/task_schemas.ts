import { TaskSchema } from '../generated_models';
import taskSchema1 from './task_schema1';
import taskSchema2 from './task_schema2';
import taskSchema3 from './task_schema3';

const taskSchemas: TaskSchema[] = [
  taskSchema1,
  taskSchema2,
  taskSchema3,
] satisfies TaskSchema[];

export default taskSchemas;
