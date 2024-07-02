import { connectToDatabase } from '../../../../lib/db';


//Register user
export async function POST(req) {
  console.log('Received POST request to /api/users/register');


  //Add logic for checking all fields are completed on both frontend and server
  try {
    const body = await req.json();

    const db = await connectToDatabase();
    const usersCollection = db.collection('usercollection');

    const { firstname, surname, email, password } = body;
    //Check existing user
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'Email already in use' }), {
        headers: {
          "Content-Type": "application/json"
        },
        status: 409
      });
    }

    const data = {
      firstname,
      surname,
      email,
      password,
    };

    //Create new user
    const result = await usersCollection.insertOne(data);
    // console.log('RESULT', result)
    console.log('User added successfully');
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json"
      },
      status: 201
    })
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Error adding user' });
  }

  res.end();
}
