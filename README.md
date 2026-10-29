
# He thong quan ly mon an

## Thong tin sinh vien
- Ho ten: Le Gia Huy
- MSSV: 236126
- Mon hoc: Dien toan dam may

## Gioi thieu
De tai: Xay dung va trien khai he thong quan ly mon an tren nen tang dam may.

He thong gom Frontend React, Backend REST API va co so du lieu MongoDB Atlas.

Ma nguon duoc quan ly tren GitHub, dong goi bang Docker, day Docker image len Docker Hub va trien khai ung dung tren Render.

## Cong nghe su dung
- React
- Vite
- Node.js
- Express
- Mongoose
- MongoDB Atlas
- Git va GitHub
- Docker va Docker Hub
- Render
- Nginx

## Cau truc du an

```text
236126_LeGiaHuy/
|-- backend/
|   |-- server.js
|   |-- package.json
|   |-- Dockerfile
|
|-- frontend/
|   |-- src/
|   |-- nginx/
|   |-- package.json
|   |-- Dockerfile
|
|-- .gitignore
|-- README.md
```

## Chuc nang
- Hien thi danh sach mon an
- Xem chi tiet mon an
- Them mon an
- Cap nhat thong tin mon an
- Xoa mon an
- Tim kiem mon an theo tu khoa
- Hien thi trang thai dang tai
- Hien thi thong bao ket qua va loi

## Cai dat va chay chuong trinh

### Yeu cau
- Node.js va npm
- MongoDB Atlas
- Git

### 1. Cai dat Backend

Mo Terminal tai thu muc goc du an:

```bash
cd backend
npm install
```

Tao file `.env` trong thu muc `backend`:

```env
MONGODB_URI=<CHUOI_KET_NOI_MONGODB_ATLAS>
PORT=5000
```

Thay `<CHUOI_KET_NOI_MONGODB_ATLAS>` bang chuoi ket noi thuc te trong moi truong rieng.

Chay Backend:

```bash
node server.js
```

Kiem tra Backend:

```text
http://localhost:5000/health
http://localhost:5000/api/foods
```

### 2. Cai dat Frontend

Mo Terminal moi tai thu muc goc du an:

```bash
cd frontend
npm install
npm run dev
```

Truy cap dia chi Frontend do Vite hien thi.

Dia chi thuong dung:

```text
http://localhost:5173
```

Frontend can ket noi duoc voi Backend de hien thi va quan ly du lieu mon an.

### 3. Bao mat
- Khong commit file `.env` len GitHub.
- Khong cong khai mat khau MongoDB Atlas.
- Khong dua access token vao ma nguon.
- Su dung bien moi truong de quan ly thong tin ket noi.

## Cau 1 - Tao repository GitHub

GitHub Repository:

https://github.com/s236126-ux/236126_LeGiaHuy

Repository duoc dat o che do Public.

Cau truc du an gom hai thu muc:
- frontend
- backend

Du an co file README.md va .gitignore.

Ma nguon duoc quan ly bang Git, commit va push len GitHub.

## Cau 2 - Tao co so du lieu MongoDB Atlas

Cluster: Cluster0

Database: 236126_LeGiaHuy

Collection: foods

### Cau truc du lieu mon an

Cac truong du lieu:
- foodId: Ma mon an
- name: Ten mon an
- category: Loai mon an
- cuisine: Am thuc hoac vung mien
- ingredients: Danh sach nguyen lieu
- price: Gia ban
- quantity: So luong
- description: Mo ta
- imageUrl: Duong dan hinh anh neu co

### Du lieu mau

| Ma mon | Ten mon | Loai mon | Vung mien | Gia | So luong |
|---|---|---|---|---:|---:|
| F001 | Pho bo | Mon nuoc | Viet Nam | 45000 | 20 |
| F002 | Com tam suon | Mon com | Mien Nam | 40000 | 25 |
| F003 | Bun bo Hue | Mon nuoc | Mien Trung | 50000 | 15 |

MongoDB Atlas duoc ket noi voi Backend qua bien moi truong MONGODB_URI.

Khong luu thong tin xac thuc trong repository cong khai.

## Cau 3 - Xay dung Backend REST API

Backend su dung Node.js, Express va Mongoose de ket noi MongoDB Atlas.

### Danh sach API

| Phuong thuc | Endpoint | Chuc nang |
|---|---|---|
| GET | /api/foods | Lay danh sach mon an |
| GET | /api/foods/:id | Xem chi tiet mon an |
| POST | /api/foods | Them mon an |
| PUT | /api/foods/:id | Cap nhat mon an |
| DELETE | /api/foods/:id | Xoa mon an |
| GET | /api/foods?search=pho | Tim kiem mon an |
| GET | /health | Kiem tra Backend |

### Yeu cau xu ly
- Tim kiem theo ten mon an, loai mon hoac vung mien.
- Kiem tra du lieu dau vao khi them va sua.
- Khong cho phep trung foodId.
- Xu ly truong hop mon an khong ton tai.
- Xu ly du lieu khong hop le va loi ket noi.
- Tra ve JSON va HTTP status phu hop.
- Su dung bien moi truong MONGODB_URI va PORT.

## Cau 4 - Xay dung Frontend React

Frontend su dung React va Vite.

Cac chuc nang:
- Hien thi danh sach mon an
- Xem chi tiet mon an
- Them mon an
- Cap nhat mon an
- Xoa mon an
- Tim kiem mon an
- Hien thi trang thai dang tai
- Hien thi thong bao loi va ket qua thao tac

