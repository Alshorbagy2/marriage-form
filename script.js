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

function validateCurrentStep() {
  const currentInputs = steps[currentStep].querySelectorAll("input, select, textarea");
  for (let input of currentInputs) {
    if (!input.checkValidity()) {
      input.reportValidity();
      return false;
    }
  }
  return true;
}

function nextStep() {
  if (!validateCurrentStep()) return;

  if (currentStep === 3 && !agreeTerms.checked) {
    alert("يجب الموافقة على الشروط أولاً");
    return;
  }

  if (currentStep < steps.length - 1) {
    currentStep++;
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
// Animated Trust Counters
const counters = document.querySelectorAll('.trust-number');
let countersStarted = false;

function startCounters() {
  if (countersStarted) return;
  countersStarted = true;

  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const duration = 1200; // ms
    const stepTime = Math.max(10, Math.floor(duration / target));
    let current = 0;

    const timer = setInterval(() => {
      current += Math.ceil(target / 60);
      if (current >= target) {
        counter.textContent = target.toLocaleString('ar-EG');
        clearInterval(timer);
      } else {
        counter.textContent = current.toLocaleString('ar-EG');
      }
    }, stepTime);
  });
}

// تشغيل العداد عند تحميل الصفحة
window.addEventListener('load', startCounters);
const paymentSection = document.querySelector('.payment-section');
if (paymentSection) {
  paymentSection.style.opacity = 0;
  paymentSection.style.transform = 'translateY(12px)';

  const reveal = () => {
    const rect = paymentSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      paymentSection.style.transition = 'all .5s ease';
      paymentSection.style.opacity = 1;
      paymentSection.style.transform = 'translateY(0)';
      window.removeEventListener('scroll', reveal);
    }
  };
  window.addEventListener('scroll', reveal);
  reveal();
}

