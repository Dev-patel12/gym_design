// ================= BMI CALCULATOR FUNCTION =================
// This function calculates BMI based on user input and updates the display
function calculateBMI() {

  let weight = document.getElementById("weight").value;
  let height = document.getElementById("height").value;

  // Validation - check if inputs are valid
  if (!weight || !height || weight <= 0 || height <= 0) {
    alert("Please enter valid weight and height values");
    return;
  }

  // Convert height from cm to meters for BMI calculation
  let heightInMeters = height / 100;

  // Calculate BMI = weight (kg) / height² (m)
  let bmi = weight / (heightInMeters * heightInMeters);
  bmi = parseFloat(bmi.toFixed(2));

  // Get selected gender (male or female)
  let gender = document.querySelector('input[name="gender"]:checked').id;

  let type = "";
  let advice = "";

  // Determine BMI category and provide fitness advice
  if (bmi < 18.5) {
    type = "Thin";
    advice = "⚠️ You are underweight. Focus on calorie surplus with protein-rich foods and strength training to build muscle.";
  }
  else if (bmi < 25) {
    type = "Normal";
    advice = "✅ Perfect! You have a healthy BMI. Maintain with balanced nutrition and regular exercise.";
  }
  else if (bmi < 30) {
    type = "Overweight";
    advice = "🔥 You are overweight. Increase cardio, control portions, and combine strength training for best results.";
  }
  else {
    type = "Obese";
    advice = "⚠️ High risk zone! Please consult our expert trainers for a customized diet and workout plan immediately.";
  }

  // Update the body image based on gender and BMI category
  document.querySelectorAll(".bmi-img").forEach(img => {
    img.classList.remove("active");
  });

  // Show the corresponding body type image
  let targetImage = document.getElementById(gender + type);
  if (targetImage) {
    targetImage.classList.add("active");
  }

  // Update modal content for popup display
  document.getElementById("modalBMIResult").innerHTML =
    `BMI: <span style="color:#ff3b3b; font-weight:bold;">${bmi}</span> <br> Category: <strong>${type}</strong>`;

  document.getElementById("modalAdvice").innerHTML = advice;

  // Update right sidebar with latest BMI info
  document.getElementById("bmiOutput").innerHTML =
    `📊 <strong>Your BMI: <span style="color:#ff3b3b">${bmi}</span></strong><br>Category: ${type}`;

  document.getElementById("bmiAdvice").innerHTML = `
    <p>💪 <strong>Personalized Advice:</strong> ${advice}</p>
    <hr style="border-color:rgba(255,59,59,0.2)">
    <p class="small">📌 BMI helps estimate body fat. For accurate fitness assessment, consult our trainers.</p>
  `;

  // Open the modal dialog to show results
  let modal = new bootstrap.Modal(document.getElementById('bmiModal'));
  modal.show();
}

// ================= GENDER CHANGE EVENT HANDLER =================
// Updates the body image when user switches between male/female
document.querySelectorAll('input[name="gender"]').forEach(radio => {
  radio.addEventListener("change", () => {

    let weight = document.getElementById("weight").value;
    let height = document.getElementById("height").value;
    let gender = document.querySelector('input[name="gender"]:checked').id;

    // Hide all BMI images first
    document.querySelectorAll(".bmi-img").forEach(img => {
      img.classList.remove("active");
    });

    // If no inputs, show normal body type by default
    if (!weight || !height || weight <= 0 || height <= 0) {
      let defaultImage = document.getElementById(gender + "Normal");
      if (defaultImage) defaultImage.classList.add("active");
      return;
    }

    // Calculate BMI to determine which body type to show
    let heightInMeters = height / 100;
    let bmi = weight / (heightInMeters * heightInMeters);
    let type = "";

    if (bmi < 18.5) type = "Thin";
    else if (bmi < 25) type = "Normal";
    else if (bmi < 30) type = "Overweight";
    else type = "Obese";

    // Show appropriate body image
    let targetImage = document.getElementById(gender + type);
    if (targetImage) targetImage.classList.add("active");
  });
});

// ================= SMOOTH SCROLL FOR NAVIGATION =================
// Handles smooth scrolling when clicking on nav links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    let targetId = this.getAttribute('href');
    let target = document.querySelector(targetId);

    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: "smooth"
      });
    }
  });
});

// ================= ACTIVE MENU HIGHLIGHT ON SCROLL =================
// Highlights the active navigation link based on current scroll position
window.addEventListener("scroll", () => {
  let sections = document.querySelectorAll("section, footer, #home");
  let navLinks = document.querySelectorAll(".nav-link");

  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 120;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height && id) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        let activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (activeLink) activeLink.classList.add("active");
      });
    }
  });
});

// ================= NAVBAR SCROLL EFFECT =================
// Adds shadow and reduces padding when user scrolls down
window.addEventListener("scroll", function () {
  let nav = document.querySelector(".custom-nav");

  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// ================= INITIALIZE AOS ANIMATIONS =================
// AOS (Animate On Scroll) library initialization
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS with custom settings
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: 'ease-out',
    });
  }
});

// ================= FORM SUBMISSION HANDLER =================
// Handles contact form submission with validation
document.querySelectorAll('.contact-form').forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let name = this.querySelector('input[placeholder="Your Name"]')?.value;
    let email = this.querySelector('input[placeholder="Email"]')?.value;
    let message = this.querySelector('textarea')?.value;
    
    if (!name || !email || !message) {
      alert('⚠️ Please fill in all fields before sending.');
      return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      alert('⚠️ Please enter a valid email address.');
      return;
    }
    
    alert('✅ Thank you for contacting us! We will get back to you soon.');
    this.reset();
  });
});

// ================= NEWSLETTER SUBSCRIPTION HANDLER =================
document.querySelectorAll('.subscribe-form').forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let email = this.querySelector('input[type="email"]')?.value;
    
    if (!email || !email.includes('@') || !email.includes('.')) {
      alert('⚠️ Please enter a valid email address.');
      return;
    }
    
    alert('🎉 Subscribed successfully! Stay tuned for fitness tips.');
    this.reset();
  });
});

// ================= JOIN NOW BUTTON HANDLER =================
document.querySelectorAll('.join-btn, .btn-danger[href="#contact"]').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// ================= READ MORE BUTTON HANDLER =================
document.querySelectorAll('.about-section .btn-danger').forEach(btn => {
  btn.addEventListener('click', function() {
    alert('📖 Gymfinity Core offers state-of-the-art facilities, certified trainers, personalized workout plans, nutrition guidance, and a supportive community to help you achieve your fitness goals. Visit us today!');
  });
});

// ================= SERVICE CARD ALERT HANDLER =================
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', function() {
    let serviceName = this.querySelector('h5')?.innerText || 'this service';
    alert(`💪 ${serviceName} - Contact us for more details and personalized training sessions!`);
  });
});

// ================= WINDOW LOAD COMPLETE HANDLER =================
window.addEventListener('load', function() {
  console.log('🏋️ Gymfinity Core Website Loaded Successfully!');
  
  // Remove any loading spinners if present
  const loader = document.querySelector('.loader');
  if (loader) loader.style.display = 'none';
});