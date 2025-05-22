require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors({
  origin: ['https://consultancy-ashen.vercel.app/'],
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vaibhavi';
mongoose.connect(mongoURI)
  .then(() => console.log('✅ Database connected successfully'))
  .catch((err) => console.error('❌ Database connection failed:', err));

// -------------------- Transport Schema ---------------------
const transportSchema = new mongoose.Schema({
  route: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  driverName: { type: String, required: true },
  busNumber: { type: String, required: true },
  contact: { type: String, required: true },
  fare: { type: String, required: true },
  frequency: { type: String, required: true }
}, { versionKey: false });

const Transport = mongoose.model('Transport', transportSchema);

// -------------------- Feedback Schema ---------------------
const feedbackSchema = new mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  date: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  }
}, { versionKey: false });

const Feedback = mongoose.model('Feedback', feedbackSchema);

// -------------------- Routes -----------------------------

// GET all transports
app.get('/manage', async (req, res) => {
  try {
    const data = await Transport.find();
    res.json(data);
  } catch (error) {
    console.error('Error fetching transports:', error);
    res.status(500).json({ error: 'Failed to fetch transports' });
  }
});

// POST new transport
app.post('/manage', async (req, res) => {
  try {
    const newTransport = new Transport(req.body);
    await newTransport.save();
    res.json(newTransport);
  } catch (error) {
    console.error('Validation Error:', error);
    res.status(400).json({ error: 'Validation failed', details: error.errors });
  }
});

// PUT update transport
app.put('/manage/:id', async (req, res) => {
  try {
    const updated = await Transport.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Transport not found' });
    res.json(updated);
  } catch (err) {
    console.error('Update error:', err);
    res.status(400).json({ error: 'Failed to update transport', details: err.errors });
  }
});

// DELETE transport
app.delete('/manage/:id', async (req, res) => {
  try {
    const deleted = await Transport.findByIdAndDelete(req.params.id);
    res.json({ success: true, deleted });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Failed to delete transport' });
  }
});

// -------------------- Feedback Routes ---------------------

// GET all feedbacks
app.get('/api/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    console.error('Error fetching feedbacks:', err.message, err.stack);
    res.status(500).json({ error: 'Failed to fetch feedbacks' });
  }
});


// POST feedback
app.post('/api/feedback', async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.status(201).json(newFeedback); // <-- Return the saved document
  } catch (err) {
    console.error('Error saving feedback:', err);
    res.status(400).json({ error: 'Failed to save feedback', details: err.errors });
  }
});


// ----------------------------------------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
