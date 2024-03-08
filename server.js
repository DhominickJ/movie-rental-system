import express from 'express';
import { MongoClient } from 'mongodb';


// mongoose.connect('mongodb://localhost:6969/')

const app = express();
const PORT = 3000;
const URI = 'mongodb://localhost:6969/';

const client = new MongoClient(URI);

app.set('view engine', 'ejs');
app.set('views', './client/');

app.use(express.static('client'));

app.listen(PORT, () => {
  console.log("Server started port number " + PORT);
})

app.get('/', (req, res) => {
  res.render('index');
})

// app.get('/api/movies' (req, res) => {

// }) 

app.post('/api/movies', async (req, res) => {
  res.json(await run())
});


async function run() {
  console.log('starting...')
  const result = [];

  try {
    await client.connect();
    // database and collection code goes here
    const db = client.db("movies");

    const coll = db.collection("movies_entry");
    // find code goes here

    const cursor = coll.find({});
    // iterate code goes here

    for await (const row of cursor) {
      result.push(row)
    }
    // for (await c of cursor) console.log(c)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

  console.log(result)
  return result;
}

