# Mini Project Backend in Express

## Deskripsi
Mini Project Backend yang didalamnya Berisi API untuk CRUD database dengan JWT(JsonWebToken) untuk mengidentifikasi akun yang login dan role dari akun tersebut apakah User atau Admin  

1. Install Npm (Node Package Manager)
```
npm install
```

2. Run Program 
```
npm start
```
3. Memakai Program
```
Pakai Postman untuk menjalankan Program
```

## Stack
- Node.js
- Express.js
- Sequelize (ORM)
- PostgreSQL (Database)

## Fungsional

* Jalankan program menggunakan Postman

* akses `localhost:3000/admin/register` untuk membuat akun dengan role admin

* akses `localhost:3000/register` untuk membuat akun dengan role User

* akses `localhost:3000/login` lalu masukan username dan password yang telah didaftarkan, setelah login berhasil maka akan mendapatkan Token untuk melakukan Read, Update dan Delete akun

* akses `localhost:3000/infoUser` dengan memasukan Token yang didapatkan ketika Login di Header lalu setelah mengakses url tersebut akan mendapatkan informasi dari akun tersebut beserta rolenya

* akses `localhost:3000/update` dengan memasukan Token yang didapatkan ketika Login di Header, maka akan dapat merubah informasi dari akun yang digunakan

* akses `localhost:3000/delet` dengan memasukan Token yang didapatkan ketika Login di Header, maka akan dapat menghapus akun yang sedang digunakan

* akses alamat `https://project-apicrud.herokuapp.com` untuk menjalankan program secara online
