import { connectToDatabase } from '../../../../lib/db';


//Login user
export async function POST(req) {
  console.log('Received POST request to /api/users/login');

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 405
    });
  }


  try {
    const body = await req.json();

    const db = await connectToDatabase();
    const usersCollection = db.collection('usercollection');

    //Check existing user
    const existingUser = await usersCollection.findOne({ email: body.email });

    if (!existingUser) {
      return new Response(JSON.stringify({ message: 'Invalid email or password' }), {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 401
      });
    }

    if (existingUser.password !== body.password) {
      return new Response(JSON.stringify({ message: 'Invalid email or password' }), {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 401
      });
    }

    console.log('User logged in successfully');
    return new Response(JSON.stringify({ message: 'User logged in successfully', user: existingUser }), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 200
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    return new Response(JSON.stringify({ message: 'Error logging in user' }), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 500
    });
  }
}
