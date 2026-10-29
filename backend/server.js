
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Food = require("./models/Food");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Cac truong du lieu theo de thi
const fields = [
  "foodId", "name", "category", "cuisine",
  "ingredients", "price", "quantity",
  "description", "imageUrl"
];

const requiredFields = fields.filter(
  (field) => field !== "imageUrl"
);

// Kiem tra du lieu dau vao
function validateFood(data, isUpdate = false) {
  if (!data || typeof data !== "object" ||
      Array.isArray(data)) {
    return "Du lieu phai la doi tuong JSON";
  }

  if (Object.keys(data).length === 0) {
    return "Du lieu khong duoc rong";
  }

  if (Object.keys(data).some(
    (key) => !fields.includes(key)
  )) {
    return "Du lieu chua truong khong hop le";
  }

  if (!isUpdate) {
    for (const field of requiredFields) {
      if (data[field] === undefined ||
          data[field] === null) {
        return `Thieu truong ${field}`;
      }
    }
  }

  const stringFields = [
    "foodId", "name", "category",
    "cuisine", "description"
  ];

  for (const field of stringFields) {
    if (data[field] !== undefined &&
        (typeof data[field] !== "string" ||
         !data[field].trim())) {
      return `${field} phai la chuoi khong rong`;
    }
  }

  if (data.imageUrl !== undefined &&
      typeof data.imageUrl !== "string") {
    return "imageUrl phai la chuoi";
  }

  if (data.ingredients !== undefined) {
    if (!Array.isArray(data.ingredients) ||
        data.ingredients.length === 0 ||
        data.ingredients.some(
          (item) => typeof item !== "string" ||
                    !item.trim()
        )) {
      return "ingredients phai la mang nguyen lieu hop le";
    }
  }

  if (data.price !== undefined &&
      (typeof data.price !== "number" ||
       !Number.isFinite(data.price) ||
       data.price < 0)) {
    return "Gia phai la so khong am";
  }

  if (data.quantity !== undefined &&
      (!Number.isInteger(data.quantity) ||
       data.quantity < 0)) {
    return "So luong phai la so nguyen khong am";
  }

  return null;
}

// Xu ly loi
function handleError(error, res) {
  console.error(error);

  if (error.code === 11000) {
    return res.status(409).json({
      message: "Ma mon an foodId da ton tai"
    });
  }

  if (error.name === "ValidationError" ||
      error.name === "CastError") {
    return res.status(400).json({
      message: "Du lieu khong hop le"
    });
  }

  return res.status(500).json({
    message: "Loi may chu hoac co so du lieu"
  });
}

// GET /health
app.get("/health", (req, res) => {
  const connected = mongoose.connection.readyState === 1;

  res.status(connected ? 200 : 503).json({
    status: connected ? "OK" : "ERROR",
    database: connected ? "connected" : "disconnected"
  });
});

// GET /api/foods
// GET /api/foods?search=pho
app.get("/api/foods", async (req, res) => {
  try {
    const search = String(req.query.search || "").trim();
    let filter = {};

    if (search) {
      // Escape ky tu dac biet trong Regex
      const keyword = search.replace(
        /[.*+?^${}()|[\]\\]/g, "\\$&"
      );

      filter = {
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { category: { $regex: keyword, $options: "i" } },
          { cuisine: { $regex: keyword, $options: "i" } }
        ]
      };
    }

    const foods = await Food.find(filter);
    res.status(200).json(foods);
  } catch (error) {
    handleError(error, res);
  }
});

// GET /api/foods/:id
app.get("/api/foods/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "ID khong hop le"
      });
    }

    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        message: "Khong tim thay mon an"
      });
    }

    res.status(200).json(food);
  } catch (error) {
    handleError(error, res);
  }
});

// POST /api/foods
app.post("/api/foods", async (req, res) => {
  try {
    const errorMessage = validateFood(req.body);

    if (errorMessage) {
      return res.status(400).json({
        message: errorMessage
      });
    }

    const food = await Food.create(req.body);

    res.status(201).json({
      message: "Them mon an thanh cong",
      food
    });
  } catch (error) {
    handleError(error, res);
  }
});

// PUT /api/foods/:id
app.put("/api/foods/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "ID khong hop le"
      });
    }

    const errorMessage = validateFood(req.body, true);

    if (errorMessage) {
      return res.status(400).json({
        message: errorMessage
      });
    }

    const food = await Food.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!food) {
      return res.status(404).json({
        message: "Khong tim thay mon an"
      });
    }

    res.status(200).json({
      message: "Cap nhat thanh cong",
      food
    });
  } catch (error) {
    handleError(error, res);
  }
});

// DELETE /api/foods/:id
app.delete("/api/foods/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "ID khong hop le"
      });
    }

    const food = await Food.findByIdAndDelete(req.params.id);

    if (!food) {
      return res.status(404).json({
        message: "Khong tim thay mon an"
      });
    }

    res.status(200).json({
      message: "Xoa mon an thanh cong"
    });
  } catch (error) {
    handleError(error, res);
  }
});

// Ket noi MongoDB Atlas va khoi dong Backend
async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("Thieu bien MONGODB_URI trong .env");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Atlas connected successfully!");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Khong the ket noi MongoDB Atlas:", error.message);
    process.exit(1);
  }
}

startServer();
