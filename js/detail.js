
var editModalToggle = false
var deleteModalToggle = false

const ifAdmin = () => {
  if(JSON.parse(window.sessionStorage.getItem('userData')).role == 'admin'){
    document.getElementById('manage-book').style.display = 'flex'
  }else{
    document.getElementById('manage-book').style.display = 'none'
  }

}

const modalEdit = () => {
  var editModal = document.getElementById('edit-modal')
  editModalToggle = !editModalToggle
  if(editModalToggle){
    editModal.style.display = 'flex'
  }else{
    editModal.style.display = 'none'
  }
}

const modalDelete = () => {
  var deleteModal = document.getElementById('delete-modal')
  deleteModalToggle = !deleteModalToggle
  if(deleteModalToggle){
    deleteModal.style.display = 'flex'
    setTimeout(function(){
      deleteModalToggle = !deleteModalToggle
      deleteModal.style.display = 'none'
    }, 1000);
  }
}

const isLoggedIn = () => {
  var userData = window.sessionStorage.getItem('userData')
  if(JSON.parse(userData) == null){
    window.location.replace("../index.html");
  }
}


isLoggedIn()
ifAdmin()