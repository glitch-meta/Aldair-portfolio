//Intersection Observer
//keeps track of what elments are visible on screen
const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            console.log(entry.target);
            entry.target.classList.add("show");  //give class name of 'show' when element is on screen
        }
        else {
            entry.target.classList.remove("show");  //remove 'show' from class name
        }
    })
}, {
    threshold: 0.18  //how much of the element is on screen before it is considered visible
})

const proj = document.querySelectorAll(".project");
proj.forEach(item => observer.observe(item));


//for grid images in workExp.html
const gridImg = document.querySelectorAll(".grid-container");
gridImg.forEach(item => observer.observe(item));



//image popup modal
//insert any image within img-modal class into the modal when clicked

function openModal(modalID){
    console.log("clicked open");

    const modal = document.getElementById(modalID);
    modal.style.display = "block";
    const modalImg = modal.querySelector(".modal-img");
    modalImg.src = event.target.src;

}

   /*
const span = document.getElementsByClassName("close")[0];
span.addEventListener("click", () => {
    imgModal.style.display = "none";
})
    */
function closeModal(modalID){
    //console.log("clicked close");

    const modal = document.getElementById(modalID);
    modal.style.display = "none";
}






//Sidebar modal
const sidebarDialog = document.getElementById("sidebar-dialog");
const sidebarContainer = document.querySelector(".sidebar-container");

function openSidebar() {
    sidebarDialog.showModal();
    sidebarContainer.classList.add('showSidebar');
    sidebarContainer.classList.remove('hideSidebar');
}

function closeSidebar() {
    console.log("clicked close");
    sidebarContainer.classList.add('hideSidebar');
    sidebarContainer.classList.remove('showSidebar');
    //sidebarDialog.close();


    // Wait for the exit animation to finish before removing the showSidebar class
    setTimeout(() => {
        sidebarDialog.close();
    }, 260); // Adjust the timeout duration to match your animation duration

}

//close dialog when clicked outside of sidebarContainer
sidebarDialog.addEventListener("click", (event) => {
    if (event.target === sidebarDialog) {
        closeSidebar();
    }
});



//form submission modal
const formDialog = document.getElementById('form-dialog');
const closeFormDialog = document.getElementById('close-form-dialog');


closeFormDialog.addEventListener('click', () => {
    formDialog.classList.remove('show'); //remove show class from #form-dialog
    formDialog.close(); 
});


   
//form submission in contact.html
const submitBtn = document.getElementById('submit-btn');
const form = document.getElementById('form');
//const result = document.getElementById('result');
const name = document.getElementById('name');
const email = document.getElementById('email');
const subject = document.getElementById('subject');

// Listen for typing events and save to sessionStorage
name.addEventListener('input', () => {
    sessionStorage.setItem('name', name.value);
});

email.addEventListener('input', () => {
    sessionStorage.setItem('email', email.value);
});

subject.addEventListener('input', () => {
    sessionStorage.setItem('subject', subject.value);
});

// Load saved values from sessionStorage on page load
window.addEventListener('load', () => {
    if (sessionStorage.getItem('name')) {
        name.value = sessionStorage.getItem('name');
    }

    if (sessionStorage.getItem('email')) {
        email.value = sessionStorage.getItem('email');
    }

    if (sessionStorage.getItem('subject')) {
        subject.value = sessionStorage.getItem('subject');
    }

});

form.addEventListener('submit', function(e) {
    const formData = new FormData(form);
    e.preventDefault();

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);


    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
            formDialog.showModal();
            //add show class to #form-dialog
            formDialog.classList.add('show'); //add show class to #form-dialog
            form.reset();
            } else {
                console.log(response);
                
            }
        })
        .catch(error => {
            console.log(error);
            
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                //result.style.display = "none";
            }, 3000);
        });
});