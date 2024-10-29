import { QueryInterface, DataTypes } from 'sequelize';

const TASKS_TABLE_NAME = 'tasks';
const JOBS_TABLE_NAME = 'jobs';
const MIGRATION_NAME = '0010_shift_task_schema_from_tasks_to_jobs';

const migration0010ShiftTaskSchemaFromTasksToJobs = {
  name: MIGRATION_NAME,
  async up({ context: queryInterface }: { context: QueryInterface }) {
    await queryInterface.removeColumn(TASKS_TABLE_NAME, 'taskSchema');
    await queryInterface.addColumn(
      JOBS_TABLE_NAME,
      'taskSchema',
      DataTypes.TEXT,
    );
    await queryInterface.changeColumn(JOBS_TABLE_NAME, 'taskSchema', {
      type: DataTypes.TEXT,
      allowNull: false,
    });
  },
  async down({ context: queryInterface }: { context: QueryInterface }) {
    await queryInterface.addColumn(
      TASKS_TABLE_NAME,
      'taskSchema',
      DataTypes.TEXT,
    );
    await queryInterface.changeColumn(TASKS_TABLE_NAME, 'taskSchema', {
      type: DataTypes.TEXT,
      allowNull: false,
    });
    await queryInterface.removeColumn(JOBS_TABLE_NAME, 'taskSchema');
  },
};

export default migration0010ShiftTaskSchemaFromTasksToJobs;
