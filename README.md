
# MongoDB, Redis ve Cache Kullanımı (Udemy Örneği)

Bu proje, **MongoDB**, **Redis** ve **Express.js** kullanarak önbellekleme mekanizmalarını ve veri yönetimini öğretmek amacıyla hazırlanmıştır. Proje, özellikle Redis'in önbellekleme yeteneklerini (Prepopulated Cache, Absolute Cache, Sliding Cache) pratik bir şekilde anlamanıza yardımcı olur.

---

## 🚀 Özellikler

- **MongoDB Entegrasyonu:** Kullanıcı verileri MongoDB'de saklanır.
- **Redis Cache:** Veriler Redis kullanılarak önbellekte tutulur.
- **Cache Stratejileri:**
  - **Cache olmadan listeleme:** Doğrudan MongoDB'den veri okuma.
  - **Prepopulated Cache:** Önceden belirlenmiş verilerin önbelleğe alınması.
  - **Absolute Cache:** Verilerin belirli bir süre boyunca önbellekte tutulması.
  - **Sliding Cache:** Verilere erişildikçe önbellek süresinin yenilenmesi.
- **RESTful API Endpointleri:** Express.js ile oluşturulmuş.

---

## 🛠️ Teknolojiler

- **Backend:** Node.js, Express.js
- **Veritabanı:** MongoDB (Mongoose)
- **Önbellekleme:** Redis

---

## 📂 Proje Yapısı

```
mongo-redis-cache-udemy/
├── server.js          # Ana API sunucusu
├── dbScript.js        # MongoDB için veri doldurma scripti
├── users.json         # Örnek kullanıcı verileri
├── package.json       # Proje bağımlılıkları
└── README.md          # Proje açıklaması
```

---

## 📦 Kurulum ve Çalıştırma

### Gerekli Yazılımlar
- **Node.js**: [Yüklemek için tıklayın](https://nodejs.org)
- **MongoDB**: [MongoDB'yi kurun](https://www.mongodb.com/try/download/community)
- **Redis**: [Redis'i kurun](https://redis.io/download)

### Kurulum Adımları

1. **Depoyu Klonlayın**
   ```bash
   git clone https://github.com/your-username/mongo-redis-cache-udemy.git
   cd mongo-redis-cache-udemy
   ```

2. **Bağımlılıkları Yükleyin**
   ```bash
   npm install
   ```

3. **MongoDB'yi Başlatın**
   ```bash
   mongod
   ```

4. **Redis'i Başlatın**
   ```bash
   redis-server
   ```

5. **Veritabanını Doldurun**
   ```bash
   node dbScript.js
   ```

6. **API Sunucusunu Başlatın**
   ```bash
   node server.js
   ```

7. **API'yi Test Edin**
   - Tarayıcı veya Postman kullanarak aşağıdaki endpointleri test edebilirsiniz:
     - `GET /users` - Cache olmadan listeleme.
     - `GET /users/prepopulated` - Prepopulated Cache.
     - `GET /users/absolute` - Absolute Cache.
     - `GET /users/sliding` - Sliding Cache.

---

## 🧪 API Endpointleri

| Endpoint               | Açıklama                                    |
|------------------------|---------------------------------------------|
| `GET /users`           | Cache olmadan doğrudan MongoDB'den veri okur. |
| `GET /users/prepopulated` | Redis'te önceden doldurulmuş verileri kullanır. |
| `GET /users/absolute`  | Absolute Time Cache kullanır.              |
| `GET /users/sliding`   | Sliding Time Cache kullanır.               |

---

## 👩‍💻 Geliştirici Notları

Bu proje, Redis'in temel önbellekleme stratejilerini anlamak ve MongoDB ile entegre çalışmasını görmek için bir başlangıç noktasıdır. Cache mekanizmalarının performansı nasıl artırdığını görmek için farklı endpointleri test edebilirsiniz.

---

## 📜 Lisans

Bu proje MIT lisansı ile lisanslanmıştır.
