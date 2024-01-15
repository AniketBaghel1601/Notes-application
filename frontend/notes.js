const signupbtn = document.getElementById('sign-up');
const username = document.getElementById('name').value;
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

const URL = "https://notesharbour.onrender.com";


signupbtn.addEventListener('click',()=>{
    handleRegistration();
})

function handleRegistration(){
    fetch(`${URL}/users/register`,{
        method: "POST",
        headers:{
            "Content-Type": "Application/json"
        },
        body: JSON.stringify({
            name: username,
            email,
            password
        })
    }).then(res=>res.json())
      .then(data=>console.log(data))
      .catch(err=>console.log(err));
}

