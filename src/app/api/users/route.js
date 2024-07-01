import { connectToDatabase } from '../../lib/db';

export async function POST(req, res) {
  console.log('Received POST request to /api/users');

  const body = await req.json();

  if (req.method === 'POST') {
    try {
      const db = await connectToDatabase();
      const usersCollection = db.collection('usercollection');

      const result = await usersCollection.insertOne({
        username: body.username,
        email: body.email,
        password: body.password,
      });

      console.log('User added successfully:', result.ops[0]);

      res.status(201).json({ message: 'User added successfully', data: result.ops[0] });
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ message: 'Error adding user' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }

  res.end();
}

