import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch'; // Import fetch for HTTP requests
import { connectDB, client } from './db.js';

const app = express();
const dbname = "kingofgk";
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Define routes
app.get('/api/items', async (req, res) => {
  try {
    // Fetch data from external API (Open Trivia Database)
    const response = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
    const data = await response.json();
    const questions = data.results.map(question => ({
      category: question.category,
      question: question.question,
      correct_answer: question.correct_answer,
      incorrect_answers: question.incorrect_answers
    }));
    const shuffleOptions = (options) => {
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      return options;
    };

    const resdata = questions.map(question => ({
      category: question.category,
      question: question.question,
      options: shuffleOptions([...question.incorrect_answers, question.correct_answer])
    }));


    // Store fetched questions in MongoDB
    const database = client.db(dbname);
    const collection = database.collection('questions');

    // Clear existing data in the collection
    await collection.deleteMany({});

    // Insert new questions
    const result = await collection.insertMany(questions);

    // Send response to client
    res.json({ message: 'Questions fetched and stored successfully', data: resdata[0] });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: err.message });
  }
});
app.post('/api/giveanswer', async (req, res) => {
  try {
    const database = client.db(dbname);
    const collection = database.collection('questions');

    const answer = req.body.answer;

    const question = await collection.findOne({});
    const correctAnswer = question.correct_answer;

    let result;
    if (correctAnswer === answer) {
      result = "correct";
    } else {
      result = "incorrect";
    }

    // Send response to client
    res.json({ message: 'Answer checked successfully', data: result });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: err.message });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
