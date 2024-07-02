import { MongoClient } from 'mongodb';

let client;
let db;
const uri = process.env.MONGODB_URI;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db('userdatabase');
  }

  return db;
}

export { connectToDatabase };

