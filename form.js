let errors = []

function register(){
    const email = document.getElementById('email')
    const name = document.getElementById('name')
    const birthDate = document.getElementById('birthdate')
    const sex = document.getElementById('sex')
    const interests = document.querySelectorAll('#interests');

    errors = []

    if(!verifyRequired(email)){
        errors.push('Falta el email')
    }

    if(!verifyRequired(name)){
        errors.push('Falta el nombre')
    }

    if(!verifyRequired(birthDate)){
        errors.push('Falta la fecha de nacimiento')
    }

    if (!verifyAge(birthDate.value)){
        errors.push('Usted debe ser mayor de edad para poder registrarse')
    }

    if(!verifyRequired(sex)){
        errors.push('Falta el sexo')
    }

    if(!verifyRequiredInterests(interests)){
        errors.push('Debe seleccionar por lo menos una categoría de interés')
    }
    
    if(errors.length > 0){
        setDialog()
        openDialog()
        return
    }

    const request = {
        name: name.value,
        email: email.value,
        birthdate: birthDate.value,
        sex: sex.value,
        interests: Array.from(interests).filter(interest => interest.checked).map(i=>i.value)
    }

    users.push(request)
    listUsers()
    fetch('http://localhost/api-php/',{
            method:'POST', body: JSON.stringify(request)} )
        .then(res => result = res.json())
        .then(data => {
            phpUsers = data
            console.log(phpUsers)
        })
        .catch(err=>console.log(err))
    
}

function verifyRequired(element){
    if(element.value == ''){
        element.setAttribute('class', 'required-failed')
        return false;
    }
    element.removeAttribute('class')
    return true;
}

function verifyRequiredInterests(interests){
    let result = false
    interests.forEach(interest => {
        if (interest.checked) {
            result = true}
    })
    return result
}

function verifyAge(stringbirthDate) {
    const birthDate = new Date(stringbirthDate)
    const now = new Date()
    const enlapsedTime = now - birthDate 
    const age = enlapsedTime / (1000 * 60 * 60 * 24 * 365.25)
    if (age < 18){
        return false;
    }    
    return true;
}


function setDialog(){
    html = '<ol>'
    errors.forEach(error => {
        html += '<li>' + error + '</li>'
    })
    html += '</ol>'
    const dialogForm = document.querySelector('.dialog-message')
    dialogForm.innerHTML = html
}

function openDialog(){
    const dialog = document.getElementById('dialog')
    dialog.setAttribute('style', 'display:flex')
}

function closeDialog(){
    const dialog = document.getElementById('dialog')
    dialog.setAttribute('style', 'display:none')
}
