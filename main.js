function animateCounter(element, target, formatFn, speed = 10) {
    let count = 0;
    function update() {
        if (count < target) {
            count += Math.ceil(target / 100); 
            if (count > target) count = target;
            element.textContent = formatFn(count);
            setTimeout(update, speed);
        } else {
            element.textContent = formatFn(target);
        }
    }
    update();
}

// تنسيق الأرقام بفواصل
function formatNumber(num) {
    return num.toLocaleString('en-US');
}

// تابع بيشغل الكاونتر لما العنصر يظهر
function startCounterWhenVisible(el) {
    const target = +el.getAttribute('data-target');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(el, target, formatNumber, 10);
                obs.unobserve(el); // يشغله مرة واحدة بس
            }
        });
    }, { threshold: 0.5 }); // 0.5 يعني لازم نص العنصر يبان
    observer.observe(el);
}

// نطبّقها على كل الكاونترات
document.querySelectorAll('.counter, .counter-two, .counter-three, .counter-four')
    .forEach(startCounterWhenVisible);