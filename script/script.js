const totalCard = document.getElementById("total-card");

const allCardSection = document.getElementById("all-card");

function calculationCount(){
    totalCard.innerText = allCardSection.children.length;
}
calculationCount();