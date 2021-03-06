// Burger Nav - Const variables select HTML objects
const nav = document.querySelector('.nav');
const burger = document.querySelector('.burger i');
// This definines the function
function toggleNav() {
  burger.classList.toggle('fa-bars');
  nav.classList.toggle('nav-active');
  burger.classList.toggle('fa-times');
}
// Event listerner calls the function after click event 
burger.addEventListener('click', function() {
    toggleNav();
});

// Shopping cart - This conditional statemnt checks to see if the document is loaded before trying to access different elements
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
// this function returns all elements with the relevant class names, and includes event listeners
function ready() {
    let removeCartItemButtons = document.getElementsByClassName('btn-remove')
    console.log(removeCartItemButtons)
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }
//This loop limits the quantity inputs
    let quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
// This loop is for the add to cart buttons
    let addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
}
//This funtion removes cart items 
function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}
// function for quantity input, checks (value) to see if it's a number or not
function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
 }
// adds item, images and price to cart by class name
function addToCartClicked(event) {
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}
//creates cart row/element for item to the cart items
function addItemToCart(title, price, imageSrc) {
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    //stops items in basket duplicating and gives user warning dialog
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already in your cart')
            return 
        }
}
    let cartRowContents = `
    <div class="cart-item cart-column">
    <span class="cart-item-title">${title}</span>
    <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
    </div><span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-remove" type="button">X</button>
    </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    //removes cart items after they've been added
    cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}
//Goes through every row in cart, finds the price and multiplies by the quantity, then displays in cart total
function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0]//selects very first elemnt inside of the array
    let cartRows = cartItemContainer.getElementsByClassName('cart-row')//gets all elements with cart-row class
    let total = 0
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName('cart-price')[0]
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')
        [0]
        let price = parseFloat(priceElement.innerText.replace('£', ''))
        let quantity = quantityElement.value
        total = total + (price * quantity)
    }
    //rounds total to two decimal places
    total = total = Math.round(total * 100) / 100 
    document.getElementsByClassName('cart-total-price')[0].innerText = '£' + total
}

