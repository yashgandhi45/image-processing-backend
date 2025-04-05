# 🖼️ image-processing-backend

A Node.js backend service that processes a CSV of product image URLs, compresses each image asynchronously, and generates a final CSV output with updated URLs—all while tracking status and handling webhook callbacks.

---

## 🚀 Features

- Upload a CSV with product names and image URLs
- Asynchronously compress images (50% quality)
- Save compressed images locally
- Store metadata in MongoDB
- Output a CSV containing:
  - Product name
  - Input URL
  - Compressed image URL
- Optional webhook for completion notification
- Check processing status via request ID

---

## 🛠️ Tech Stack

- **Node.js** (Backend)
- **Express.js** (Routing)
- **MongoDB** (Database)
- **Multer** (CSV Upload)
- **Sharp** (Image Compression)
- **Axios** (Image Download & Webhook)
- **csv-parser / csv-writer** (CSV Handling)

---

## 📦 Installation

```bash
git clone https://github.com/your-username/image-processing-backend.git
cd image-processing-backend
npm install
```

### ✅ Setup Environment

Create a `.env` file:

```
MONGODB_URI=mongodb://localhost:27017/image-processing
PORT=3000
```

---

## ▶️ Running the App

```bash
npm start
```

App will be live at: [http://localhost:3000](http://localhost:3000)

---

## 🧪 API Endpoints

### 1. 📤 Upload CSV

**POST** `/upload`

Upload a CSV file containing:

```
S. No., Product Name, Input Image Urls
1, Sample Product, https://example.com/image1.jpg, https://example.com/image2.jpg
```

**Form Data (multipart/form-data):**

- `file` → CSV file
- `webhookUrl` (optional) → URL to notify once processing is complete

**Response:**

```json
{
  "requestId": "12345-abcde"
}
```

---

### 2. 📊 Check Status

**GET** `/status/:requestId`

Check whether the processing is pending, processing, or completed.

**Response:**

```json
{
  "requestId": "12345-abcde",
  "status": "COMPLETED"
}
```

---

### 3. 📂 Output CSV Location

Once processing is finished, you'll find the result CSV in:

```
/uploads/output/<requestId>.csv
```

This file contains:

| Product Name | Input Image URL       | Compressed Image URL            |
|--------------|------------------------|----------------------------------|
| Product A    | https://.../image1.jpg | /uploads/compressed/image1.jpg  |

🔔 **Note:** You can manually retrieve the file from the `/uploads/output` directory.

---

## 🔁 Asynchronous Image Processing

Once uploaded:

1. The CSV is parsed row-by-row.
2. Each image is queued for compression.
3. Compression is done using **Sharp** (50% JPEG quality).
4. Compressed image is saved to `/uploads/compressed`.
5. Output CSV is generated once all are done.

---

## 🔔 Webhook (Optional)

If you provide a `webhookUrl` when uploading:

- You'll receive a POST request once processing is complete.

Payload:

```json
{
  "requestId": "12345-abcde",
  "status": "COMPLETED"
}
```

---

## 🧪 Testing with Postman

- Use `POST /upload` to send CSV (`multipart/form-data`)
- Use `GET /status/:requestId` to check progress
- Use `GET /uploads/compressed/<filename>` to view the compressed Image
- Retrieve the output CSV manually from `/uploads/output`
