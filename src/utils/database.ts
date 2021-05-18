import { Collection, MongoClient } from 'mongodb';

let client: MongoClient;

export const connectDatabase = async (url: string): Promise<void> => {
  client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  const databaseList = await client.db().admin().listDatabases();
  console.log(databaseList);
};

export const disconnectDatabase = (): Promise<void> => {
  return client.close();
};
export const getCollection = (name: string): Collection => {
  return client.db().collection(name);
};
