console.log("script.js is connected!");

emailjs.init("jCN7XLGs-JjqC84OJ");

const services = [
    { name: "Dry Cleaning", price: 200 },
    { name: "Wash & Fold", price: 300 },
    { name: "Ironing", price: 200 },
    { name: "Stain Removal", price: 500 },
    { name: "Leather & Suede Cleaning", price: 999 },
    { name: "Wedding Dress Cleaning", price: 1200 }
  ];

const cart = [];
  const servicesDiv = document.getElementById("services");
  const cartItemsDiv = document.getElementById("cart-items");
  const totalSpan = document.getElementById("total");

  function updateCart (){
    cartItemsDiv.innerHTML = "";
    let total = 0;
    const emptyMsg = document.getElementById("empty-cart-msg");

  if (cart.length === 0) {
    emptyMsg.style.display = "block"; // Show message
  } else {
    emptyMsg.style.display = "none"; // Hide message

    cart.forEach(item => {
      const div = document.createElement("div");
      div.className = "cart-item";
      div.textContent = `${item.name} - ₹${item.price}`;
      cartItemsDiv.appendChild(div);
      total += item.price;
    });
  }
    totalSpan.textContent = total;

  }

  function resetServiceButtons() {
  const buttons = document.querySelectorAll(".toggle-btn");
  buttons.forEach(button => {
    button.textContent = "Add Item";
    button.classList.remove("remove-btn");
    button.classList.add("add-btn");
  });
}

  // services.forEach(service => {
  //   const div = document.createElement("div");
  //   div.className = "service";

  //   const name = document.createElement("span");
  //   name.className = "service-name";
  //   name.textContent = `${service.name} - ₹${service.price}`;

  //   const buttons = document.createElement("div");
  //   buttons.className = "buttons";

  //   const addBtn = document.createElement("button");
  //   addBtn.className = "add-btn";
  //   addBtn.textContent = "Add Item";
  //   addBtn.onclick = () => {
  //     if (!cart.find(item => item.name === service.name)) {
  //       cart.push(service);
  //       updateCart();
  //     }
  //   };

  //   const removeBtn = document.createElement("button");
  //   removeBtn.className = "remove-btn";
  //   removeBtn.textContent = "Remove Item";
  //   removeBtn.onclick = () => {
  //     const index = cart.findIndex(item => item.name === service.name);
  //     if (index !== -1) {
  //       cart.splice(index, 1);
  //       updateCart();
  //     }
  //   };

  //   buttons.appendChild(addBtn);
  //   buttons.appendChild(removeBtn);
  //   div.appendChild(name);
  //   div.appendChild(buttons);
  //   servicesDiv.appendChild(div);
  // });

services.forEach(service => {
  const div = document.createElement("div");
  div.className = "service";

  const name = document.createElement("span");
  name.className = "service-name";
  name.textContent = `${service.name} - ₹${service.price}`;

  const button = document.createElement("button");
  button.className = "toggle-btn"; // base class

  const updateButtonState = () => {
    const inCart = cart.find(item => item.name === service.name);
    button.textContent = inCart ? "Remove Item" : "Add Item";

    // Remove both classes first
    button.classList.remove("add-btn", "remove-btn");

    // Add appropriate class
    button.classList.add(inCart ? "remove-btn" : "add-btn");
  };

  button.onclick = () => {
    const index = cart.findIndex(item => item.name === service.name);
    if (index === -1) {
      cart.push(service);
    } else {
      cart.splice(index, 1);
    }
    updateCart();
    updateButtonState();
  };

  updateButtonState(); // Initial setup

  div.appendChild(name);
  div.appendChild(button);
  servicesDiv.appendChild(div);
});

  
  // Booking Form Submission
  document.getElementById("booking-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;

    const serviceList = cart.map(item => `${item.name} - ₹${item.price}`).join("\n");
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const templateParams = {
      name,
      email,
      phone,
      services: serviceList,
      total
    };

    emailjs.send("service_ctvjvm2", "template_sty653n", templateParams)
      .then(() => {
        document.getElementById("confirmation-msg").textContent =
          "Thank you For Booking the Service. We will get back to you soon!";
        form.reset();
        cart.length = 0;
        updateCart();
        resetServiceButtons();
      })
      .catch(error => {
        console.error("EmailJS Error:", error);
      });
  });


