// for the no-button in main-page
var He_radio = document.getElementById("no-radio");
var radio_section = document.getElementById("article-18-radio-btns");
if (radio_section) {
  radio_section.onclick = function(){
    if(He_radio.checked){
        document.getElementsByClassName("document-options-section")[0].style.display = "block";
    }
    else{
        document.getElementsByClassName("document-options-section")[0].style.display = "none";
    }
  }
} 

// for the deptor step1 form in last radio buttons
var co_deptor_radio = document.getElementById("parent-deptor");
var radio_section = document.querySelector(".type-deptor-radio_tab1");
radio_section .onclick = function(){
  
     if(co_deptor_radio.checked) {
      console.log("clicked....");
        document.getElementsByClassName("deptor-attachment-parent")[0].style.display = "block";
        document.getElementsByClassName("submit-Btn")[0].innerText  = "ДОБАВИ КАТО СЪДЛЪЖНИК";
    }
    else {
      console.log("not....");
      document.getElementsByClassName("deptor-attachment-parent")[0].style.display = "none";
      document.getElementsByClassName("submit-Btn")[0].innerText  = "ДОБАВИ КАТО ДЛЪЖНИК";
    
    }
}

// for the deptor step2 form in last radio buttons
var co_deptor_radio2 = document.getElementById("co-deptor2");
var radio_section2 = document.querySelector(".type-deptor-radio2");
radio_section2.onclick = function(){
  if(co_deptor_radio2.checked) {
    
     document.getElementsByClassName("deptor-attachment2")[0].style.display = "block";
     document.getElementsByClassName("submit-Btn")[1].innerText  = "ДОБАВИ КАТО СЪДЛЪЖНИК";

 }
 else{
     // document.getElementsByClassName("document-options-section")[0].style.display = "none";
     document.getElementsByClassName("deptor-attachment2")[0].style.display = "none";
   document.getElementsByClassName("submit-Btn")[1].innerText  = "ДОБАВИ КАТО ДЛЪЖНИК";
 }
}

