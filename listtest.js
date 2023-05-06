const listUsers = () => {
    const table = document.getElementById('table-users');
    
    users.map(user => {
        const row = document.createElement('tr');
        
        const col = document.createElement('td');
        col.innerHTML = user.name;
        
        const col1 = document.createElement('td');
        col1.innerHTML = user.email;
        
        const col2 = document.createElement('td');
        col2.innerHTML = user.birthdate;

        const colaction = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML='X';
        deleteButton.setAttribute('onClick', 'deleteItem("'+ user.email +'")');
        colaction.appendChild(deleteButton);

        row.appendChild(col);
        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(colaction);
    
        table.appendChild(row);
        
    });
}

const deleteItem = (email) => {
    const aux = users.filter(user => user.email !== email);
    users = aux;
    listUsers();

}