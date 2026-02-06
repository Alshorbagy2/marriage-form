let currentStep = 0;
const steps = document.querySelectorAll(".step");
const progressBar = document.getElementById("progress-bar");
const submitBtn = document.getElementById("submitBtn");
const agreeTerms = document.getElementById("agreeTerms");

function showStep(index) {
  steps.forEach(step => step.classList.remove("active"));
  steps[index].classList.add("active");

  const progress = ((index + 1) / steps.length) * 100;
  progressBar.style.width = progress + "%";
}

function nextStep() {
  if (currentStep === 3 && !agreeTerms.checked) {
    alert("يجب الموافقة على الشروط أولاً");
    return;
  }
  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep(currentStep);
  }
}

function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
}

// Fake payment confirmation (replace later with real PayPal redirect logic)
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("paid") === "true") {
  submitBtn.disabled = false;
  document.getElementById("paymentStatus").innerText = "تم تأكيد الدفع ✅ يمكنك إرسال الطلب الآن";
}

showStep(currentStep);
