// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// project variables
const projectItem = document.querySelectorAll("[data-project-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalLink = document.querySelector("[data-modal-link]");
const modalDemo = document.querySelector("[data-modal-demo]");
const modalGithub = document.querySelector("[data-modal-github]");

// modal toggle function
const projectModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < projectItem.length; i++) {

  projectItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-project-avatar]").src;
    modalImg.alt = this.querySelector("[data-project-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-project-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-project-text]").innerHTML;
    modalLink.setAttribute("href", this.querySelector("[data-project-link]").innerHTML)
    modalDemo.setAttribute("href", this.querySelector("[data-project-demo]").innerHTML)
    modalGithub.setAttribute("href", this.querySelector("[data-project-github]").innerHTML)

    projectModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", projectModalFunc);
overlay.addEventListener("click", projectModalFunc);


// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}









const portfolioURL = "https://script.google.com/macros/s/AKfycbzafPuWmelD7cjm4_2Je8QbSDtcTByijl9jntyI-7_D2JB67QLzibg5KD5SVBDVARaZ/exec";


async function fetchPortfolioData() {
  try {
    const response = await fetch(portfolioURL);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log("Fetch Error : ", err);
    throw err;
  }
}

fetchPortfolioData()
  .then(data => {
    setAboutMe(data.aboutMe);
    setSkillSet(data.skillSet);
  })
  .catch(err => {
    console.log("Error : ", err);
  });


function setAboutMe(aboutMe) {
  aboutMe.forEach(para => {
    const p = document.createElement("p");
    p.innerHTML = para;

    document.querySelector(".about-text").appendChild(p);
  });
}

function setSkillSet(skillSet) {
  skillSet.forEach(skill => {
    const ul = document.createElement("ul");
    ul.className = "skills-list content-card";
    
    const li = document.createElement("li");
    li.className = "skills-item";
    
    const div = document.createElement("div");
    div.className = "title-wrapper";
    
    const h5 = document.createElement("h5");
    h5.className = "h5";
    h5.textContent = skill;
    
    div.appendChild(h5);
    li.appendChild(div);
    ul.appendChild(li);
    
    document.querySelector(".skill").appendChild(ul);
  });
}
