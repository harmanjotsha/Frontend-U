require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const journalRoutes = require('./routes/journal');
const emotionRoutes = require('./routes/emotion');
const teacherRoutes = require('./routes/teacher');
const communityRoutes = require('./routes/community');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const PORT = process.env.PORT || 5000;

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/emotion', emotionRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/community', communityRoutes);

app.get('/', (req, res) => res.send({ message: 'Udaan API running' }));

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Server accessible at http://localhost:${PORT}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});
