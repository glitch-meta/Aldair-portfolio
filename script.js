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
    console.log('click');
    formDialog.classList.remove('show'); //remove show class from #form-dialog
    formDialog.close(); 
  });


   
//form submission in contact.html
const form = document.getElementById('form');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "2cd7579d-942a-444a-a122-dd2348909469");

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            //alert("Success! Your message has been sent.");
            formDialog.showModal();
            //add show class to #form-dialog
            formDialog.classList.add('show'); //add show class to #form-dialog
            form.reset();
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});
