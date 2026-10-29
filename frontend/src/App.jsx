
import { useEffect, useState } from "react";
import "./App.css";

const API = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

const emptyFood = {
  foodId: "",
  name: "",
  category: "",
  cuisine: "",
  ingredients: "",
  price: "",
  quantity: "",
  description: "",
  imageUrl: ""
};

function App() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyFood);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [detail, setDetail] = useState(null);

  async function request(url, options = {}) {
    const response = await fetch(`${API}${url}`, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Thao tac that bai");
    }

    return data;
  }

  async function loadFoods(keyword = "") {
    setLoading(true);
    setError("");

    try {
      const data = await request(
        `/foods?search=${encodeURIComponent(keyword)}`
      );
      setFoods(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFoods();
  }, []);

  function openAdd() {
    setForm(emptyFood);
    setEditingId(null);
    setShowForm(true);
    setDetail(null);
    setMessage("");
    setError("");
  }

  function openEdit(food) {
    setForm({
      foodId: food.foodId,
      name: food.name,
      category: food.category,
      cuisine: food.cuisine,
      ingredients: food.ingredients.join(", "),
      price: String(food.price),
      quantity: String(food.quantity),
      description: food.description,
      imageUrl: food.imageUrl || ""
    });

    setEditingId(food._id);
    setShowForm(true);
    setDetail(null);
    setMessage("");
    setError("");
  }

  async function viewDetail(id) {
    setLoading(true);
    setError("");

    try {
      const data = await request(`/foods/${id}`);
      setDetail(data);
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function saveFood(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const payload = {
      ...form,
      ingredients: form.ingredients
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      price: Number(form.price),
      quantity: Number(form.quantity)
    };

    try {
      const editing = Boolean(editingId);

      await request(
        editing ? `/foods/${editingId}` : "/foods",
        {
          method: editing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      setShowForm(false);
      setEditingId(null);
      setMessage(
        editing ? "Cap nhat mon an thanh cong!" :
                  "Them mon an thanh cong!"
      );
      await loadFoods(search);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteFood(food) {
    if (!window.confirm(`Ban muon xoa mon ${food.name}?`)) {
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      await request(`/foods/${food._id}`, {
        method: "DELETE"
      });

      setDetail(null);
      setMessage("Xoa mon an thanh cong!");
      await loadFoods(search);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function changeField(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function formatPrice(value) {
    return Number(value).toLocaleString("vi-VN") + " đ";
  }

  return (
    <div className="app">
      <header className="header">
        <div className="container header-inner">
          <div>
            <h1>QUẢN LÝ MÓN ĂN</h1>
            <p>Hệ thống quản lý món ăn trên nền tảng đám mây</p>
          </div>
          <div className="student">
            Lê Gia Huy - 236126
          </div>
        </div>
      </header>

      <main className="container">
        <section className="toolbar">
          <div>
            <h2>Danh sách món ăn</h2>
            <p>Tổng số: {foods.length} món</p>
          </div>
          <button className="primary" onClick={openAdd}>
            + Thêm món ăn
          </button>
        </section>

        <form
          className="search-box"
          onSubmit={(e) => {
            e.preventDefault();
            loadFoods(search);
          }}
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên, loại món hoặc vùng miền..."
          />
          <button type="submit">Tìm kiếm</button>
          <button
            type="button"
            className="secondary"
            onClick={() => {
              setSearch("");
              loadFoods("");
            }}
          >
            Hiển thị tất cả
          </button>
        </form>

        {message && <div className="success">{message}</div>}
        {error && <div className="error">{error}</div>}
        {loading && <div className="loading">Đang tải dữ liệu...</div>}

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Mã món</th>
                <th>Tên món</th>
                <th>Loại món</th>
                <th>Vùng miền</th>
                <th>Giá bán</th>
                <th>Số lượng</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food._id}>
                  <td>{food.foodId}</td>
                  <td><strong>{food.name}</strong></td>
                  <td>{food.category}</td>
                  <td>{food.cuisine}</td>
                  <td>{formatPrice(food.price)}</td>
                  <td>{food.quantity}</td>
                  <td>
                    <div className="actions">
                      <button onClick={() => viewDetail(food._id)}>
                        Chi tiết
                      </button>
                      <button onClick={() => openEdit(food)}>
                        Sửa
                      </button>
                      <button
                        className="danger"
                        onClick={() => deleteFood(food)}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!loading && foods.length === 0 && (
            <p className="empty">Không tìm thấy món ăn.</p>
          )}
        </div>

        {detail && (
          <section className="panel">
            <div className="panel-title">
              <h2>Chi tiết món ăn</h2>
              <button onClick={() => setDetail(null)}>Đóng</button>
            </div>

            {detail.imageUrl && (
              <img
                className="food-image"
                src={detail.imageUrl}
                alt={detail.name}
              />
            )}

            <p><b>Mã món:</b> {detail.foodId}</p>
            <p><b>Tên món:</b> {detail.name}</p>
            <p><b>Loại món:</b> {detail.category}</p>
            <p><b>Ẩm thực / vùng miền:</b> {detail.cuisine}</p>
            <p><b>Nguyên liệu:</b> {detail.ingredients.join(", ")}</p>
            <p><b>Giá bán:</b> {formatPrice(detail.price)}</p>
            <p><b>Số lượng:</b> {detail.quantity}</p>
            <p><b>Mô tả:</b> {detail.description}</p>
          </section>
        )}

        {showForm && (
          <section className="panel">
            <div className="panel-title">
              <h2>
                {editingId ? "Cập nhật món ăn" : "Thêm món ăn mới"}
              </h2>
              <button onClick={() => setShowForm(false)}>
                Đóng
              </button>
            </div>

            <form onSubmit={saveFood}>
              <div className="form-grid">
                <label>
                  Mã món ăn *
                  <input
                    name="foodId"
                    value={form.foodId}
                    onChange={changeField}
                    required
                  />
                </label>

                <label>
                  Tên món ăn *
                  <input
                    name="name"
                    value={form.name}
                    onChange={changeField}
                    required
                  />
                </label>

                <label>
                  Loại món ăn *
                  <input
                    name="category"
                    value={form.category}
                    onChange={changeField}
                    required
                  />
                </label>

                <label>
                  Ẩm thực / vùng miền *
                  <input
                    name="cuisine"
                    value={form.cuisine}
                    onChange={changeField}
                    required
                  />
                </label>

                <label>
                  Giá bán *
                  <input
                    type="number"
                    name="price"
                    min="0"
                    step="any"
                    value={form.price}
                    onChange={changeField}
                    required
                  />
                </label>

                <label>
                  Số lượng *
                  <input
                    type="number"
                    name="quantity"
                    min="0"
                    step="1"
                    value={form.quantity}
                    onChange={changeField}
                    required
                  />
                </label>

                <label className="full">
                  Nguyên liệu * (ngăn cách bằng dấu phẩy)
                  <input
                    name="ingredients"
                    value={form.ingredients}
                    onChange={changeField}
                    placeholder="Thịt, rau, gia vị"
                    required
                  />
                </label>

                <label className="full">
                  Mô tả món ăn *
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={changeField}
                    required
                  />
                </label>

                <label className="full">
                  Đường dẫn hình ảnh (nếu có)
                  <input
                    name="imageUrl"
                    value={form.imageUrl}
                    onChange={changeField}
                  />
                </label>
              </div>

              <div className="form-actions">
                <button
                  className="primary"
                  type="submit"
                  disabled={loading}
                >
                  {editingId ? "Lưu cập nhật" : "Thêm món ăn"}
                </button>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setShowForm(false)}
                >
                  Hủy
                </button>
              </div>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
