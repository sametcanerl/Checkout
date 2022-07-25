// const taxRate = 0.18;
// const shippingPrice = 15.0;

window.addEventListener("load", () => {
    calculateCartTotal()
//   localStorage.setItem("taxRate", taxRate);
//   localStorage.setItem("shippingPrice", shippingPrice);
});

let productsDiv = document.querySelector(".products");
productsDiv.addEventListener("click", (e) => {
  if (e.target.className == "minus") {
    if (e.target.nextElementSibling.innerText > 1) {
      e.target.nextElementSibling.innerText--;

      calculateProductAndCartTotal(e.target.parentElement.parentElement);
    } else {
      if (confirm("Product will be deleted?")) {
        e.target.parentElement.parentElement.parentElement.remove();
        calculateCartTotal();
      }
    }
  } else if (e.target.className == "plus") {
    e.target.previousElementSibling.innerText++;
    calculateProductAndCartTotal(e.target.parentElement.parentElement);
  } else if (e.target.classList.contains("remove-product")) {
    if (confirm("Product will be deleted?")) {
        e.target.parentElement.parentElement.parentElement.remove();
        calculateCartTotal();
      }
  
  }
});

const calculateProductAndCartTotal = (productInfoDiv) => {
    let productQuantity = productInfoDiv.querySelector("#product-quantity").innerText;
    let productPrice = productInfoDiv.querySelector("strong").innerText;
    let productTotalPriceDiv = productInfoDiv.querySelector(".product-line-price");
    productTotalPriceDiv.innerText = (productQuantity * productPrice).toFixed(2);
  calculateCartTotal();
};
const calculateCartTotal = () => {

    let productsTotalPriceDivs = document.querySelectorAll(".product-line-price")
    let subtotal = 0 ;
    productsTotalPriceDivs.forEach(eachDiv=>{
        subtotal  += parseFloat(eachDiv.innerText)
    })
        
    let taxPrice = subtotal * localStorage.getItem("taxRate")
    let shippingPrice = parseFloat(localStorage.getItem("shippingPrice"))
    let cartTotal = subtotal + taxPrice + shippingPrice

    document.querySelector("#cart-subtotal p:nth-child(2)").innerText = subtotal.toFixed(2)
    document.querySelector("#cart-tax p:nth-child(2)").innerText = taxPrice.toFixed(2)
    document.querySelector("#cart-shipping p:nth-child(2)").innerText = shippingPrice.toFixed(2)
    document.querySelector("#cart-total p:nth-child(2)").innerText = cartTotal.toFixed(2)
};
