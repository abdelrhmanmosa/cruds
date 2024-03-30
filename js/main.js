let Title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let del = document.getElementById("delete");

let mood = "create";
let tmp;

// console.log(title, price, taxes, ads, discount, count, category, submit);

// create function to get total amount

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "rgb(177, 1, 1)";
  }
}

// create an element when click in submit
let arrPro;
if (localStorage.product != null) {
  arrPro = JSON.parse(localStorage.product);
} else {
  arrPro = [];
}
submit.onclick = function () {
  let newPro = {
    title: Title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (
    Title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    count.value <= 100
  ) {
    if (mood === "create") {
      if (count.value > 1) {
        for (let i = 0; i < count.value; i++) {
          arrPro.push(newPro);
        }
      } else {
        arrPro.push(newPro);
      }
    } else {
      arrPro[tmp] = newPro;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  }

  localStorage.setItem("product", JSON.stringify(arrPro));
  showData();
};

//function to clear data when to create element

function clearData() {
  Title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "0";
  count.value = "";
  category.value = "";
  showData();
}

// create function to read data in the table

function showData() {
  let table = "";
  for (let i = 0; i < arrPro.length; i++) {
    table += `<tr>
    <td>${i}</td>
    <td>${arrPro[i].title}</td>
    <td>${arrPro[i].price}</td>
    <td>${arrPro[i].taxes}</td>
    <td>${arrPro[i].ads}</td>
    <td>${arrPro[i].discount}</td>
    <td>${arrPro[i].total}</td>
    <td>${arrPro[i].category}</td>
    <td>
    <button id="update" onclick="updateData( ${i} )">update</button>
    </td>
    <td><button id="delete" onclick="deleteData( ${i} )">delete</button></td>
    </tr>
    </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;

  let delAll = document.getElementById("deleteAll");
  if (arrPro.length > 0) {
    delAll.innerHTML = `
    <button onclick="deleteAll()">Delete All (${arrPro.length})</button>
    `;
  } else {
    delAll.innerHTML = "";
  }
  getTotal();
}
showData();

// function to delete element in the arrPro.

function deleteData(i) {
  arrPro.splice(i, 1);
  localStorage.setItem("product", JSON.stringify(arrPro));
  showData();
}

// function to delete all in table

function deleteAll() {
  localStorage.clear();
  arrPro.splice(0);
  showData();
}

// function to update element in the arrPro.

function updateData(i) {
  Title.value = arrPro[i].title;
  price.value = arrPro[i].price;
  taxes.value = arrPro[i].taxes;
  ads.value = arrPro[i].ads;
  discount.value = arrPro[i].discount;
  category.value = arrPro[i].category;
  count.style.display = "none";
  submit.innerHTML = "Update";
  mood = "update";
  getTotal();
  showData();
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// function search by moodSearch
let moodSearch = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id === "titleSearch") {
    moodSearch = "title";
  } else {
    moodSearch = "category";
  }
  search.placeholder = "search by " + moodSearch;
  search.focus();
  search.value = "";
  showData();
}

// function to search in table

function searchData(value) {
  let table = "";
  for (let i = 0; i < arrPro.length; i++) {
    if (moodSearch === "title") {
      if (arrPro[i].title.includes(value.toLowerCase())) {
        table += `<tr>
        <td>${i}</td>
        <td>${arrPro[i].title}</td>
        <td>${arrPro[i].price}</td>
        <td>${arrPro[i].taxes}</td>
        <td>${arrPro[i].ads}</td>
        <td>${arrPro[i].discount}</td>
        <td>${arrPro[i].total}</td>
        <td>${arrPro[i].category}</td>
        <td>
        <button id="update" onclick="updateData( ${i} )">update</button>
        </td>
        <td><button id="delete" onclick="deleteData( ${i} )">delete</button></td>
        </tr>
        </tr>`;
      }
    } else {
      if (arrPro[i].category.includes(value.toLowerCase())) {
        table += `<tr>
        <td>${i}</td>
        <td>${arrPro[i].title}</td>
        <td>${arrPro[i].price}</td>
        <td>${arrPro[i].taxes}</td>
        <td>${arrPro[i].ads}</td>
        <td>${arrPro[i].discount}</td>
        <td>${arrPro[i].total}</td>
        <td>${arrPro[i].category}</td>
        <td>
        <button id="update" onclick="updateData( ${i} )">update</button>
        </td>
        <td><button id="delete" onclick="deleteData( ${i} )">delete</button></td>
        </tr>
        </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
