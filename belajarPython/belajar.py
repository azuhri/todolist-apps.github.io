"""
#Variabel Angka 1
angka1 = input("masukan angka1: ")
x = int(angka1)

#Variabel Angka 2
angka2 = input("masukan angka2: ")
y = int(angka2)

confirm = input("lagi? (ya/tidak)")

if confirm == "ya":
    confirm = True
    angka3 = input("angka3: ")
    x = int(angka3)
else:
    confirm = False



kali = "kali"
kurang = "kurang"
bagi = "bagi"

pilihan = str(input("kali/bagi/kurang: "))
if pilihan == kali:
    hasil = x * y * x
elif pilihan == kurang:
    hasil = x - y - x
elif pilihan == bagi:
    hasil = x / y / x
else: 
    print("Pilihan anda tidak tersedia")

print(hasil)
"""

banyak = int(input("Berapa banyak? "))
data = 1

while data <= banyak:
    print("mantap")
    data += 1
    
