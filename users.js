let users = [];


fetch("http://localhost:9000/listusers.php")
.then( response => result = response.json())
.then(data => {
    users = data
    showUsers()
})
.catch(error => console.log(error))

function showUsers(){
    const table = document.getElementById('table-users')
    for(let i=0; i<users.length; i++){
        const row = document.createElement('tr');
        const colId = document.createElement('td');
        colId.innerHTML = users[i].id;
        const colName = document.createElement('td');
        colName.innerHTML = users[i].username;
        const colEmail = document.createElement('td');
        colEmail.innerHTML = users[i].email;
        const colBirthdate = document.createElement('td');
        colBirthdate.innerHTML = users[i].birthdate;
        const colSex = document.createElement('td');
        colSex.innerHTML = users[i].sex;
        const colUpdate = document.createElement('td');
        const btnUpdate = document.createElement('button');
        btnUpdate.innerHTML = 'Actualizar'
        btnUpdate.setAttribute('onclick'
            ,`showFrmUpdate('${users[i].id}','${users[i].username}','${users[i].email}', '${users[i].birthdate}', '${users[i].sex}')`);
        colUpdate.appendChild(btnUpdate);
        row.appendChild(colId);
        row.appendChild(colName);
        row.appendChild(colEmail);
        row.appendChild(colBirthdate);
        row.appendChild(colSex);
        row.appendChild(colUpdate);
        table.appendChild(row);
    }
}

function showFrmUpdate(id, name, email, birhtdate, sex){
    const dialog = document.getElementById('frmUpdate');
    const txtId = document.getElementById('id');
    txtId.value = id;
    const txtName = document.getElementById('name');
    txtName.value = name;
    const txtEmail = document.getElementById('email');
    txtEmail.value = email;
    const txtBirthdate = document.getElementById('birthdate');
    txtBirthdate.value = birhtdate;
    const txtSex = document.getElementById('sex');
    txtSex.value = sex;
    dialog.showModal();
}

function update(){
    const id = document.getElementById('id');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const birhtdate = document.getElementById('birthdate');
    const sex = document.getElementById('sex')
    const user = {
        id: id.value,
        name: name.value,
        email: email.value,
        birthdate: birhtdate.value,
        sex: sex.value
    }
    fetch('http://localhost:9000/update.php', {method:"post", body: JSON.stringify( user )})
    .then(() => alert('Registro actualizado') )
    .catch((error) => {
        console.log(error);
        alert('Error: el registro no se actualizó');
    })
}

