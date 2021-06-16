var urlAPI = 'http://localhost:3000'

var sidebarToggle = false
var modalToggle = false

const sidebarHandler = () => {
  var sidebar = document.getElementById('sidebar')
  var fullName = document.getElementById('name')
  
  var bar1 = document.getElementsByClassName('burger')[0]
  var bar2 = document.getElementsByClassName('burger')[1]
  var bar3 = document.getElementsByClassName('burger')[2]
  
  var explore = document.getElementsByClassName('side-menu')[0]
  var history = document.getElementsByClassName('side-menu')[1]
  var addBooks = document.getElementsByClassName('side-menu')[2]
  
  sidebarToggle = !sidebarToggle
  
  if(sidebarToggle){
    sidebar.style.left = 0
    
    fullName.style.color = '#000000'
    explore.style.color = '#000000'
    history.style.color = '#000000'
    addBooks.style.color = '#000000'
    
    bar1.style.backgroundColor = 'red'
    bar1.style.transform = 'rotate(45deg) translate(-1.5px, -1.5px)'
    bar1.style.transformOrigin = '0 0'

    bar2.style.opacity = 0
    bar2.style.transform = 'scale(0)'

    bar3.style.backgroundColor = 'red'
    bar3.style.transform = 'rotate(-45deg)'
    bar3.style.transformOrigin = '0 100%'

  }else{
    sidebar.style.left = '-240px'
    fullName.style.color = '#FFFFFF'
    explore.style.color = '#FFFFFF'
    history.style.color = '#FFFFFF'
    addBooks.style.color = '#FFFFFF'
    
    bar1.style.backgroundColor = 'black'
    bar1.style.transform = 'rotate(0) translate(0, 0)'
    bar1.style.transformOrigin = '0 0'

    bar2.style.opacity = '100%'
    bar2.style.transform = 'scale(1)'

    bar3.style.backgroundColor = 'black'
    bar3.style.transform = 'rotate(0)'
    bar3.style.transformOrigin = '0 100%'
  }
}

const modalHandler = () => {
  var modal = document.getElementById('modal')
  modalToggle = !modalToggle
  if(modalToggle){
    modal.style.display = 'flex'
  }else{
    modal.style.display = 'none'
  }
}

const onLogout = () => {
  sessionStorage.clear()
  window.location.replace("../index.html")
}

const isLoggedIn = () => {
  var userData = JSON.parse(window.sessionStorage.getItem('userData'))
  if(userData == null){
    window.location.replace("../index.html");
  }else{
    document.getElementById('name').innerHTML = userData.fullName
    document.getElementById('profile-pic').src = userData.profilePic
    if(userData.role == 'admin'){
      document.getElementById('add-book').style.display = 'block'
    }else{
      document.getElementById('add-book').style.display = 'none'
    }
  }
}

const renderCarousel = () => {
  fetch(urlAPI + '/books')
  .then(res => res.json())
  .then(data => {
    
    data.forEach(element => {
    document.getElementById("carousel-wrapper").innerHTML += `
        <div class="carousel-cell">
          <div class="carousel-card">
            <div class="carousel-title-wrapper">
              <p class="carousel-text carousel-title">${element.title}</p>
              <p class="carousel-text">${element.author}</p>
            </div>
          </div>
        </div>
      `
    });


    data.forEach((element, index) => {
      document.getElementsByClassName("carousel-card")[index].style.backgroundImage = `url('${element.url_image}')`
    })

    // data.forEach((element, index) => {
    //   document.getElementById('book-list-wrapper').innerHTML += `
    //     <div class="book-card" onclick="window.location.href='../pages/detail.html'">
    //       <div class="card-image">
    //         <img src="${element.url_image}" alt="">
    //       </div>
    //       <div class="card-content">
    //         <p class="card-title">${element.title}</p>
    //         <p class="card-description">${element.description}</p>
    //       </div>
    //     </div>
    //   `
    // })

  })
}



isLoggedIn()
renderCarousel()
