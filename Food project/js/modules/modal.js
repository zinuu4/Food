function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';

  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}
function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {

  const modalOpenBtn = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

  modalOpenBtn.forEach(item => {
    item.addEventListener('click', () => openModal(modalSelector, modalTimerId))
  });

  window.addEventListener("keydown", (e) => {
    if (e.code == 'Escape' && modal.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) { // Прокрученная часть + та часть, которая сейчас на экране >= высоте странички -1 px(так как без этого не во всех браузерах работает)
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll); // После 1 показа модального окна обработчик событий удаляется и окно больше не появится при скроле
    }
  }

  window.addEventListener('scroll', showModalByScroll)

}

export default modal;
export {closeModal};
export {openModal};