
const express = require('express');
const mongoose = require('mongoose');
const { createClient } = require('redis');

const app = express();
const PORT = 3000;

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/redis_example', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Redis bağlantısı
const redisClient = createClient();
redisClient.connect().catch((err) => console.error('Redis bağlantı hatası:', err));

// Mongoose Şeması
const UserSchema = new mongoose.Schema({
  name: String,
  surname: String,
  phone: String,
  email: String,
});

const User = mongoose.model('User', UserSchema);

// Endpoint: /users (Cache olmadan)
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Veritabanı hatası' });
  }
});

// Endpoint: /users/prepopulated (Prepopulated Cache)
app.get('/users/prepopulated', async (req, res) => {
  const cacheKey = 'users_prepopulated';
  try {
    const cachedUsers = await redisClient.get(cacheKey);
    if (cachedUsers) {
      return res.json({ source: 'cache', data: JSON.parse(cachedUsers) });
    }

    const users = await User.find();
    await redisClient.set(cacheKey, JSON.stringify(users), { EX: 600 }); // 10 dakika cache
    res.json({ source: 'database', data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hata oluştu' });
  }
});

// Endpoint: /users/absolute (Absolute Cache)
app.get('/users/absolute', async (req, res) => {
  const cacheKey = 'users_absolute';
  try {
    const cachedUsers = await redisClient.get(cacheKey);
    if (cachedUsers) {
      return res.json({ source: 'cache', data: JSON.parse(cachedUsers) });
    }

    const users = await User.find();
    await redisClient.set(cacheKey, JSON.stringify(users), { EX: 300 }); // 5 dakika cache
    res.json({ source: 'database', data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hata oluştu' });
  }
});

// Endpoint: /users/sliding (Sliding Cache)
app.get('/users/sliding', async (req, res) => {
  const cacheKey = 'users_sliding';
  try {
    const cachedUsers = await redisClient.get(cacheKey);
    if (cachedUsers) {
      await redisClient.expire(cacheKey, 300); // Her erişimde TTL'i yenile
      return res.json({ source: 'cache', data: JSON.parse(cachedUsers) });
    }

    const users = await User.find();
    await redisClient.set(cacheKey, JSON.stringify(users), { EX: 300 }); // 5 dakika cache
    res.json({ source: 'database', data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hata oluştu' });
  }
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
