const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

const taxRate = 5;
const discountPercentage = 10;
const loyaltyRate = 2;

//1
app.get("/cart-total", (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let newTotalPrice = cartTotal + newItemPrice;
  res.send(newTotalPrice.toString());
});
//cart-total?newItemPrice=1200&cartTotal=0

//2
function parseBoolean(value) {
  if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  } else {
    return null;
  }
}
app.get("/membership-discount", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = parseBoolean(req.query.isMember);
  if (isMember == true) {
    let discount = cartTotal * (discountPercentage / 100);
    let newTotalPrice = cartTotal - discount;
    res.send(newTotalPrice.toString());
  } else {
    res.send(cartTotal.toString());
  }
});
//membership-discount?cartTotal=3600&isMember=true

//3
app.get("/calculate-tax", (req, res) =>{
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalTax = cartTotal * (taxRate / 100);
  res.send(totalTax.toString());
});
//calculate-tax?cartTotal=3600

//4
app.get("/estimate-delivery", (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  if (shippingMethod == "standard") {
    let deliveryDay = distance / 50;
    res.send(deliveryDay.toString());
  } else if (shippingMethod == "express") {
    let deliveryDay = distance / 100;
    res.send(deliveryDay.toString());
  } else {
    res.send("Input valid shipping method, 'standard' or 'express'");
  }
});
//estimate-delivery?shippingMethod=express&distance=600

//5
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});
//shipping-cost?weight=2&distance=600

//6
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = purchaseAmount * (loyaltyRate / 100);
  res.send(loyaltyPoints.toString());
});
//loyalty-points?purchaseAmount=3600