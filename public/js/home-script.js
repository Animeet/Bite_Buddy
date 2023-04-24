
function directRegister(e) {
  e.preventDefault();
  console.log('hello')
  window.location.pathname = '/register'
}

$('#userregpage').submit(directRegister);
$('#busregpage').submit(directRegister);
