const urlAPI = 'http://localhost:3000'

const isLoggedIn = () => {
  var userData = window.sessionStorage.getItem('userData')
  if(JSON.parse(userData) !== null){
    window.location.replace("../pages/home.html");
  }
}

function onRegister(){
  // axios.post(`${urlAPI}/users`, data)
  // .then(res => {
  //   console.log(res)
  // })
  // .catch(err => console.log(err))

  var username = document.getElementById('username').value
  var fullName = document.getElementById('fullName').value
  var email = document.getElementById('email').value
  var password = document.getElementById('password').value

  if(username && fullName && email && password){
    fetch(`${urlAPI}/users?email=${email}`)
    .then(res => res.json())
    .then(data => {
      if(data.length > 0){
        alert('Email is not available, please try another email!')
      }else{
        fetch(urlAPI + '/users')
        .then(res => res.json())
        .then(data2 => {
          console.log(data2[data2.length-1].id)
          fetch(`${urlAPI}/users`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({id : data2[data2.length-1].id+1, username, fullName, email, password, profile_pic: 'https://www.pikpng.com/pngl/b/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png', role : 'user'})
          })
          .then(res => res.json())
          .then(data3 => {
            fetch(`${urlAPI}/users?email=${email}`)
            .then(res3 => res3.json())
            .then(data4 => {
              sessionStorage.setItem('userData', JSON.stringify({fullName: data4[0].fullName, profilePic: data4[0].profile_pic, role: data4[0].role}))
              window.location.replace("../pages/home.html");
            })
          })
        })
      }
    })
  }else{
    alert('Please fill in all the inputs!')
  }
}

isLoggedIn()

document.getElementById('password').addEventListener('keyup', (e) => {
  if(e.code == 'Enter'){
    onRegister()
  }
})
