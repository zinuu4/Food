function modal() {
  // Modal

  const modalOpenBtn = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

  modalOpenBtn.forEach(item => {
    item.addEventListener('click', openModal)
  });

  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  }
  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  window.addEventListener("keydown", (e) => {
    if (e.code == 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 50000);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) { // Прокрученная часть + та часть, которая сейчас на экране >= высоте странички -1 px(так как без этого не во всех браузерах работает)
      openModal();
      window.removeEventListener('scroll', showModalByScroll); // После 1 показа модального окна обработчик событий удаляется и окно больше не появится при скроле
    }
  }

  window.addEventListener('scroll', showModalByScroll)

}

module.exports = modal;