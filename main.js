// USER FORM SCRIPT

// Put DOM elements into variables
const myForm = document.querySelector("#my-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const msg = document.querySelector(".msg");
const userList = document.querySelector("#users");

// Listen for form submit
myForm.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();

  if (nameInput.value === "" || emailInput.value === "") {
    // alert('Please enter all fields');
    msg.classList.add("error");
    msg.innerHTML = "Please enter all fields";

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {
    //LocalStorage

    let existingUserData = JSON.parse(localStorage.getItem("userData")) || [];

    let newData = {
      name: nameInput.value,
      email: emailInput.value,
    };

    existingUserData.push(newData);

    let myObj_serialized = JSON.stringify(existingUserData);
    localStorage.setItem("userData", myObj_serialized);
    let myObj = JSON.parse(localStorage.getItem("userData"));
    console.log(myObj);

    // Create new list item with user
    const li = document.createElement("li");

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px";

    // Add an onClick event to the delete button
    deleteBtn.addEventListener("click", function () {
      // Access the parent element (e.g., the <div class="item">)
      const item = this.parentElement;
      let text = item.innerText
      let textArray = text.split(":")

      if (item) {
        // Remove the item from the DOM
        item.remove();

        let myObj = JSON.parse(localStorage.getItem("userData"));
        let newObj = myObj.filter((data) => {
          return data.name !== textArray[0] && data.email !== textArray[1];
        });
        localStorage.setItem("userData", JSON.stringify(newObj));
      }
    });

    // Add text node with input values
    li.appendChild(
      document.createTextNode(`${nameInput.value}: ${emailInput.value}`)
    );

    li.appendChild(deleteBtn);

    // Add HTML
    // li.innerHTML = `<strong>${nameInput.value}</strong>e: ${emailInput.value}`;

    // Append to ul
    userList.appendChild(li);

    // Clear fields
    nameInput.value = "";
    emailInput.value = "";
  }
}
