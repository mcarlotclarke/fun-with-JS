'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navLinks = document.querySelector('.nav__links');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// Modal window
const openModal = (e) => {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Button scroll
const scrollTo = () => {
  section1.scrollIntoView({ behavior: 'smooth' });
};

btnScrollTo.addEventListener('click', scrollTo);

// Page navigation (using event delegation with the parent element)
const smoothScroll = (e) => {
  e.preventDefault();
  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
};

navLinks.addEventListener('click', smoothScroll);

// Tabbed component
// As above, we are adding an event listener to the parent element using event delegation instead of adding it forEach element - which would slow down site performance if we had many elements.
const showTab = (e) => {
  const clicked = e.target.closest('.operations__tab');
  // Guard clause: if you click anywhere else but the buttons
  if (!clicked) return;
  // Active tab
  tabs.forEach((tab) => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach((c) => c.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');
  // Tab content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
};

tabsContainer.addEventListener('click', showTab);
