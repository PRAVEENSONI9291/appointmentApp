var form = document.getElementById('form');
var appointments = document.getElementById('appointments');

form.addEventListener('submit', addToLocalStorageAndPrint);

window.addEventListener("DOMContentLoaded", fetchData);
var fetchedData;


function fetchData() {

    fetchedData = axios.get("https://crudcrud.com/api/f6ba46ce27d045da8c098d97bb5bfa92/appointmentData")
        .then((resp) => {


            for (let key in resp.data) {

                var newele = document.createElement('li');
                newele.className = 'list-group-item';
                var newele2 = document.createElement('span');
                newele2.appendChild(document.createTextNode(`${resp.data[key].name} - ${resp.data[key].email} - ${resp.data[key].phone}`));
                var newele3 = document.createElement('button');
                newele3.id = email;

                newele3.className = 'btn btn-danger btn-sm float-end delete me-1';
                newele3.appendChild(document.createTextNode('X'));

                var newele4 = document.createElement('button');


                newele4.className = 'btn btn-success btn-sm float-end edit me-1';
                newele4.appendChild(document.createTextNode('Edit'));

                newele.appendChild(newele2);
                newele.appendChild(newele3);
                newele.appendChild(newele4);


                appointments.appendChild(newele);




            }

            return resp;




        })
        .catch((err) => {
            console.log("error");
        })
}

function addToLocalStorageAndPrint(e) {
    e.preventDefault();

    var name1 = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('mobile').value;

    var emaildata = email;

    var myobj = {
        "name": name1,
        "email": email,
        "phone": phone
    }
    console.log(myobj);




    var newele = document.createElement('li');
    newele.className = 'list-group-item';
    var newele2 = document.createElement('span');
    newele2.appendChild(document.createTextNode(`${name1} - ${email} - ${phone}`));
    var newele3 = document.createElement('button');
    newele3.id = email;

    newele3.className = 'btn btn-danger btn-sm float-end delete me-1';
    newele3.appendChild(document.createTextNode('X'));

    var newele4 = document.createElement('button');


    newele4.className = 'btn btn-success btn-sm float-end edit me-1';
    newele4.appendChild(document.createTextNode('Edit'));

    newele.appendChild(newele2);
    newele.appendChild(newele3);
    newele.appendChild(newele4);

    if (email != "" && name1 != "" && phone != "") {
        console.log("before fetching api run");
        axios.get("https://crudcrud.com/api/f6ba46ce27d045da8c098d97bb5bfa92/appointmentData")
            .then((resp) => {
                console.log("before for loop in api response");

                if (resp.data.length == 0) {
                    appointments.appendChild(newele);
                    axios.post("https://crudcrud.com/api/f6ba46ce27d045da8c098d97bb5bfa92/appointmentData", myobj)
                    console.log("hello");

                }
                else {
                    for (let i = 0; i < resp.data.length; i++) {
                        console.log("inside for loop");

                        if (resp.data[i].email == emaildata) {
                            alert("This user alreay exist's")
                            i=resp.data.length;

                        }
                        else {

                            appointments.appendChild(newele);
                            axios.post("https://crudcrud.com/api/f6ba46ce27d045da8c098d97bb5bfa92/appointmentData", myobj)
                            console.log("hello");

                        }

                    }

                }




            })
    }

}

appointments.addEventListener('click', removeList);
appointments.addEventListener('click', editList);

function removeList(e) {


    if (e.target.classList.contains('delete')) {
        var list = e.target.parentElement;
        appointments.removeChild(list);

        localStorage.removeItem(e.target.id);


    }
}

function editList(e) {


    if (e.target.classList.contains('edit')) {
        var list = e.target.parentElement;


        let myobj = JSON.parse(localStorage.getItem(e.target.previousElementSibling.id));
        document.getElementById('name').value = myobj.name;
        document.getElementById('email').value = myobj.email;
        document.getElementById('mobile').value = myobj.phone;


        localStorage.removeItem(e.target.previousElementSibling.id);
        appointments.removeChild(list);


        // console.log("edit clicked");
        // console.log(e.target.previousElementSibling.id);


    }
}