import { menuArray } from "./data.js";

const menuSection = document.getElementById("menu-section");
const orderListSection = document.querySelector('.order-list-section')
const ordersContainer = document.getElementById("orders-container");
const completeOrderBtn = document.getElementById("complete-order-btn");
const totalPriceContainer = document.querySelector('.total-price-container')
const paymentModal = document.querySelector('.payment-modal')


let orderList = [];


document.addEventListener("DOMContentLoaded", () => {
  renderMenu();
  const plusIcons = document.querySelectorAll(".fa-plus");
  plusIcons.forEach((icon) => {
    icon.addEventListener("click", getOrderedItem);
  });

  ordersContainer.addEventListener('click',(e) => {
    if (e.target.classList.contains('fa-trash')) {
      getDeletedItem.call(e.target)
    }

    if (e.target.classList.contains('complete-order-btn')) {
      renderPaymentModal()
    }
  })
});

function getMenuHtml() {
  let htmlString = "";

  menuArray.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("menu-item");

    const emojiH2 = document.createElement("h2");
    emojiH2.classList.add("menu-item-emoji");
    emojiH2.textContent = item.emoji;

    const menuItemDetailsDiv = document.createElement("div");
    menuItemDetailsDiv.classList.add("menu-item-details");

    const menuItemName = document.createElement("h2");
    menuItemName.textContent = item.name;

    const menuItemOptions = document.createElement("h4");
    menuItemOptions.textContent = item.ingredients.join(", ");
    menuItemOptions.classList.add("menu-item-options");

    const menuItemPrice = document.createElement("h3");
    menuItemPrice.textContent = `$${item.price}`;
    menuItemPrice.classList.add("menu-item-price");

    const plusIcon = document.createElement("i");
    plusIcon.setAttribute("data-id", `${item.id}`);
    plusIcon.classList.add("fa-solid", "fa-plus", "fa-xl");

    menuItemDetailsDiv.append(menuItemName, menuItemOptions, menuItemPrice);
    itemDiv.append(emojiH2, menuItemDetailsDiv, plusIcon);

    htmlString += itemDiv.outerHTML;
  });

  return htmlString;
}

function getOrderedItem() {
  orderList.push(this.dataset.id); 
  renderOrderHtml();
}

function getDeletedItem() {
  const indexOfItem = orderList.indexOf(this.dataset.id);
  orderList.splice(indexOfItem, 1);

  renderOrderHtml();
}

function renderMenu() {
  const menuHtml = getMenuHtml();
  menuSection.innerHTML = menuHtml;
}

function renderOrderHtml() {
  let pricesArr = []
  let orderHtml = "";
  let priceContainerHtml = "";

  if (orderList.length === 0) {
    orderListSection.classList.remove('active')
    totalPriceContainer.classList.remove('active')
  }
  else {
    orderList.forEach((orderID) => {
      const selectedItem = menuArray.find((item) => item.id == orderID);
      orderHtml += `<div class="ordered-item">
      <h3 class="ordered-item-name">${selectedItem.name}</h3>
      <i class="fa-solid fa-trash fa-lg"></i>
      <h3 class="ordered-item-price">$${selectedItem.price}</h3>
    </div> `;
      pricesArr.push(selectedItem.price)
    });
  
    const totalPrice = pricesArr.reduce((total, price) => total + price)
    priceContainerHtml += `<h3 class="ordered-item-name">Total price:</h3>
    <h3 class="ordered-item-price">$${totalPrice}</h3>`
  
    orderListSection.classList.toggle('active',orderHtml !== '')
    totalPriceContainer.classList.toggle('active',orderHtml !== '')
    ordersContainer.innerHTML = orderHtml;
    totalPriceContainer.innerHTML = priceContainerHtml;
    
    completeOrderBtn.addEventListener('click',() => renderPaymentModal(totalPrice))
  }
}

function renderPaymentModal(totalPrice) {
  completeOrderBtn.disabled = true;
  const paymentForm = document.getElementById('payment-form')

  paymentForm.addEventListener('submit',(e) => {
    e.preventDefault()
    paymentModal.innerHTML = `<h2 class="center-text">$${totalPrice} successfully paid!</h2>`
  })

  paymentModal.classList.toggle('active')
}