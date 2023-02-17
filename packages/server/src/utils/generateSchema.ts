import fs from 'fs/promises';
import { printSchema } from 'graphql';
import schema from '../graphql/schema';
import path from 'path';

const generateSchema = async () => {
  const filePath = path.join(__dirname, '../graphql/schema.graphql');

  await fs.writeFile(filePath, printSchema(schema));
  console.log('Schema generated');
  process.exit(0);
};

generateSchema();
