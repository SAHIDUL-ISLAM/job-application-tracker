let interViewList = [];
let rejectedList = [2,3,3];

// get value
const totalCard = document.getElementById("total-card");
const interViewCard = document.getElementById("int-card");
const rejectedCard = document.getElementById("rejected-card");
const filteredSection = document.getElementById("filtered-section");

//get how many card have
const allCardSection = document.getElementById("all-card");

//event daligation 
const mainContainer = document.querySelector('main');
console.log(mainContainer)


interViewList.push()
// count total, interview, rejected
function calculationCount(){
    totalCard.innerText = allCardSection.children.length;
    interViewCard.innerText = interViewList.length;
    rejectedCard.innerText = rejectedList.length;
}
calculationCount();


//all btn get
const allBtn = document.getElementById("all-btn");
const interviewBtn = document.getElementById("interview-btn");
const rejectedBtn = document.getElementById("rejected-btn");

//toggling color changer
function toggle(id){
    allBtn.classList.remove('bg-blue-600','text-white')
    interviewBtn.classList.remove('bg-gray-200','text-white')
    rejectedBtn.classList.remove('bg-gray-200','text-white')

    allBtn.classList.add('bg-gray-200','text-black')
    interviewBtn.classList.add('bg-gray-200','text-black')
    rejectedBtn.classList.add('bg-gray-200','text-black')

    const selected = document.getElementById(id);
    selected.classList.remove('bg-gray-200','text-white')
    selected.classList.add('bg-blue-600','text-white')

    if(id=='interview-btn'){
        allCardSection.classList.add('hidden');
        filteredSection.classList.remove('hidden')
    }else if(id== 'all-btn'){
        allCardSection.classList.remove('hidden');
        filteredSection.classList.add('hidden')
    }
}


//push content to the interview and rejected section
mainContainer.addEventListener('click',function(event){
    console.log(event.target.classList.contains('interview-btn'))
    if(event.target.classList.contains('interview-btn')){
    const parentNode = event.target.parentNode.parentNode.parentNode.parentNode;
    
    const title = parentNode.querySelector('.title').innerText;
    const jobPosition = parentNode.querySelector('.job-position').innerText;
    const salary = parentNode.querySelector('.salary').innerText;
    const notBtn = parentNode.querySelector('.not-btn').innerText;
    const jobDescription = parentNode.querySelector('.job-description').innerText;
    // console.log(title, jobPosition, salary, notBtn, jobDescription)

    const cardInfo = {
        title, 
        jobPosition,
        salary,
        notBtn,
        jobDescription
    }
    
    const titleExist = interViewList.find(item=> item.title == cardInfo.title);
    parentNode.querySelector('.not-btn').innerText = "Interview";
    if(!titleExist){
        interViewList.push(cardInfo);
    }
    renderInterview();
    }
})

function renderInterview(){
    filteredSection.innerHTML = "";
    for(let interview of interViewList){
        console.log(interview)
        let div = document.createElement('div');
        div.className = 'm-card bg-white p-6 rounded-lg flex flex-col justify-between sm:flex-row gap-5'
        div.innerHTML = `
        
                <div class="left-section space-y-3">
                    <h1 class="title text-2xl font-bold ">Mobile First Corp</h1>
                    <h2 class="job-position text-[#64748B]">React Native Developer</h2>
                    <p class="salary text-[#64748B]">Remote . Full-Time . $130,000 - $175,000</p>
                    <button class="not-btn btn ">NOT APPLIED</button>
                    <p class="job-description text-[#64748B]">Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.</p>
                    <div class="btns flex gap-4">
                        <button class="btn border-green-500 border-[2px] text-green-500">INTERVIEW</button>
                        <button class="btn border-red-500 border-[2px] text-red-500">REJECTED</button>
                    </div>
                </div>
                <div class="right text-[#64748B]">
                    <a href="" class="border rounded-full p-2 hover:bg-red-600 hover:border-red-600"><i class="fa-regular fa-trash-can"></i></a>
                </div>
        
        `
        filteredSection.appendChild(div);
    }
}