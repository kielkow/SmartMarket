function buildTable(){
  fetch("http://localhost:3333/users")
  .then((resp) => resp.json())
  .then(users => {
    const tableUsers = document.getElementById('table-users')

    users.forEach(user => {
      const row = tableUsers.insertRow(0);
      
      const cellId = row.insertCell(0);
      const cellName = row.insertCell(1);
      const cellEmail = row.insertCell(2);
      const cellProvider = row.insertCell(3);
      const cellCreated = row.insertCell(4);
      const cellUpdated = row.insertCell(5);
      
      cellId.innerHTML = user.id;
      cellName.innerHTML = user.name;
      cellEmail.innerHTML = user.email;
      cellProvider.innerHTML = user.provider ? 'YES' : 'NO';
      cellCreated.innerHTML = new Date(user.createdAt).toLocaleString();
      cellUpdated.innerHTML = new Date(user.updatedAt).toLocaleString();
    });

    const row = tableUsers.insertRow(0);
      
    const cellId = row.insertCell(0);
    const cellName = row.insertCell(1);
    const cellEmail = row.insertCell(2);
    const cellProvider = row.insertCell(3);
    const cellCreated = row.insertCell(4);
    const cellUpdated = row.insertCell(5);
    
    cellId.innerHTML = 'ID';
    cellName.innerHTML = 'NAME';
    cellEmail.innerHTML = 'E-MAIL';
    cellProvider.innerHTML = 'PROVIDER';
    cellCreated.innerHTML = 'CREATED';
    cellUpdated.innerHTML = 'UPDATED';
  })
  .catch(function(error) {
    console.log(error);
  }); 
}

function handleSubmit(){
  document.getElementById("error").style.display = "none";
  document.getElementById("success").style.display = "none";
  
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
  
  fetch('http://localhost:3333/users', {
  headers: { "Content-Type": "application/json; charset=utf-8" },
  method: 'POST',
  body: JSON.stringify({ name: newRegister.name, email: newRegister.email, password: newRegister.password })
}).then(
  function(data) {
    if(data.status !== 200) {
      document.getElementById("error").style.display = "block";
      return;
    }
    
    document.getElementById("success").style.display = "block";
  }
  );
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
  
  fetch('http://localhost:3333/sessions', {
  headers: { "Content-Type": "application/json; charset=utf-8" },
  method: 'POST',
  body: JSON.stringify(user)
}).then(
  function(data) {
    if(data.status !== 200) {
      document.getElementById("error").style.display = "block";
      return;
    }
    
    location.replace("../Home/index.html")
  }
  )
  
}