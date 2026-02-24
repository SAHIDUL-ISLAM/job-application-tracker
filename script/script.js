let interViewList = [];
let rejectedList = []; 

// get value
const totalCard = document.getElementById("total-card");
const totalCardJobs = document.getElementById("total-jobs");
const interViewCard = document.getElementById("int-card");
const rejectedCard = document.getElementById("rejected-card");
const filteredSection = document.getElementById("filtered-section");

//get how many card have
const allCardSection = document.getElementById("all-card");

//event delegation 
const mainContainer = document.querySelector('main');

// count total, interview, rejected
function calculationCount(){

    totalCard.innerText = allCardSection.querySelectorAll('.m-card').length;
    totalCardJobs.innerText = allCardSection.querySelectorAll('.m-card').length;
    interViewCard.innerText = interViewList.length;
    rejectedCard.innerText = rejectedList.length;
}
calculationCount();

//all btn get
const allBtn = document.getElementById("all-btn");
const interviewBtn = document.getElementById("interview-btn");
const rejectedBtn = document.getElementById("rejected-btn");

//toggling color changer and section visibility
function toggle(id){
    allBtn.classList.remove('bg-blue-600','text-white');
    interviewBtn.classList.remove('bg-blue-600','text-white');
    rejectedBtn.classList.remove('bg-blue-600','text-white');

    allBtn.classList.add('bg-gray-200','text-black');
    interviewBtn.classList.add('bg-gray-200','text-black');
    rejectedBtn.classList.add('bg-gray-200','text-black');

    const selected = document.getElementById(id);
    selected.classList.remove('bg-gray-200','text-black');
    selected.classList.add('bg-blue-600','text-white');

    if(id == 'all-btn'){
        allCardSection.classList.remove('hidden');
        filteredSection.classList.add('hidden');
    } else {
        allCardSection.classList.add('hidden');
        filteredSection.classList.remove('hidden');

        renderFiltered(id === 'interview-btn' ? 'interview' : 'rejected');
    }
}

//main section
mainContainer.addEventListener('click', function(event){
    const target = event.target;
    const parentNode = target.closest('.m-card');
    if(!parentNode){
        return;
    }

    const title = parentNode.querySelector('.title')?.innerText || parentNode.querySelector('h1').innerText;
    const jobPosition = parentNode.querySelector('.job-position')?.innerText || parentNode.querySelector('h2').innerText;
    const salary = parentNode.querySelector('.salary')?.innerText || parentNode.querySelector('p').innerText;
    const jobDescription = parentNode.querySelector('.job-description')?.innerText || parentNode.querySelectorAll('p')[1].innerText;

    const cardInfo = { title, jobPosition, salary, jobDescription };

    // interview
    if(target.innerText === "INTERVIEW"){

        rejectedList = rejectedList.filter(item => item.title !== title);
        
        if(!interViewList.find(item => item.title === title)){
            interViewList.push(cardInfo);
    }
        
      
        const statusBtn = parentNode.querySelector('.not-btn') || parentNode.querySelector('.btn');
        statusBtn.innerText = "Interview";
        statusBtn.className = "btn bg-green-100 text-green-700 border-none";
    }

    // --- Rejected
    if(target.innerText === "REJECTED"){
     
        interViewList = interViewList.filter(item => item.title !== title);
        
        if(!rejectedList.find(item => item.title === title)){
            rejectedList.push(cardInfo);
        }
     
        const statusBtn = parentNode.querySelector('.not-btn') || parentNode.querySelector('.btn');
        statusBtn.innerText = "Rejected";
        statusBtn.className = "btn bg-red-100 text-red-700 border-none";
    }

    //remove
    if(target.closest('.fa-trash-can')){
        event.preventDefault();

        interViewList = interViewList.filter(item => item.title !== title);
        rejectedList = rejectedList.filter(item => item.title !== title);
        
        const mainCard = Array.from(allCardSection.querySelectorAll('.m-card')).find(ctitle => ctitle.querySelector('h1').innerText === title);
        if(mainCard) mainCard.remove();
        
  
        if(!filteredSection.classList.contains('hidden')){
            parentNode.remove();
        }
    }
    calculationCount();
    

    if(!filteredSection.classList.contains('hidden')){
        const currentTab = interviewBtn.classList.contains('bg-blue-600') ? 'interview' : 'rejected';
        renderFiltered(currentTab);
    }
});
//end main section

// render 
function renderFiltered(type){
    filteredSection.innerHTML = "";
    const currentList = (type === 'interview') ? interViewList : rejectedList;


    if(currentList.length === 0){
        filteredSection.innerHTML = `
            <div class="flex flex-col items-center justify-center py-20">
                <img src="job.png" alt="photo">
                <h2 class="text-2xl font-bold">No jobs available</h2>
                <p>Check back soon for new job opportunities</p>
            </div>`;
        return;
    }

    for(let item of currentList){
        let div = document.createElement('div');
        div.className = 'm-card bg-white p-6 rounded-lg flex flex-col justify-between sm:flex-row gap-5 mb-5 mx-5 shadow-sm';
        

        div.innerHTML = `
            <div class="left-section space-y-3">
                <h1 class="title text-2xl font-bold ">${item.title}</h1>
                <h2 class="job-position text-[#64748B]">${item.jobPosition}</h2>
                <p class="salary text-[#64748B]">${item.salary}</p>
                <button class="btn border-none ${type === 'interview' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                    ${type}
                </button>
                <p class="job-description text-[#64748B]">${item.jobDescription}</p>
                <div class="btns flex gap-4">
                    <button class="btn border-green-500 border-[2px] text-green-500">INTERVIEW</button>
                    <button class="btn border-red-500 border-[2px] text-red-500">REJECTED</button>
                </div>
            </div>
            <div class="right text-[#64748B]">
                <a href="#" class="border rounded-full p-2 hover:bg-red-600 hover:text-white transition-all"><i class="fa-regular fa-trash-can"></i></a>
            </div>`;
        filteredSection.appendChild(div);
    }
}