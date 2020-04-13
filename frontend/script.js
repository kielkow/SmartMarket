function buildTable(){
  const users = [];

  fetch('http://localhost8080/users')
    .then(response => response.json())
    .then(data => users = data);

  const tableUsers = document.getElementById('table-users')

  users.forEach(user => {
    const row = tableUsers.insertRow(0);

    const cellName = row.insertCell(0);
    const cellEmail = row.insertCell(1);
    const cellDateBirth = row.insertCell(2);
    const cellSex = row.insertCell(3);
    const cellCivilState = row.insertCell(4);
    const cellHomePhone = row.insertCell(5);
    const cellContactPhone = row.insertCell(6);
    const cellAddress = row.insertCell(7);

    cellName.innerHTML = user.name;
    cellEmail.innerHTML = user.email;
    cellDateBirth.innerHTML = user.dateBirth;
    cellSex.innerHTML = user.sex;
    cellCivilState.innerHTML = user.civilState;
    cellHomePhone.innerHTML = user.homePhone;
    cellContactPhone.innerHTML = user.contactPhone;
    cellAddress.innerHTML = user.address;
  });
}

function handleSubmit(){
  document.getElementById("error").style.display = "none";

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const dateBirth = document.getElementById('date-birth').value;
  const sex = document.getElementById('sex').value;
  const civilState = document.getElementById('civil-state').value;
  const homePhone = document.getElementById('home-phone').value;
  const contactPhone = document.getElementById('contact-phone').value;
  const address = document.getElementById('address').value;
  const message = document.getElementById('message').value;

  const newRegister = {
    name,
    email,
    password,
    dateBirth,
    sex,
    civilState,
    homePhone,
    contactPhone,
    address,
    message,
  };

  const arrayRegister = Object.values(newRegister);
  let isNull = false;
  arrayRegister.forEach(propRegister => {
    if (propRegister === null || propRegister === '' || propRegister === 'any') isNull = true;
  });
  if (isNull){
    document.getElementById("error").style.display = "block";
    return;
  }

  const checkbox = document.getElementById('accept');
  if(!checkbox.checked) {
    document.getElementById("error").style.display = "block";
    return;
  }

  fetch('http://localhost:8080/register', {
    headers: { "Content-Type": "application/json; charset=utf-8" },
    method: 'POST',
    body: JSON.stringify(newRegister)
  });
}

function login(){
  document.getElementById("error").style.display = "none";

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const user = {
    email,
    password
  }

  const arrayUser = Object.values(user);
  let isNull = false;
  arrayUser.forEach(propUser => {
    if (propUser === null || propUser === '') isNull = true;
  });
  if (isNull){
    document.getElementById("error").style.display = "block";
    return;
  }

  fetch('http://localhost:8080/signin', {
    headers: { "Content-Type": "application/json; charset=utf-8" },
    method: 'POST',
    body: JSON.stringify(user)
  });

  location.replace("../Home/index.html")
}