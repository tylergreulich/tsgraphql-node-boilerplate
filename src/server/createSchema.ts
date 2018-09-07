import { makeExecutableSchema, mergeSchemas } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';
import { importSchema } from 'graphql-import';
import * as fs from 'fs';
import * as path from 'path';

const schemas: GraphQLSchema[] = [];

const schemaFolders = fs.readdirSync(path.join(__dirname, '../modules'));
schemaFolders.forEach(folder => {
  const { resolvers } = require(`../modules/${folder}/resolvers`);
  const typeDefs = importSchema(
    path.join(__dirname, `../modules/${folder}/schema.graphql`)
  );
  schemas.push(makeExecutableSchema({ resolvers, typeDefs }));
});

export const schema = mergeSchemas({ schemas });
