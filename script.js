const loadImage = (url) => {
  if (localStorage.getItem(url)) {
    return localStorage.getItem(url);
  } else {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.responseType = 'blob';

    xhr.send();

    if (xhr.status === 200) {
      let blob = xhr.response;
      let reader = new FileReader();

      reader.readAsDataURL(blob);

      reader.onloadend = () => {
        localStorage.setItem(url, reader.result);
      };

      return reader.result;
    }
  }
}

const loadImages = () => {
  let imgElements = document.querySelectorAll('img[data-src]');

  imgElements.forEach((img) => {
    let url = img.getAttribute('data-src');
    let imageData = loadImage(url);

    if (imageData) {
      img.setAttribute('src', imageData);
      img.removeAttribute('data-src');
    }
  });
}

window.addEventListener('load', loadImages);

let prevScrollPos = window.pageYOffset;

window.addEventListener('scroll', () => {
  let currentScrollPos = window.pageYOffset;
  let navbar = document.getElementById('navbar');
  let saya = document.getElementById('tentangSaya');

  const lazyImages = document.querySelectorAll('img[data-src]');

  lazyImages.forEach(function(img) {
    if (isInViewport(img)) {
      img.setAttribute('src', img.getAttribute('data-src'));
      img.removeAttribute('data-src');
    }
  });

  if (prevScrollPos > currentScrollPos) {
    if (currentScrollPos <= (saya.offsetTop - 83)) {
      navbar.style.backgroundColor = 'transparent';
    }
    navbar.classList.remove('navbar-hidden');
  } else {
    if (currentScrollPos <= (saya.offsetTop - 83)) {
      navbar.style.backgroundColor = 'transparent';
    } else {
      navbar.style.backgroundColor = 'rgb(16,24,32)';
    }
    navbar.classList.add('navbar-hidden');
  }
  
  prevScrollPos = currentScrollPos;
});

window.addEventListener('load', function() {
  const lazyImages = document.querySelectorAll('img[data-src]');

  lazyImages.forEach(function(img) {
    img.addEventListener('load', function() {
      img.classList.add('loaded');
    });
  });
});


let smoothScrollLinks = document.getElementsByClassName('smooth-scroll');

for (let i = 0; i < smoothScrollLinks.length; i++) {
  smoothScrollLinks[i].addEventListener('click', function (event) {
    event.preventDefault();

    let targetId = this.getAttribute('href');
    let targetElement = document.querySelector(targetId);

    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
      duration: 800
    });
  });
}

let optionSp = document.getElementById('btnSp');

optionSp.addEventListener('click', () => {
    navbar.style.display = 'none';
    document.getElementById('optionSp').classList.add('active');
});

let closeSp = document.getElementById('closeSp');

let hide = () => {
  navbar.style.display = 'block';
  document.getElementById('optionSp').classList.remove('active');
}

closeSp.addEventListener('click', () => {
  navbar.style.display = 'block';
  document.getElementById('optionSp').classList.remove('active');
});
