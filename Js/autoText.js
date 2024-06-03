var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };
  
  TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
  
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
  
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
    var that = this;
    var delta = 300 - Math.random() * 100;
  
    if (this.isDeleting) { delta /= 2; }
  
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }
  
    setTimeout(function() {
      that.tick();
    }, delta);
  };
  
  window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.05em solid #666 }";
    document.body.appendChild(css);
  };
  
  // slider
  
  const upBtn = document.querySelector('.up-button');
  const downBtn = document.querySelector('.down-button');
  const sidebar = document.querySelector('.sidebar');
  const container =  document.querySelector('.container');
  const mainSlide = document.querySelector('.main-slide');
  const slidesCount = mainSlide.querySelectorAll('div').length;
  
  let activeSlideIndex = 0;
  
  sidebar.style.top = `-${(slidesCount - 1) * 100}vh`;
  
  upBtn.addEventListener('click', () => {
      changeSlide('up');
  });
  
  downBtn.addEventListener('click', () => {
      changeSlide('down');
  });
  
  document.addEventListener('keydown', event => {
      if (event.key === 'ArrowUp') {
          changeSlide('up');
      } else if (event.key === 'ArrowDown') {
          changeSlide('down');
      }
  });
  
  function changeSlide(direction) {
      if (direction == 'up') {
          activeSlideIndex++
          if(activeSlideIndex === slidesCount) {
              activeSlideIndex = 0
          }
      } else if (direction === 'down') {
          activeSlideIndex--
          if (activeSlideIndex < 0) {
              activeSlideIndex = slidesCount - 1
          }
      } 
      const height = container.clientHeight
  
      mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`
      
      sidebar.style.transform = `translateY(${activeSlideIndex * height}px)`
  
  };