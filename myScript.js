document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("jobForm");

  const fields = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    phone: document.getElementById("phone"),
    password: document.getElementById("password"),
    experience: document.getElementById("experience"),
    salary: document.getElementById("salary"),
    terms: document.getElementById("terms"),
  };

  for (const field of Object.values(fields)) {
    if (field.tagName !== "INPUT" && field.tagName !== "SELECT") continue;
    field.addEventListener("focus", () => field.classList.add("focus"));
    field.addEventListener("blur", () => field.classList.remove("focus"));
  }

  fields.name.addEventListener("input", () => validateField("name"));
  fields.email.addEventListener("input", () => validateField("email"));
  fields.phone.addEventListener("input", () => validateField("phone"));
  fields.password.addEventListener("input", () => validateField("password"));
  fields.salary.addEventListener("input", () => validateField("salary"));

  function validateField(field) {
    let valid = false;
    const value = fields[field].value.trim();

    switch (field) {
      case "name":
        valid = /^[A-Za-z\s]{3,}$/.test(value);
        break;
      case "email":
        valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        break;
      case "phone":
        valid = /^\d{11}$/.test(value);
        break;
      case "password":
        valid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
        break;
      case "salary":
        valid = Number(value) > 0;
        break;
    }

    fields[field].classList.toggle("valid", valid);
    fields[field].classList.toggle("invalid", !valid);
    return valid;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const validations = {
      name: validateField("name"),
      email: validateField("email"),
      phone: validateField("phone"),
      password: validateField("password"),
      experience: fields.experience.value !== "",
      salary: validateField("salary"),
      terms: fields.terms.checked,
    };

    for (let [key, isValid] of Object.entries(validations)) {
      if (!isValid) {
        alert(`Invalid or missing field: ${key}`);
        return;
      }
    }

    alert("Application submitted successfully!");
    form.reset();
    document.querySelectorAll(".valid").forEach((el) => el.classList.remove("valid"));
  });
});

