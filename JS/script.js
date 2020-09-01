function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "clear-fix") {
      x.className += " responsive";
    } else {
      x.className = "clear-fix";
    }
  }

  const controls=document.querySelector(".controls");
  const container=document.querySelector(".thumbnail-container");
  const next_icon = document.querySelector("#next_icon");
  const prev_icon = document.querySelector("#prev_icon");
  const allBox=container.children;
  var containerWidth=container.offsetWidth;
  const margin=20;
  var items=0;
  var totalItems=0;
  var jumpSlideWidth=0;
  var totalItemsWidth=0;
 const scrollToTop = document.querySelector('.scrollToTop');
 const header = document.querySelector('header');

// item setup per slide

responsive=[
{breakPoint:{width:0,item:1}}, //if width greater than 0 (1 item will show) 
{breakPoint:{width:600,item:2}}, //if width greater than 600 (2  item will show) 
{breakPoint:{width:1000,item:2}} //if width greater than 1000 (3 item will show) 
]


function load(){

   for(let i=0; i<responsive.length;i++){
       if(window.innerWidth>responsive[i].breakPoint.width){
           items=responsive[i].breakPoint.item
       }
   }
   start();
}

function start(){

   for(let i=0;i<allBox.length;i++){
        // width and margin setup of items
      if(window.innerWidth>1000){
        allBox[i].style.width=320-margin + "px";
        totalItemsWidth+=320;
      }
      else{
        allBox[i].style.width=(containerWidth/items)-margin + "px";
        totalItemsWidth+=containerWidth/items;
      }
      allBox[i].style.margin=(margin/2)+ "px";
      totalItems++;
   }



   // thumbnail-container width set up
   container.style.width=totalItemsWidth + "px";


   //for desktop set up dots as controls
    if(window.innerWidth>980){
    
        // slides controls number set up
      var allSlides=Math.ceil(totalItems/items);

      const ul=document.createElement("ul");
        for(let i=1;i<=allSlides;i++){
          const li=document.createElement("li");
              li.id=i;
              li.setAttribute("onclick","controlSlidesUsingDots(this)");
              ul.appendChild(li);
              if(i==1){
                  li.className="active";
              }
        }
      controls.appendChild(ul);
     }
  }


  // when click on numbers slide to next slide
function controlSlidesUsingDots(ele){
     // select controls children  'ul' element 
     const ul=controls.children;

     // select ul children 'li' elements;
    const li=ul[0].children;
     
     var active;

     for(let i=0;i<li.length;i++){
         if(li[i].className=="active"){
             // find who is now active
             active=i;
             // remove active class from all 'li' elements
             li[i].className="";
         }
     }
     // add active class to current slide
     ele.className="active";

     var numb=(ele.id-1)-active;
     if(window.innerWidth>1000){
      jumpSlideWidth=jumpSlideWidth+(640*numb);
      container.style.marginLeft=-jumpSlideWidth + "px";
     }
    else{
    jumpSlideWidth=jumpSlideWidth+(containerWidth*numb);
    container.style.marginLeft=-jumpSlideWidth + "px";
    }
    // jumpSlideWidth=jumpSlideWidth+(containerWidth*numb);
}

 function controlSlidesUsingArrow(ele){

   if(ele==="next" && (jumpSlideWidth<(totalItemsWidth-containerWidth))){
    jumpSlideWidth=jumpSlideWidth+containerWidth;
  }
  else if(ele==="prev" && (jumpSlideWidth>0)){
    jumpSlideWidth=jumpSlideWidth-containerWidth;
  }
  container.style.marginLeft=-jumpSlideWidth + "px";
 }


window.onscroll = ()=>{
  const toggleButton = document.querySelector('.toggleButton');
  if(window.scrollY>800){
    scrollToTop.style.display="block";
    var styles = {
      color: 'black',
      backgroundColor: 'white'
    };
    Object.assign(header.style, styles);
    toggleButton.style.fill="black";    
  }
  else{
    scrollToTop.style.display="none";
    styles = {
      color: 'white',
      backgroundColor: 'var(--bgcolor)'
    };
    Object.assign(header.style, styles);
    toggleButton.style.fill="white";    
  }
}
scrollToTop.onclick=()=>{
  window.scrollTo(0,0);
}

 window.onload=load();
window.onresize=()=>{
  location.reload();
};


/*************************************
  MODAL
 ************************************/


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
document.body.style.overflowY="hidden";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  document.body.style.overflowY="auto";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.body.style.overflowY="auto";
  }
}


/*************************************
  FORM VALIDATION
 ************************************/


