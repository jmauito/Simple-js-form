let users = [];

function showUsers(){
    fetch("http://localhost:9000/listusers.php", {method:"get", mode:"no-cors"} )
    .then( response => result = response.json())
    .then(data => {
        users = data
        renderUsers()
    })
    .catch(error => console.log(error))
}
function renderUsers(){
    clearTableUsers();
    const table = document.getElementById('table-users')
    for(let i=0; i<users.length; i++){
        const row = document.createElement('tr');
        row.setAttribute('class', 'row-user');
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
        
        const colDelete = document.createElement('td');
        const btnDelete = document.createElement('button');
        btnDelete.innerHTML = 'Eliminar'
        btnDelete.setAttribute('onclick'
            ,`confirmDelete('${users[i].id}','${users[i].username}','${users[i].email}', '${users[i].birthdate}', '${users[i].sex}')`);
        colDelete.appendChild(btnDelete);
        row.appendChild(colId);
        row.appendChild(colName);
        row.appendChild(colEmail);
        row.appendChild(colBirthdate);
        row.appendChild(colSex);
        row.appendChild(colUpdate);
        row.appendChild(colDelete);
        table.appendChild(row);
    }
}

function clearTableUsers(){
    const rows = document.getElementsByClassName('row-user');
    const users = [...rows];
    users.map( user => user.remove() );
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

function confirmDelete(id, name, email, birhtdate, sex){
    const idToDelete = document.getElementById('idToDelete');
    idToDelete.value = id;
    const spanName = document.getElementById('spanName');
    spanName.innerHTML = name;
    const dialogDelete = document.getElementById('frmDelete');
    dialogDelete.showModal();
}

function deleteUser(){
    const id = document.getElementById('idToDelete').value;
    fetch(`http://localhost:9000/delete.php?id=${id}`)
    .then( () => {
        alert('Registro eliminado');
        showUsers();
    }) 
    .catch( (error) => {
        alert("No se pudo eliminar");
        console.log(error);
    } )
}

