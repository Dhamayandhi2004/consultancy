const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/vaibhavi')
  .then(() => console.log('✅ Database connected successfully'))
  .catch((err) => console.error('❌ Database connection failed:', err));

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
  frequency: { type: String, required: true },
}, { versionKey: false });

const Transport = mongoose.model('Transport', transportSchema);

app.get('/manage', async (req, res) => {
  const data = await Transport.find();
  res.json(data);
});

app.post('/manage', async (req, res) => {
  try {
    const newTransport = new Transport(req.body);
    await newTransport.save();
    console.log("Added:", newTransport);
    res.json(newTransport);
  } catch (error) {
    console.error('Validation Error:', error);
    res.status(400).json({ error: 'Validation failed', details: error.errors });
  }
});

app.put('/manage/:id', async (req, res) => {
  try {
    const updated = await Transport.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Transport not found' });
    }

    console.log("Updated:", updated);
    res.json(updated);
  } catch (err) {
    console.error('Update error:', err);
    res.status(400).json({ error: 'Failed to update transport', details: err.errors });
  }
});

app.delete('/manage/:id', async (req, res) => {
  const deleted = await Transport.findByIdAndDelete(req.params.id);
  console.log("Deleted:", deleted);
  res.json({ success: true });
});

app.listen(5000, () => console.log('🚀 Server started on http://localhost:5000'));
