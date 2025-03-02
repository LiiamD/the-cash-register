const cash = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const listContainer = document.getElementById("list-container");
const amountDrawer = document.querySelectorAll(".amount-drawer");



let price = 3.26;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const curr = [
  ["Penny", 0.01],
  ["Nickel", 0.05],
  ["Dime", 0.1],
  ["Quarter", 0.25],
  ["One", 1],
  ["Five", 5],
  ["Ten", 10],
  ["Twenty", 20],
  ["Hundred", 100]
];

amountDrawer.forEach((el, index) => {
  el.textContent = cid[index][1]; // affiche la valeur de la monnaie en cours
    }
  );



let sumCid = cid.reduce((a, b) => a + b[1], 0);
let cashVal = parseFloat(cash.value); //transforme le string cash en véritable chiffre
let due = cashVal - price; // différence de ce que donne le consumer et le prix
let dueVal = (Math.round(due * 100) / 100).toFixed(2);



/*
// conversion centime en dollar
const toCents = (dollars) => Math.round(dollars * 100);

//conversion dollars en centime
const toDollars = (cents) => cents / 100;

// price et cashVal en cents
let priceCents = toCents(price);
let cashValCents = toCents(cashVal);

// due en cents
let dueValCents = cashValCents - priceCents;

let sumCidCents = toCents(sumCid);
*/

//fonction qui va afficher le status dans le div du changeDue !!!
const changeDueMsg = () => {

   let sumCid = cid.reduce((a, b) => a + b[1], 0);
   let cashVal = parseFloat(cash.value); //transforme le string cash en véritable chiffre
   let due = cashVal - price; // différence de ce que donne le consumer et le prix
   let dueVal = (Math.round(due * 100) / 100);
   sumCid = (Math.round(sumCid * 100) / 100);

/*
   let sumCidCents = toCents(sumCid);
    
   let cashValCents = toCents(cashVal);
   let priceCents = toCents(price);
   let dueValCents = cashValCents - priceCents;
*/   

 if (price > cashVal) {
    alert("Customer does not have enough money to purchase the item");
  }
  
if (price === cashVal) {
    changeDue.style.display = "block";
    changeDue.textContent = "No change due - customer paid with exact cash";
    return;
  }
  

if (price < cashVal) {
  changeDue.style.display = "block";
  
  if (sumCid > dueVal) {
    changeDue.innerHTML = `<h2>Status: OPEN</h2>`;
  }
  
  if (sumCid === dueVal) {
    changeDue.innerHTML = `<h2>Status: CLOSED</h2>`;
  }
  
  if (sumCid < dueVal) {
     changeDue.innerHTML = `<h2>Status: INSUFFICIENT_FUNDS</h2>`;   
     return;
  }
}
};

//lol
//338.67


//fonction qui va update la liste dans le div du changeDue !!!
const listUpdate = (arr) => {
   
   let sumCid = cid.reduce((a, b) => a + b[1], 0);
   let cashVal = parseFloat(cash.value); //transforme le string cash en véritable chiffre
   let due = cashVal - price; // différence de ce que donne le consumer et le prix
   let dueVal = (Math.round(due * 100) / 100).toFixed(2);
   sumCid = (Math.round(sumCid * 100) / 100).toFixed(2);
   let oldSumCid = sumCid;
/*
   let sumCidCents = toCents(sumCid);
    
   let cashValCents = toCents(cashVal);
   let priceCents = toCents(price);
   let dueValCents = cashValCents - priceCents;
*/
   

  for (let i = arr.length - 1; i >= 0; i--) {
    
     const row = arr[i];
     //const currVal = curr[i][1];
     //let rowCents = toCents(row);
     //let rowCents = toCents(row[1]);
     //let currCents = toCents(curr[i][1]);
     //const currVal = curr[i][1];
     let quotient = Math.floor(dueVal / curr[i][1]);
     let multi = curr[i][1] * quotient;
     //let multi = currCents * quotient;
     let oldRow = row[1];
     //let oldRowCents = toCents(oldRow);
    
      if (dueVal > curr[i][1]) { 

        if(row[1] > multi) {
         row[1] -= multi; // 60 - 40
         dueVal -= multi; //48 - 40
         dueVal = (Math.round(dueVal * 100) / 100).toFixed(2);
         amountDrawer[i].textContent = (Math.round(row[1] * 100) / 100).toFixed(2); 
      }

         else if (row[1] <= multi) {
        //let diff = multi - row[1]; // 80 - 60 = 20
           dueVal -= row[1];
          dueVal = (Math.round(dueVal * 100) / 100).toFixed(2);
          
           row[1] = 0;
           amountDrawer[i].textContent = 0;
        }
        
        dueVal = parseFloat(dueVal);
        let rowVal = oldRow - row[1];
        //let rowValCents = oldRowCents - rowCents;
        
         //statusMsg.style.display = "block";
      
          //let sumDueCents = Array.from(changeDue).map(div => div.innerHTML.split(": $")[1]).reduce((a, b) => a + b[1], 0);

      
        
        if (rowVal > 0) { //affiche uniquement rowVal =/= de 0
        
        changeDue.style.display = "block";
        changeDue.innerHTML += `<p>${row[0]}: $${(Math.round(rowVal * 100) / 100)}</p>`;
          }   



          /*if (sumDue  < dueVal) {
            changeDue.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`;   
     return;
          }*/
          if (sumCid < dueVal) {
            changeDue.innerHTML = `<h2>Status: INSUFFICIENT_FUNDS</h2>`;   
     return;
          }
          
        }  
      } 
      let arrDue = Array.from(changeDue.querySelectorAll("p")).map(p => parseFloat(p.innerHTML.split(": $")[1]));

let sumDue = arrDue.reduce((a, b) => a + b, 0);
sumDue = Math.round(sumDue * 100) / 100;
//let lastVal = sumDue[sumDue.length - 1];
//let lastVal = arrDue[arrDue.length - 1];
//sumDue = arrDue[arrDue.length - 1];
 console.log(sumDue);  
 console.log(dueVal);
     if (dueVal > 0) {
       changeDue.style.display = "block";
        changeDue.innerHTML = `<h2>Status: INSUFFICIENT_FUNDS</h2>`;
        return;
     }

    };
//338.67


purchaseBtn.addEventListener("click", () => {
  changeDueMsg();
  if (sumCid < dueVal) {
    return;
  }
  listUpdate(cid);
  cash.value = "";
  
});

cash.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    purchaseBtn.click();
  }
})