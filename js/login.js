var urlAPI = 'http://localhost:3000'


const isLoggedIn = () => {
  var userData = window.sessionStorage.getItem('userData')
  if(JSON.parse(userData) !== null){
    window.location.replace("../pages/home.html");
  }
}


const onLogin = () => {
  var email = document.getElementById('email').value
  var password = document.getElementById('password').value
  if(email && password){
    fetch(`${urlAPI}/users?email=${email}&password=${password}`)
    .then(res => res.json())
    .then(data => {
      if(data.length > 0){
        sessionStorage.setItem('userData', JSON.stringify({fullName: data[0].fullName, profilePic: data[0].profile_pic, role: data[0].role}))
        window.location.replace("../pages/home.html");
      }else{
        alert('Email or password incorrect, please try again!')
      }
    })
  }else{
    alert('Please fill in all the inputs!')
  }
}

isLoggedIn()

document.getElementById('email').addEventListener('keyup', (e) => {
  if(e.code == 'Enter'){
    onLogin()
  }
})

document.getElementById('password').addEventListener('keyup', (e) => {
  if(e.code == 'Enter'){
    onLogin()
  }
})

