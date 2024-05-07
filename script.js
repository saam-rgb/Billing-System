var itemForm = document.getElementById("item-form");
var itemName = document.getElementById("item-name");
var itemQty = document.getElementById("item-qty");
var itemPrice = document.getElementById("item-price");
var cartBody = document.getElementById("cart-body");
var totalAmount = document.getElementById("total-cost");
var displayInvoice = document.getElementById("generate-invoice");

itemForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addProductToTable();
  updateTotal();
  showInvoiceButton();
});

function addProductToTable() {
  const productName = itemName.value;
  const quantity = parseInt(itemQty.value, 10);
  const price = parseFloat(itemPrice.value);
  const total = quantity * price;

  const newRow = cartBody.insertRow();
  newRow.insertCell().textContent = productName;
  newRow.insertCell().textContent = quantity;
  newRow.insertCell().textContent = price.toFixed(2);
  newRow.insertCell().textContent = total.toFixed(2);

  clearForm();
}

function updateTotal() {
  let total = 0;
  const rows = cartBody.rows;

  for (let i = 0; i < rows.length; i++) {
    const rowTotal = parseFloat(rows[i].cells[3].textContent);
    total += rowTotal;
  }

  totalAmount.textContent = `Total Amount: $${total.toFixed(2)}`;
}

function clearForm() {
  itemName.value = "";
  itemQty.value = "";
  itemPrice.value = "";
}

function showInvoiceButton() {
  displayInvoice.style.display = "block";
}

function generateInvoice() {
  var invoiceTable = document.getElementById("cart-table").outerHTML;
  var totalCost = document.getElementById("total-cost").innerHTML;

  var invoiceWindow = window.open("", "_blank");
  invoiceWindow.document.write("<style>");
  invoiceWindow.document.write(
    "body { font-family: 'poppins', sans-serif; color:#fff; background:#333333;}"
  );
  invoiceWindow.document.write(
    "table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }"
  );
  invoiceWindow.document.write(
    "th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }"
  );
  invoiceWindow.document.write("th { background-color: #333333; }");
  invoiceWindow.document.write("#totalAmount { font-weight: bold; }");
  invoiceWindow.document.write(
    "#invoiceTitle { text-align: center; background-color:red; color:white; font-size: 24px; margin-bottom: 20px; }"
  );
  invoiceWindow.document.write("</style>");
  invoiceWindow.document.write("</head><body>");
  invoiceWindow.document.write('<h1 id="invoiceTitle">Invoice</h1>');
  invoiceWindow.document.write(invoiceTable);
  invoiceWindow.document.write('<p id="totalAmount">' + totalCost + "</p>");
  invoiceWindow.document.close();
  invoiceWindow.print();
}