Frontend goi REST API cua Backend de quan ly du lieu.

## Cau 5 - Docker Backend

### Docker Hub

https://hub.docker.com/r/lehuy7940/236126_legiahuy-backend

### Docker Image

```text
lehuy7940/236126_legiahuy-backend:1.0
```

### Build Backend

Chay tu thu muc goc du an:

```bash
docker build -t lehuy7940/236126_legiahuy-backend:1.0 ./backend
```

### Run Backend

```bash
docker run -d \
  --name foods-backend-test \
  -p 5001:5000 \
  --env-file backend/.env \
  lehuy7940/236126_legiahuy-backend:1.0
```

### Kiem tra Backend

```bash
curl http://localhost:5001/health
```

### Docker Push

```bash
docker push lehuy7940/236126_legiahuy-backend:1.0
```

Khong nhung file .env hoac mat khau vao Docker image.

## Cau 6 - Docker Frontend

### Docker Hub

https://hub.docker.com/r/lehuy7940/236126_legiahuy-frontend

### Docker Image ban dau

```text
lehuy7940/236126_legiahuy-frontend:1.0
```

### Build Frontend

```bash
docker build -t lehuy7940/236126_legiahuy-frontend:1.0 ./frontend
```

### Run Frontend

Sau khi Backend Docker dang chay tai cong 5001:

```bash
docker run -d \
  --name foods-frontend-test \
  --add-host=host.docker.internal:host-gateway \
  -e BACKEND_URL=http://host.docker.internal:5001 \
  -p 8080:80 \
  lehuy7940/236126_legiahuy-frontend:1.0
```

### Kiem tra

Frontend:

http://localhost:8080

Backend API thong qua Nginx:

http://localhost:8080/api/foods

### Docker Push

```bash
docker push lehuy7940/236126_legiahuy-frontend:1.0
```

### Ghi chu
- Frontend su dung React va Vite.
- Nginx phuc vu giao dien va proxy request API.
- BACKEND_URL duoc cau hinh bang bien moi truong.
- Image 1.0 la phien ban da thuc hien tai Cau 6.
- Image 1.1 duoc cap nhat sau khi ket noi Render Backend.

## Cau 7 - Trien khai Frontend tren Render

Ten dich vu:

web-236126

Frontend URL:

https://web-236126.onrender.com

Region: Singapore

Compute: Free

Docker Image ban dau:

```text
lehuy7940/236126_legiahuy-frontend:1.0
```

Frontend da duoc trien khai thanh cong tren Render.

Sau khi hoan thanh Cau 8, Frontend duoc cap nhat len Docker Image 1.1 de ket noi Backend qua HTTPS.

## Cau 8 - Trien khai Backend Render

Ten dich vu:

api-236126

### Backend URL

https://api-236126.onrender.com

### Backend Health

https://api-236126.onrender.com/health

### Backend Foods API

https://api-236126.onrender.com/api/foods

### Frontend URL

https://web-236126.onrender.com

### Docker Backend

```text
lehuy7940/236126_legiahuy-backend:1.0
```

### Docker Frontend dang su dung

```text
lehuy7940/236126_legiahuy-frontend:1.1
```

### Cau hinh

Backend PORT: 10000

Frontend PORT: 80

Frontend:
BACKEND_URL=https://api-236126.onrender.com

Backend:
- MONGODB_URI: Chuoi ket noi MongoDB Atlas
- PORT: 10000

Nginx chuyen tiep request `/api/` tu Frontend sang Backend.

### Kiem tra Backend

Truy cap:

https://api-236126.onrender.com/health

Ket qua:

```json
{
  "status": "OK",
  "database": "connected"
}
```

API danh sach:

https://api-236126.onrender.com/api/foods

Ket qua: Tra ve danh sach 3 mon an tu MongoDB Atlas.

## Cau 9 - Kiem tra tong the va hoan thien bai nop

### Link_GitHub

https://github.com/s236126-ux/236126_LeGiaHuy

### Link_Docker_Backend

https://hub.docker.com/r/lehuy7940/236126_legiahuy-backend

### Link_Docker_Frontend

https://hub.docker.com/r/lehuy7940/236126_legiahuy-frontend

### Link_Render_App

https://web-236126.onrender.com

### Link_Render_API

https://api-236126.onrender.com/api/foods

### Link_Data_MongoDB

Cluster: Cluster0

Database: 236126_LeGiaHuy

Collection: foods

MongoDB URI duoc cau hinh trong bien moi truong MONGODB_URI, khong cong khai thong tin xac thuc tren GitHub.

### Ket qua kiem tra da xac nhan
- GitHub Repository Public
- Co it nhat 9 commit theo noi dung de thi
- Docker Backend Image 1.0 da push len Docker Hub
- Docker Frontend Image 1.1 da push len Docker Hub
- Render Frontend da hoat dong
- Frontend hien thi 3 mon an
- Backend Health tra ve status OK
- Backend ket noi MongoDB Atlas thanh cong
- Backend API tra ve danh sach 3 mon an
- MongoDB Atlas co 3 documents trong foods
- Chuc nang xoa mon an da kiem tra thanh cong

### Bao mat
- Khong commit mat khau MongoDB.
- Khong commit file .env.
- Khong cong khai access token.
- Su dung bien moi truong de cau hinh dich vu.
