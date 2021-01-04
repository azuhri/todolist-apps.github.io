const data = document.querySelector(".data")

function Mahasiswa( nama, prodi, semester){
    this.nama = nama;
    this.prodi = prodi
    this.semester = semester
}

const azis = new Mahasiswa(`Azis Zuhri Pratomo`,`Teknologi Informasi`,`1`);
const ajeng = new Mahasiswa(`Ajeng Putri Maulana`,`Matematika Murni`, `1`)

console.log(Mahasiswa);

var dataAzis = Array.from(azis).fill( nama => nama )

