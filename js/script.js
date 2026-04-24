function calculateBMI() {

  let weight = document.getElementById("weight").value;
  let height = document.getElementById("height").value;

  if (!weight || !height) {
    alert("Please enter valid data");
    return;
  }

  height = height / 100;

  let bmi = weight / (height * height);
  bmi = parseFloat(bmi.toFixed(2));

  let gender = document.querySelector('input[name="gender"]:checked').id;

  let type = "";
  let advice = "";

  // CATEGORY + ADVICE
  if (bmi < 18.5) {
    type = "Thin";
    advice = "You are underweight. Increase calories and do strength training.";
  } 
  else if (bmi < 25) {
    type = "Normal";
    advice = "Perfect! Maintain your current healthy lifestyle.";
  } 
  else if (bmi < 30) {
    type = "Overweight";
    advice = "Start cardio and control diet to reduce weight.";
  } 
  else {
    type = "Obese";
    advice = "High risk! Follow strict workout and consult a trainer.";
  }

  // 🔥 IMAGE CHANGE
  document.querySelectorAll(".bmi-img").forEach(img => {
    img.classList.remove("active");
  });

  document.getElementById(gender + type).classList.add("active");

  // 🔥 MODAL CONTENT
  document.getElementById("modalBMIResult").innerHTML =
    `BMI: <span style="color:#ff3b3b">${bmi}</span> <br> Category: ${type}`;

  document.getElementById("modalAdvice").innerHTML = advice;

  // 🔥 RIGHT SIDE (GENERAL INFO)
  document.getElementById("bmiOutput").innerHTML =
    `Latest BMI: <span style="color:#ff3b3b">${bmi}</span>`;

  document.getElementById("bmiAdvice").innerHTML =
    "BMI helps estimate body fat. For best results, combine gym training with proper diet.";

  // 🔥 OPEN MODAL
  let modal = new bootstrap.Modal(document.getElementById('bmiModal'));
  modal.show();
}

document.querySelectorAll('input[name="gender"]').forEach(radio => {
  radio.addEventListener("change", () => {

    let weight = document.getElementById("weight").value;
    let height = document.getElementById("height").value;

    let gender = document.querySelector('input[name="gender"]:checked').id;

    // Hide all images
    document.querySelectorAll(".bmi-img").forEach(img => {
      img.classList.remove("active");
    });

    // If no input → show Normal
    if (!weight || !height) {
      document.getElementById(gender + "Normal").classList.add("active");
      return;
    }

    // Calculate BMI
    height = height / 100;
    let bmi = weight / (height * height);

    let type = "";

    if (bmi < 18.5) type = "Thin";
    else if (bmi < 25) type = "Normal";
    else if (bmi < 30) type = "Overweight";
    else type = "Obese";

    // Show correct image
    document.getElementById(gender + type).classList.add("active");

  });
});


// 🔥 Smooth Scroll
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    let target = document.querySelector(this.getAttribute('href'));

    window.scrollTo({
      top: target.offsetTop - 70,
      behavior: "smooth"
    });
  });
});

// 🔥 Active menu highlight
window.addEventListener("scroll", () => {
  let sections = document.querySelectorAll("section, footer, #home");
  let navLinks = document.querySelectorAll(".nav-link");

  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        document.querySelector('.nav-link[href="#' + id + '"]').classList.add("active");
      });
    }
  });
});

window.addEventListener("scroll", function () {
  let nav = document.querySelector(".custom-nav");

  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});


