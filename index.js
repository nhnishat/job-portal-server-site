const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

// job-portals
// irEF5qudGrdbZ4FS
// console.log(process.env.DB_PASS);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t4pio7r.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function run() {
	try {
		// Connect the client to the server	(optional starting in v4.7)
		await client.connect();
		// Send a ping to confirm a successful connection

		const fesherCollections = client.db('job-portals').collection('feshers');
		const experiencedCollections = client
			.db('job-portals')
			.collection('experienced');
		const bdItCollections = client.db('job-portals').collection('bdIt');
		const worldCollections = client.db('job-portals').collection('world');

		app.get('/fesher', async (req, res) => {
			const result = await fesherCollections.find().toArray();
			res.send(result);
		});
		app.get('/experienced', async (req, res) => {
			const result = await experiencedCollections.find().toArray();
			res.send(result);
		});
		app.get('/bdIt', async (req, res) => {
			const result = await bdItCollections.find().toArray();
			res.send(result);
		});
		app.get('/bdIt/:id', async (req, res) => {
			const id = req.params.id;
			console.log(id);
			const query = { _id: new ObjectId(id) };
			const selectedCompany = await bdItCollections.findOne(query);
			res.send(selectedCompany);
		});
		app.get('/world', async (req, res) => {
			const result = await worldCollections.find().toArray();
			res.send(result);
		});
		app.get('/world/:id', async (req, res) => {
			const id = req.params.id;
			console.log(id);
			const query = { _id: new ObjectId(id) };
			const selectedCompany = await worldCollections.findOne(query);
			res.send(selectedCompany);
		});

		await client.db('admin').command({ ping: 1 });
		console.log(
			'Pinged your deployment. You successfully connected to MongoDB!'
		);
	} finally {
		// Ensures that the client will close when you finish/error
		// await client.close();
	}
}
run().catch(console.dir);

// middle wire

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
