import { menuArray } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    handleAddFoodBtn(e.target.dataset.add);
  } else if (e.target.id == "completeOrderBtn") {
    handleCompleteOrderBtn();
  } else if (e.target.dataset.remove) {
    handleRemoveBtn(e.target.dataset.remove);
  }
});

let ordersArray = [];
function handleAddFoodBtn(foodId) {
  let orderHtml = "";
  document.getElementById("orderSection").classList.remove("hidden");

  const addedChoise = {
    ...menuArray.filter(function (food) {
      return foodId == food.id;
    })[0],
  };
  addedChoise.uuid = uuidv4();
  ordersArray.push(addedChoise);

  console.log("handleAddFoodBtn:", ordersArray);

  ordersArray.forEach(function (food) {
    orderHtml += `
           <div class=order-section>
               
               <div id="${food.uuid}">
                   <span class="orderName large-font">${food.name}</span>
                   <button class="removeBtn" data-remove="${food.uuid}">remove</button>
                   <span class="orderPrice small-font">$${food.price}</span>
               </div>
              
           </div> `;

    const sum = ordersArray.reduce((accumulator, object) => {
      return accumulator + object.price;
    }, 0);

    document.getElementById("totalPrice").innerHTML = `Total price:<span class="tP small-font">$${sum}</span>`;
  });
  document.getElementById("orders").innerHTML = orderHtml;
}

function handleRemoveBtn(removeId) {
  ordersArray.forEach(function (food) {
    if (food.uuid == removeId) {

      let index = ordersArray.indexOf(food);
      console.log(index);
      ordersArray.splice(index, 1);

      document.getElementById(`${food.uuid}`).style.display = "none";

      console.log("handleRemoveBtn:", ordersArray);
    }
    if (ordersArray.length == 0) {
      document.getElementById("orderSection").classList.add("hidden");
    }
    const remainingSum = ordersArray.reduce((accumulator, object) => {
      return accumulator + object.price;
    }, 0);

    document.getElementById(
      "totalPrice"
    ).innerHTML = `Total price:<span class="tP small-font">$${remainingSum}</span>`;
  });
}

function handleCompleteOrderBtn() {
  document.getElementById("modalId").classList.remove("hidden");

}

const payBtn = document.getElementById("payBtn");
const cardDetailsForm = document.getElementById("card-details-form");
cardDetailsForm.addEventListener("submit", function (e) {
  e.preventDefault();
});

payBtn.addEventListener("click", function () {
  const cardFormData = new FormData(cardDetailsForm);
  const name = cardFormData.get("fullName");
  const cardNum = cardFormData.get("number");
  const ccvNum = cardFormData.get("ccv");
  if (name && cardNum && ccvNum) {
    document.getElementById("modalId").style.display = "none";
    document.getElementById("orderSection").style.display = "none";

    document.getElementById("thanks-msg").innerHTML = `
    <p class="p-msg small-font">Thanks, ${name}! Your order is on its way!</p>
    `;
  }
  render();
});

function getMenuHtml() {
  let menuHtml = ``;

  menuArray.forEach(function (food) {
    menuHtml += `
        <div class="container">
        <div class="emoji">    
        <span>${food.emoji}</span>
        </div>
                <div class="foodInfo">
                    <p class="name large-font">${food.name}</p>
                    <p class="ingredients">${food.ingredients}</p>
                    <p class="price small-font">$${food.price}</p>
                </div>
                    <div class="addBtnDiv">
                    <button id="addBtn" class="add" data-add=${food.id}>+</button>
                    </div>
                       
        </div>
     
        `;
  });
  return menuHtml;
}

function render() {
  document.getElementById("optionsMenu").innerHTML = getMenuHtml();
}
render();