// for deptor Modal
// Get the modal
function openModals(modal_ID , close){
  console.log("open..." , close);
  var modal = document.getElementById(modal_ID);
// var btn = document.getElementById(button_ID);
modal.style.display = "block";
var span = document.getElementsByClassName(close)[0];


span.onclick = function() {
  // console.log("clclcllclc  ");
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
}

// for deptor modal that is for deptor tabs
var first_tab= document.getElementsByClassName("pallagram_tabs")[0];
var second_tab= document.getElementsByClassName("rectangle-tab")[0];
var first_tab_content = document.getElementsByClassName("first-tab-content")[0];
var second_tab_content = document.getElementsByClassName("second-tab-content")[0];
first_tab_content.style.display = "block";
first_tab.classList.add("selected");
first_tab.onclick = function(){
    console.log("selected....");
    first_tab_content.style.display = "block";
    second_tab_content.style.display = 'none';
    first_tab.classList.add("selected");
    second_tab.classList.remove("selected");
}
second_tab.onclick = function(){
    first_tab_content.style.display = "none";
    second_tab_content.style.display = 'block';
    first_tab.classList.remove("selected");
    second_tab.classList.add("selected");
}

// for creditor modal thats for creditor tabs
var first_tab2= document.getElementsByClassName("pallagram_tabs")[1];
var second_tab2= document.getElementsByClassName("rectangle-tab")[1];
var first_tab_content2 = document.getElementsByClassName("first-tab-content")[1];
var second_tab_content2 = document.getElementsByClassName("second-tab-content")[1];
first_tab_content2.style.display = "block";
first_tab2.classList.add("selected");
first_tab2.onclick = function(){
    console.log("selected....");
    first_tab_content2.style.display = "block";
    second_tab_content2.style.display = 'none';
    first_tab2.classList.add("selected");
    second_tab2.classList.remove("selected");
}
second_tab2.onclick = function(){
    first_tab_content2.style.display = "none";
    second_tab_content2.style.display = 'block';
    first_tab2.classList.remove("selected");
    second_tab2.classList.add("selected");
}



// Validation for the 4 modal forms
const add_deptor_form_tab1 = document.getElementById('add-deptor-form_tab1');
const add_deptor_form_tab2 = document.getElementById('add-deptor-form_tab2');
const add_creditor_form_tab1 = document.getElementById('add-creditor-form_tab1');
const add_creditor_form_tab2 = document.getElementById('add-creditor-form_tab2');

var pristine = new Pristine(add_deptor_form_tab1, {
    // class of the parent element where the error/success class is added
    classTo: 'form-input-container',
    errorClass: 'has-error',
    successClass: 'has-success',
    // class of the parent element where error text element is appended
    errorTextParent: 'form-input-container',
    // type of element to create for the error text
    errorTextTag: 'div',
    // class of the error text element
    errorTextClass: 'text-help' 
});

var radios = document.getElementsByName("type-deptor");
var deptor_gender_radios = document.getElementsByName("gendor-radios");

add_deptor_form_tab1.addEventListener('submit', function (e) {
    e.preventDefault();
    var formValid = false;
    var gender_radios = false;

    // for the deptor type (parent - child) radio buttons in tab1 add deptor modal
    var i = 0;
    while (!formValid && i < radios.length) {
        if (radios[i].checked) formValid = true;
        i++;        
    }
    // for the gender radio buttons in tab1 add deptor modal
    var y = 0;
    while (!gender_radios && i < deptor_gender_radios.length) {
      if (deptor_gender_radios[y].checked) gender_radios = true;
      y++;        
  }

    if (!formValid) {
      document.getElementById("error-radio-message").style.display="block";
    }
    if (!gender_radios) {
      document.getElementsByClassName("gender-deptor-tab1-error")[0].style.display="block";
    }
    // check if the form is valid
    var valid = pristine.validate(); // returns true or false
    if (valid) {
      add_deptor_form_tab1.submit();
    }
});

var radios2 = document.getElementsByName("type-deptor-radio_tab2");
var pristine2 = new Pristine(add_deptor_form_tab2, {
    // class of the parent element where the error/success class is added
    classTo: 'form-input-container',
    errorClass: 'has-error',
    successClass: 'has-success',
    // class of the parent element where error text element is appended
    errorTextParent: 'form-input-container',
    // type of element to create for the error text
    errorTextTag: 'div',
    // class of the error text element
    errorTextClass: 'text-help' 
});

var radios_gender = document.getElementsByName("gender_deptor_tab2");
var radios_deptor_type = document.getElementsByName("type-deptor2");

add_deptor_form_tab2.addEventListener('submit', function (e) {
    e.preventDefault();
    var formValid2 = false;
    var type_deptor_tab2 = false;

    var i = 0;
    while (!formValid2 && i < radios_gender.length) {
        if (radios_deptor_type[i].checked) formValid2 = true;
        i++;        
    }

    var y = 0;
    while (!type_deptor_tab2 && y < radios_deptor_type.length) {
        if (radios_deptor_type[y].checked) type_deptor_tab2 = true;
        y++;        
    }

    if (!formValid2) {
      document.getElementsByClassName("error_gender_deptor_radio_tab2")[0].style.display="block";
    }
    if (!type_deptor_tab2) {
      document.getElementsByClassName("error_deptor_type_radio_tab")[0].style.display="block";
    }
    // check if the form is valid
    var valid = pristine2.validate(); // returns true or false
    if (valid) {
      add_deptor_form_tab2.submit();
    }
});

var pristine3 = new Pristine(add_creditor_form_tab1, {
    // class of the parent element where the error/success class is added
    classTo: 'form-input-container',
    errorClass: 'has-error',
    successClass: 'has-success',
    // class of the parent element where error text element is appended
    errorTextParent: 'form-input-container',
    // type of element to create for the error text
    errorTextTag: 'div',
    // class of the error text element
    errorTextClass: 'text-help' 
});

var radio_gender_creditor_tab1 = document.getElementsByName("gender-creditor-tab1");

add_creditor_form_tab1.addEventListener('submit', function (e) {
    e.preventDefault();
    var formValid = false;

    var i = 0;
    while (!formValid && i < radios.length) {
        if (radio_gender_creditor_tab1[i].checked) formValid = true;
        i++;        
    }

    if (!formValid) {
      document.getElementsByClassName("gender-creditor-tab1-error")[0].style.display="block";
    }
    // check if the form is valid
    var valid = pristine3.validate(); // returns true or false
    if (valid) {
      add_creditor_form_tab1.submit();
    }
});
var pristine4 = new Pristine(add_creditor_form_tab2, {  
    // class of the parent element where the error/success class is added
    classTo: 'form-input-container',
    errorClass: 'has-error',
    successClass: 'has-success',
    // class of the parent element where error text element is appended
    errorTextParent: 'form-input-container',
    // type of element to create for the error text
    errorTextTag: 'div',
    // class of the error text element
    errorTextClass: 'text-help' 
});

var gender_creditor_tab2_radios = document.getElementsByName("gender_creditor_tab2");
var type_creditor_tab2_radios = document.getElementsByName("type-creditor2");

add_creditor_form_tab2.addEventListener('submit', function (e) {
    e.preventDefault();
    var formValid = false;
    var formValid_creditor2 = false;

    var i = 0;
    while (!formValid && i < gender_creditor_tab2_radios.length) {
        if (gender_creditor_tab2_radios[i].checked) formValid = true;
        i++;        
    }
    var y = 0;
    while (!formValid_creditor2 && y < gender_creditor_tab2_radios.length) {
        if (gender_creditor_tab2_radios[y].checked) formValid_creditor2 = true;
        y++;        
    }


    if (!formValid) {
      document.getElementsByClassName("error_creditor_gender_tab2")[0].style.display="block";
    }
    if (!formValid_creditor2) {
      document.getElementsByClassName("error_creditor_type_radio_tab")[0].style.display="block";
    }
    // check if the form is valid
    var valid = pristine4.validate(); // returns true or false
    if (valid) {
      add_creditor_form_tab2.submit();
    }
});


// for accordion
function toggleAccordion(event) {
  console.log("clickckckckck" ,   event.target.getAttribute("data-bs-target"));
  event.stopPropagation();
  var collapsable_div = event.target.getAttribute("data-bs-target");
  var collapsable = document.querySelector(collapsable_div);
  var classList = collapsable.classList;
  event.target.classList.toggle("collapsed")
  collapsable.classList.toggle("show");

  // if(classList.contains('collapse')) {
  //   // classList.replace('collapse', 'collapse.show');
  //   classList.replace('collapse', 'collapse.show');
  // } else if (classList.contains('show')) {
  //   // classList.replace('collapse.show', 'collapse');
  //   classList.remove(show);
  // }
}