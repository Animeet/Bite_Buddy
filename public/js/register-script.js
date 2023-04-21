buscheck = document.getElementById('buscheck')


function registerAccount (e) {
    e.preventDefault();
    if(buscheck.checked) {
        modal.style.display = "block"
    } else {
        $.post('/auth/register/user', {
            first_name: $('#accfirstName').val(),
            last_name: $('#acclastName').val(),
            email: $('#accemail').val(),
            username: $('#accusername').val(),
            password: $('#accpassword').val()

        }).then(() => {
            window.location.pathname = '/'
        })
    }
}

$('#regform').submit(registerAccount)



// get the modal 
var modal = document.getElementById("myModal");

// get the <span> element that closes the modal
var closespan = document.getElementsByClassName("close") [0];

// when the user clicks on <span> (x). close the modal
closespan.onclick = function() {
    modal.style.display = "none";
}

// when the user clicks anywhere outside of the modal, close it 
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}