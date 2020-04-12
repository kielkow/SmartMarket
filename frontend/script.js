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

  fetch('http://localhost:8080', {
    headers: { "Content-Type": "application/json; charset=utf-8" },
    method: 'POST',
    body: JSON.stringify(newRegister)
  });
}