
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    var db = firebase.database();
    var dlist = db.ref('databases');

    
    
    const dataTanggal = document.querySelector('.tanggal input');
    const dataList = document.querySelector('.list input');
    const submitBtn = document.querySelector('.list button');
    const buttonAdd = document.querySelector('.buttonAdd')

    var d = new Date();
    var t = d.getTime();
    var counter = t;

    var click = 0;
    submitBtn.addEventListener('click', function(e) {
        // e.preventDefault();
        var tanggal = dataTanggal.value;
        var list = dataList.value;

        createData(tanggal, list)     
                                                                             // var uid = dlist.child('data').push().key;
                                                                            // dlist.push().set({
                                                                            //     "tanggal": tanggal,
                                                                            //     "aktifitas": list,
                                                                            //     "uid": uid
                                                                            // });

        dataTanggal.value = ""
        dataList.value = ""
                                                                            // console.log(click)
    })

    function createData(waktu, daftarKegiatan){
        counter += 1;
        console.log(counter);
        let data = {
            id: counter,
            waktu: waktu,
            kegiatan: daftarKegiatan
        }

        let db = firebase.database().ref("databases/" + counter);
        db.set(data); 

    }

    dlist.on('child_removed', function() {
        alert("Database Telah Terhapus")
        location.reload();
    })

    dlist.on('child_changed', function() {
        // alert("Data telah terganti");
        // location.reload();
    })


    const todo = document.querySelector('.todo');
    dlist.on('child_added', function(snapshot){
        // alert( snapshot.val().waktu + "-" + snapshot.val().kegiatan )
        var html = `<li class="tgl"><p>${snapshot.val().waktu}</p><button class="del">Hapus</button>
        <button class="update">Ubah</button></li>`;
        var html2 = `<li class="todoList">${snapshot.val().kegiatan}</li>`;

        todo.innerHTML += html
        todo.innerHTML += html2
    });

    

    const labelTgl = document.querySelector('#label-tgl');
    const inputTgl = document.querySelector('#tgl');
    inputTgl.addEventListener('focus', function() {
        labelTgl.classList.add("notNull")    
    
    });
    
    inputTgl.addEventListener('focusout', function() {
        if( inputTgl.value == ""){
            labelTgl.classList.remove("notNull")    
            
        }
    });
    
    let arrData = [];
    let arrDataTgl = [];
    let arrDataTodo = [];
    
    
    todo.addEventListener("mouseenter", function(){
        for (let i = 0; i <= document.querySelectorAll(".todo .tgl").length - 1; i++) {
            document.querySelectorAll(".todo .tgl")[i].addEventListener("mouseenter",function(){
                document.querySelectorAll(".todo .del")[i].classList.add("visible");
                document.querySelectorAll(".todo .update")[i].classList.add("visible")

            })
            document.querySelectorAll(".update")[i].addEventListener("click", function(){
                // todo.style.backgroundColor = "red";
                const listTgl = document.querySelectorAll(".tgl");
                const listTodo = document.querySelectorAll(".todoList");

                var daftarTgl = [];
                var daftarTodo = [];
                dlist.on("value", function(e) {
                    e.forEach( item => {
                        daftarTgl.push(item.val().waktu)
                        daftarTodo.push(item.val().kegiatan)

                    })
                })

                // console.log(daftarTgl[i]);
                // console.log(daftarTodo[i]);


                for (let z = 0; z <= listTgl.length - 1; z++) {
                    let listTanggal = daftarTgl[i];
                    document.getElementById("upTgl").value = listTanggal;
                    
                };
                for (let c = 0; c <= listTodo.length - 1; c++) {
                    let listtodoList = daftarTodo[i];
                    document.getElementById("upTodo").value = listtodoList;
                };


                const upData = document.querySelector(".updateData");
                upData.classList.add("visible")

                const closeUpdate = document.querySelector(".back i")
                closeUpdate.addEventListener("click", function(){
                    upData.classList.remove("visible")
                })

                const tSave = document.querySelector('#save');
                tSave.addEventListener('click', function() {
                    let id = [];

                    dlist.on("value", function(e) {
                        e.forEach( item => {
                            id.push(item.val().id);
                        })
                    })                                                     // document.body.style.backgroundColor = "red";
                    
                    // console.log(id[i])
                    
                    var time = id[i] + "/waktu";
                    var giat = id[i] + "/kegiatan";
                    let upGiat = inputUpTodo.value;
                    let upWaktu = inputUpTgl.value; 
                    var dataUpdate = {
                        id: id[i],
                        kegiatan: upGiat,
                        waktu: upWaktu
                    }
                    let databaseUpdate = firebase.database().ref("databases/" + id[i]);
                    databaseUpdate.set(dataUpdate);

                    
                    console.log(time.toString());
                    console.log(giat.toString());

           
                    
                    
                })
 
            })
            
            
            document.querySelectorAll(".del")[i].addEventListener("click", function(){
                                                                        // document.body.style.backgroundColor = "red";
                var id = [];
                                                                        // var deleteData = firebase.database().ref(`databases/${id[i]}`)
                dlist.on("value",function(e){
                    e.forEach( item => {
                        id.push(item.val().id);
                    });
                
                dlist.child(id[i]).remove();

                })

                console.log(id[i]);



            })

        }
        for (let i = 0; i <= document.querySelectorAll(".todo .todoList").length - 1; i++) {
            document.querySelectorAll(".todo .todoList")[i].addEventListener("mouseenter",function(){
                document.querySelectorAll(".todo .del")[i].classList.add("visible");
                document.querySelectorAll(".todo .update")[i].classList.add("visible")
            })
        }
    })


    

    

  

      
    todo.addEventListener("mouseout", function(){
        for (let i = 0; i <= document.querySelectorAll(".todo .tgl").length - 1; i++) {
            document.querySelectorAll(".todo .tgl")[i].addEventListener("mouseout",function(){
                document.querySelectorAll(".todo .del")[i].classList.add("visible");
                document.querySelectorAll(".todo .update")[i].classList.add("visible")
            })
        }
        for (let i = 0; i <= document.querySelectorAll(".todo .todoList").length - 1; i++) {
            document.querySelectorAll(".todo .todoList")[i].addEventListener("mouseout",function(){
                document.querySelectorAll(".todo .del")[i].classList.remove("visible");
                document.querySelectorAll(".todo .update")[i].classList.remove("visible")
            })
        }
    })


    const labelUpTgl = document.querySelector("#lupTgl");
    const labelUpTodo = document.querySelector("#lupTodo");
    
    const inputUpTgl = document.getElementById("upTgl");
    const inputUpTodo = document.getElementById("upTodo");

    inputUpTgl.addEventListener("focus", function(){
        labelUpTgl.classList.add("bold")
        inputUpTgl.style.color = "grey";
        inputUpTgl.style.fontWeight = "bold";

    });

    inputUpTodo.addEventListener("focus", function(){
        labelUpTodo.classList.add("bold")
        inputUpTodo.style.color = "grey";
        inputUpTodo.style.fontWeight = "bold";

    })

    inputUpTgl.addEventListener("focusout", function(){
        labelUpTgl.classList.remove("bold")
        inputUpTgl.style.color = "black";
        inputUpTgl.style.fontWeight = "normal";

    });

    inputUpTodo.addEventListener("focusout", function(){
        labelUpTodo.classList.remove("bold")
        inputUpTodo.style.color = "black";
        inputUpTodo.style.fontWeight = "normal";
    })
      




// var content = ' ';
// var data = ' ';
// function kontent(isi) {
    //     content += `<li>${isi}</li>`
    // };
    
    // var coba = true;
    // while( coba == true) {
        //     var input = prompt("Masukan input: ");
//     kontent(input)
//     document.querySelector('.list').innerHTML = content;
//     var lagi = confirm("lagi? ");
//     if(lagi == false){
    //         coba = false
    //     };
    // };
    
    
    // var db = firebase.database();
    
    // var playerRef = db.ref('players');
    
    // playerRef.orderByChild('no').on('value', showData);
    
    
    // function showData(items){
        //     items.forEach(function  {
            //         data += `<li>${child.val().name}</li>`;
//         document.querySelector('.list').innerHTML = data;
//     });
//     console.log(items.val())
// };

// function showError(err){
    //     console.log(err.val())
    // }
    



    // var addList = db.ref('data/aktifitas');
    // buttonAdd.addEventListener('click', function(){
    //     var list = dataList.value;
    //     addList.push({
    //         list
    //     })
    // });





 