// SELECTING ALL TEXT ELEMENTS
const form = document.getElementsByTagName('form')[0];
const username = document.forms['Registrationform']['username'];
const email = document.forms['Registrationform']['email'];
const password = document.forms['Registrationform']['password'];
const phone = document.getElementById('phone');
const formbtn = document.querySelector('.formbtn');

// SELECTING ALL ERROR DISPLAY ELEMENTS
const name_error = document.getElementById('name_error');
const email_error = document.getElementById('email_error');
const password_error = document.getElementById('password_error');
const phone_error = document.getElementById('phone_error');


// validation function


function nameValidator(){
  username.classList.remove("input_error","input_noError");
  const namePattern = /^[a-zA-Z]{2,20}$/;
  if (username.validity.valueMissing) {
    name_error.textContent = "*Username is required";
    username.className="invalid";
    return false;
  }
  else if (username.value.length < 3) {
    name_error.textContent = "Username must be at least 3 characters";
    username.className="invalid";
    return false;
  }
  else if (username.value.length > 20) {
    name_error.textContent = "Username must be less than 20 characters";
    username.className="invalid";
    return false;
  }
  else if(!namePattern.test(username.value)){
    name_error.textContent = "* Invalid syntax";
    username.className="invalid";
    return false;
  }
  else{
    username.className="valid";
    name_error.textContent="";
    return true;
  }

}

function emailValidator(){
  email.classList.remove("input_error","input_noError");
  if(email.validity.valueMissing) {
    email_error.textContent = "Email is required";
    email.className="invalid";
    return false;
  }
  else if (email.validity.typeMismatch) {
    email_error.textContent = "Email format worng";
    email.className="invalid";
    return false;
  }
  else if(email.validity.valid){
    email.className="valid";
    email_error.textContent = "";
    return true;
  }
  
}

function passwordValidator(){
  password.classList.remove("input_error","input_noError");
  const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  if (password.value == ""){
    password_error.textContent = "Password is required";
    password.className="invalid";
    return false;
  }
  else if(!passwordPattern.test(password.value)){
    password.className="invalid";
    if(password.value.length<6)
      password_error.textContent = "Password too short";

    else if(password.value.length>16)
      password_error.textContent = "Password too long";
    else
      password_error.textContent = "Password should contain atleast 1 number and 1 special character";
    return false;
  }

  else if(passwordPattern.test(password.value) && (password.value!="")){
    password_error.textContent = "";
    password.className="valid";
    return true;
  }

}

function phoneValidator(){
  phone.classList.remove("input_error","input_noError");
  if (isNaN(phone.value) == true) {
    phone_error.textContent = "Phone number should be numerical";
    phone.className="invalid";
    return false;
  }
  else if (phone.value.length!=10) {
    phone_error.textContent = "Phone Number should have 10 numbers";
    phone.className="invalid";
    return false;
  }
  else{
    phone_error.textContent="";
    phone.className="valid";
    return true;
  }

}

  username.addEventListener('input',nameValidator);
  email.addEventListener('input',emailValidator);
  password.addEventListener('input',passwordValidator);
  phone.addEventListener('input',phoneValidator);




// dropdown
  const dropdowninput = document.querySelector('.dropdown__menu');
  const ul=document.querySelector('.dropdown__content');
  const options = ul.children;

  function showDropDown(){
      if(ul.style.display!="block")
      ul.style.display="block";
      else
      ul.style.display="none";
  }

  function selectOption(num){
      dropdowninput.value="";
      dropdowninput.value=options[num].innerHTML;
      ul.style.display="none";
  }

  dropdowninput.addEventListener('input',filterFunction); 
  function filterFunction() {
      var filter = dropdowninput.value.toUpperCase();
      ul.style.display="block";
      if(filter.length==0){
          ul.style.display="none";
      }
      for (i = 0; i < options.length; i++) {
          txtValue = options[i].innerHTML;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
              options[i].style.display = "";
          } else {
              options[i].style.display = "none";
          }
      }
  }

formbtn.onclick = function Validate() {
  
  if(nameValidator() && emailValidator() && passwordValidator() && phoneValidator()){
    document.querySelector('.successMessage').style.display="block";
    setTimeout(()=>{
      document.querySelector('.successMessage').style.display="none";
      username.value="";
      email.value="";
      password.value="";
      phone.value="";
      dropdowninput.value=""
      const allInputs = document.querySelectorAll('.valid');
      allInputs.forEach((input)=>{
        input.className="";
      })
      // for(ele of allInputs){
      //   ele.className="";
      // }
    },2000);
  }
}