let removerButtons = document.querySelectorAll(".btn-danger");
let inputs = document.querySelectorAll(".cart-quantity-input");
let addToCartButtons = document.querySelectorAll(".shop-item-button");
// let names = document.querySelector(".cart-item-title");
// let nameeee = document.querySelector(".cart-item-title");
// console.log(nameeee);

for ( let i =0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener('click', addToCart)
}




for ( let  i = 0; i < removerButtons.length; i++) {
    removerButtons[i].addEventListener ('click', function(event) {
        event.target.parentElement.parentElement.remove();
        updateTotalPrice();
    })
}

for ( let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener ('change', function(event) {
        if (isNaN(event.target.value) || event.target.value <= 0) {
            event.target.value = 1;
        }else {
            updateTotalPrice();
        }
    })
}

function addToCart(event) {
    let cartRow = event.target.parentElement.parentElement;
    let name = cartRow.querySelector(".shop-item-title").innerHTML;
    let imgSrc = cartRow.querySelector(".shop-item-image").src;
    let price = cartRow.querySelector(".shop-item-price").innerHTML;
    let nameeee = document.querySelectorAll(".cart-item-title");
    // console.log(nameeee);
    // console.log(imgSrc);
    // console.log(name);
    // console.log(price);
    
    // console.log(name);
    for ( let j = 0; j < nameeee.length; j++) {
        if (nameeee[j].innerHTML == name) {
            alert("This item is already added in Cart!");
            return;
        }
    }

     createRow(name, imgSrc, price);
    
    

}

function createRow(name, imgSrc, price) {
    let newCartRow = document.createElement('div');
    newCartRow.classList.add('cart-row');
    newCartRow.innerHTML = `
    <div class="cart-item cart-column">
        <img src="${imgSrc}" alt="" class="cart-item-image" width="100" height="100">
        <span class="cart-item-title">${name}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input type="number" class="cart-quantity-input" value="1">
        <button class="btn btn-danger">REMOVE</button>
    </div>
    `;
    document.querySelector(".cart-items").append(newCartRow);
    updateTotalPrice();
    newCartRow.querySelector(".btn-danger").addEventListener('click', function(event) {
        
            event.target.parentElement.parentElement.remove();
            updateTotalPrice();
        
    } )

    newCartRow.querySelector(".cart-quantity-input").addEventListener('change', function(event) {
        if (isNaN(event.target.value) || event.target.value <= 0) {
            event.target.value = 1;
        }else {
            updateTotalPrice();
        }

    })
}

function updateTotalPrice() {
    let items = document.querySelectorAll(".cart-row");
    let sum = 0
    for ( let i = 1; i < items.length; i++) {
        let cartPriceText = items[i].querySelector(".cart-price").innerHTML;
        let cartPrice = parseFloat(cartPriceText.replace('$',''));
        let inputBoxValue = items[i].querySelector(".cart-quantity-input").value;
        sum += cartPrice * inputBoxValue;
        sum = (Math.round(sum * 100))/100;
        document.querySelector(".cart-total-price").innerText = `$${sum}`;
    }
}