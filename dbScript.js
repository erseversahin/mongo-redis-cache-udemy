const fs = require('fs');
const mongoose = require('mongoose');

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/redis_example', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Şema tanımı
const UserSchema = new mongoose.Schema({
  name: String,
  surname: String,
  phone: String,
  email: String,
});

const User = mongoose.model('User', UserSchema);

// JSON dosyasını okuyarak MongoDB'ye ekleme
(async () => {
  try {
    // users.json dosyasını oku
    const usersData = fs.readFileSync('./users.json', 'utf8');
    const users = JSON.parse(usersData);

    // Mevcut verileri temizle
    await User.deleteMany();

    // Yeni verileri ekle
    await User.insertMany(users);
    console.log('JSON dosyasından veriler başarıyla eklendi.');

    process.exit();
  } catch (error) {
    console.error('Hata:', error);
    process.exit(1);
  }
})();