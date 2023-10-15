// Put DOM elements into variables
const myForm = document.querySelector("#my-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const msg = document.querySelector(".msg");
const userList = document.querySelector("#users");

// Listen for form submit
myForm.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();

  if (
    nameInput.value === "" ||
    emailInput.value === "" ||
    phoneInput.value === ""
  ) {
    // alert('Please enter all fields');
    msg.classList.add("error");
    msg.innerHTML = "Please enter all fields";

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {
    let newData = {
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
    };

    axios
      .post(
        "https://crudcrud.com/api/af0e1034eb3749008ac735712eeb2ffc/appointmentData",
        newData
      )
      .then((res) => {
        console.log(res);
        location.reload();
      })
      .catch((err) => console.log(err));

    // Clear fields
    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get
    // "https://crudcrud.com/api/af0e1034eb3749008ac735712eeb2ffc/appointmentData"
    ()
    .then((res) => {
      console.log(res.data);
      for (let i = 0; i < res.data.length; i++) {
        showNewUser(res.data[i]);
      }
    })
    .catch((err) => console.log(err));
});

const onDelete = (data) => {
  axios
    .delete(
      `https://crudcrud.com/api/af0e1034eb3749008ac735712eeb2ffc/appointmentData/${data._id}`
    )
    .then((res) => {
      console.log(res);
      // After the request is complete, refresh the page
      location.reload();
    })
    .catch((err) => console.log(err));
};

const onEdit = (data) => {

  nameInput.value = data.name
  emailInput.value = data.email
  phoneInput.value = data.phone

  onDelete(data)
};

function showNewUser(data) {
  const name = data.name;
  const email = data.email;
  const phone = data.phone;

  const li = document.createElement("li");
  li.innerHTML = `<strong>${name}</strong>: ${email} -- ${phone}`;

  // Delete Button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.style.marginLeft = "10px";

  deleteBtn.addEventListener("click", () => {
    onDelete(data);
  });

  // Edit Button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.style.marginLeft = "10px";

  editBtn.addEventListener("click", () => {
    onEdit(data);
  });

  const span = document.createElement("span");
  span.appendChild(deleteBtn);
  span.appendChild(editBtn);
  li.appendChild(span);

  userList.appendChild(li);
}
