import openapiTS, { astToString } from 'openapi-typescript';
import fs from 'fs';
import path from 'path';

async function generateTypescriptModels() {
  const filePath = path.resolve(__dirname, 'openapi.yaml');
  fs.readFile(filePath, async (err, data) => {
    if (err) throw err;
    const ast = await openapiTS(data);
    const filteredAst = ast.filter((item) => {
      return !(
        'name' in item &&
        // @ts-ignore
        (item.name.escapedText === 'paths' ||
          // @ts-ignore
          item.name.escapedText === 'webhooks' ||
          // @ts-ignore
          item.name.escapedText === '$defs' ||
          // @ts-ignore
          item.name.escapedText === 'operations')
      );
    });
    const output = astToString(filteredAst);
    fs.writeFileSync('src/shared/generated-models.ts', output);
  });
}

generateTypescriptModels();
