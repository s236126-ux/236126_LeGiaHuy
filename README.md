
# He thong quan ly mon an

## Thong tin sinh vien
- Ho ten: Le Gia Huy
- MSSV: 236126
- Mon hoc: Dien toan dam may

## Gioi thieu
Xay dung he thong quan ly mon an tren
nen tang dam may.

## Cong nghe
- React
- Node.js
- Express
- MongoDB Atlas
- GitHub
- Docker Hub
- Render

## Cau truc
- frontend: Giao dien React
- backend: Backend REST API

## Chuc nang
- Hien thi danh sach mon an
- Xem chi tiet mon an
- Them mon an
- Sua thong tin mon an
- Xoa mon an
- Tim kiem mon an

## Cai dat va chay
Huong dan cai dat frontend, backend va
cac bien moi truong se duoc cap nhat
khi hoan thanh cac phan tiep theo.


## Cau 5 - Docker Backend

Docker Hub:
https://hub.docker.com/r/lehuy7940/236126_legiahuy-backend

Docker image:
lehuy7940/236126_legiahuy-backend:1.0

### Build Backend
docker build -t lehuy7940/236126_legiahuy-backend:1.0 ./backend

### Run Backend
docker run -d --name foods-backend-test -p 5001:5000 --env-file backend/.env lehuy7940/236126_legiahuy-backend:1.0

### Kiem tra Backend
curl http://localhost:5001/health

### Bien moi truong
MONGODB_URI: Chuoi ket noi MongoDB Atlas
PORT: Cong Backend, mac dinh 5000

Khong dua file .env hoac mat khau len GitHub hay Docker image.


## Cau 6 - Docker Frontend

### Docker Hub
https://hub.docker.com/r/lehuy7940/236126_legiahuy-frontend

### Docker Image
lehuy7940/236126_legiahuy-frontend:1.0

### Build Frontend
docker build -t lehuy7940/236126_legiahuy-frontend:1.0 ./frontend

### Run Frontend
docker run -d \
  --name foods-frontend-test \
  --add-host=host.docker.internal:host-gateway \
  -e BACKEND_URL=http://host.docker.internal:5000 \
  -p 8080:80 \
  lehuy7940/236126_legiahuy-frontend:1.0

### Kiem tra
Frontend: http://localhost:8080

Backend API qua Nginx:
http://localhost:8080/api/foods

### Ghi chu
- Frontend su dung React va Vite.
- Nginx phuc vu giao dien va proxy API.
- BACKEND_URL duoc cau hinh khi chay container.
- Khong dua thong tin bi mat vao Docker image.


## Cau 7 - Trien khai Frontend tren Render

Ten dich vu: web-236126

Frontend URL:
https://web-236126.onrender.com

Docker Image:
lehuy7940/236126_legiahuy-frontend:1.0

Region: Singapore
Compute: Free

Trang thai: Deploy succeeded - Live

Ghi chu:
Frontend da trien khai thanh cong.
Ket noi Backend API se duoc hoan thien
sau khi trien khai Backend o Cau 8.
