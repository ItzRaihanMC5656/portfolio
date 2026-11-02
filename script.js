let selected = 0
let sectionSelected = 0
let selectedProject = 0
const links = document.querySelectorAll('nav ul li a');
const sections = document.querySelectorAll('main section');
const selector = document.getElementById('selector');
const navButtonMobile = document.getElementById('nav-button-mobile');
const header = document.querySelector('header');
const nav = document.querySelector('nav');
const toollist = document.getElementById("toollist")
const mobileScreenExit = document.getElementById("mobile-screen-exit")
const projectList = document.getElementById("project-list")
const projectImagesShower = document.getElementById("project-images-shower")
const projectImagesSlider = document.getElementById("project-images-slider")
const projectImageNavPrev = document.getElementById("prev-image")
const projectImageNavNext = document.getElementById("next-image")

const tools = [
    {nama: 'PHP', range: 70, bgcolor: '#777BB3', color: '#222222'}, 
    {nama: 'JavaScript', range: 60, bgcolor: '#F0DB4F', color: '#222222'},
    {nama: 'TypeScript', range: 5, bgcolor: '#3178C6', color: '#222222'},
    {nama: 'Python', range: 50, bgcolor: '#306998', color: '#FFD43B'},
    {nama: 'React', range: 30, bgcolor: '#61DBFB', color: '#222222'},
    {nama: 'TailwindCSS', range: 60, bgcolor: '#06B6D4', color: '#222222'}
]

const rangeColor = [
    {bg: '#FF0000', color: '#B81D13'},
    {bg: '#FFFF00', color: '#FFB302'},
    {bg: '#008000', color: '#00E200'}
]

const projects = [
    {nama: 'Project 1', desc: 'Description of Project 1', images: ['project1.jpg', 'project2.jpg', 'project3.jpg']},
    {nama: 'Project 2', desc: 'Description of Project 2', images: ['project1.jpg', 'project1.jpg', 'project1.jpg']},
    {nama: 'Project 3', desc: 'Description of Project 3', images: ['project1.jpg', 'project1.jpg', 'project1.jpg']},
    {nama: 'Project 1', desc: 'Description of Project 1', images: ['project1.jpg', 'project1.jpg', 'project1.jpg']},
    {nama: 'Project 2', desc: 'Description of Project 2', images: ['project1.jpg', 'project1.jpg', 'project1.jpg']},
    {nama: 'Project 3', desc: 'Description of Project 3', images: ['project1.jpg', 'project1.jpg', 'project1.jpg']}
]

tools.forEach((tool) => {
    let p = document.createElement('p')
    p.innerHTML = tool.nama + " "
    p.style.backgroundColor = tool.bgcolor
    p.style.color = tool.color
    let range = document.createElement('span')
    range.innerHTML = tool.range + "%"
    range.style.backgroundColor = tool.range > 60 ? rangeColor[2].bg : tool.range > 40 ? rangeColor[1].bg : rangeColor[0].bg 
    range.style.color = tool.range > 60 ? rangeColor[2].color : tool.range > 40 ? rangeColor[1].color : rangeColor[0].color
    range.classList.add("range")
    p.classList.add("tools")
    p.appendChild(range)
    toollist.appendChild(p)
})

projects.forEach((project, id) => {
    let li = document.createElement('li')
    let title = document.createElement('p')
    title.textContent = project.nama
    let p = document.createElement('p')
    p.textContent = project.desc
    li.appendChild(title)
    li.appendChild(p)
    li.addEventListener('click', () => {
        selectedProject = id
        openImageSlider()
    })
    projectList.appendChild(li)
})

projectImagesShower.addEventListener('click', (e) => {
    if(e.target == projectImagesShower){
        projectImagesShower.style.display = 'none'
    }  
})

function openImageSlider() {
    projectImagesShower.style.display = "block";
}

projectImageNavNext.addEventListener('click', () => {
    let currentImage = document.getElementById("project-image")
    let currentIndex = projects[selectedProject].images.indexOf(currentImage.src.split('/').pop())
    let nextIndex = (currentIndex + 1) % projects[selectedProject].images.length
    currentImage.src = "asset/projects/" + projects[selectedProject].images[nextIndex]
})

projectImageNavPrev.addEventListener('click', () => {
    let currentImage = document.getElementById("project-image")
    let currentIndex = projects[selectedProject].images.indexOf(currentImage.src.split('/').pop())
    let prevIndex = (currentIndex - 1) < 0 ? (projects[selectedProject].images.length - 1) : (currentIndex - 1)
    currentImage.src = "asset/projects/" + projects[selectedProject].images[prevIndex]
})

function initLoad() {
    init();
}

function onResize() {
    init(true);
}

function init(resize = false) {
    setTimeout(() => {
        selector.style.left = `${links[selected].offsetLeft - 20}px`;
        selector.style.top = `${links[selected].offsetTop - 2}px`;
    }, resize ? (window.innerWidth > 600 ? 0 : 300) : 0);
    if(window.innerWidth > 600) {
        nav.style.display = 'block';
        nav.style.transform = 'translateX(0) translateY(10px)';
        mobileScreenExit.style.display = 'none';
    }
}

links.forEach((link, index) => {
    link.addEventListener('click', (event) => {
        if(index !== selected) {
            selected = index;
            sectionSelected = selected;
            sections.forEach((section, i) => {
                if(i === selected) {
                    section.classList.add('selected');
                } else {
                    section.classList.remove('selected');
                }
            });
            changeSelector(index);
            if(window.innerWidth <= 600) setNav();
        }
    });
})

function changeSelector(target) {
    selector.textContent = links[target].textContent;
    selector.style.left = `${links[target].offsetLeft - 20}px`;
    selector.style.top = `${links[target].offsetTop - 2}px`;
}

navButtonMobile.addEventListener('click', () => {
    setNav();
});

mobileScreenExit.addEventListener('click', () => {
    setNav();
});

function setNav(){
    if(nav.style.display === 'block') {
        nav.style.transform = 'translateX(100%) translateY(10px)';
        setTimeout(() => {
            nav.style.display = 'none';
            mobileScreenExit.style.display = 'none';
        }, 300);
        navButtonMobile.textContent = '=';
    } else {
        nav.style.display = 'block';
        mobileScreenExit.style.display = 'block';
        setTimeout(() => {
            nav.style.transform = 'translateX(0) translateY(10px)';
            init(true);
        }, 200);
        navButtonMobile.textContent = 'X';
    }
}

sections.forEach((section, i) => {
    section.addEventListener('click', (event) => {
        if(i !== sectionSelected){
            if(sectionSelected > -1) sections[sectionSelected].classList.remove("selected")
            section.classList.add("selected")
            sectionSelected = i
        }else{
            sections[i].classList.remove("selected")
            sectionSelected = -1
        }
        selected = sectionSelected
        changeSelector(i)
    })
})