
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
