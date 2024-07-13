
import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://testingchatbot123:gkking@kingofgk.xlmgrbr.mongodb.net/?retryWrites=true&w=majority&appName=Kingofgk';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connectDB = async () => {
  try {
    await client.connect();
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1); // Exit process with failure
  }
};

export { connectDB, client };
