import '@/scss/menu.scss'

window.addEventListener('click', showModal)

function showModal(ev) {
  if(ev.target.classList.contains('menu-button')){
    const btnName = ev.target.classList[1].split('-', 1)[0]
    if (!ev.target.classList.contains('newgame-button')){
      const modal = document.querySelector(`.${btnName}`)
      const cancelBtn = document.querySelector(`.${btnName}__cancel`)

      modal.style.display = 'block'

      cancelBtn.addEventListener('click', hideModal)
    
      function hideModal() {
        modal.style.display = 'none'
    
        cancelBtn.removeEventListener('click', hideModal)
    
      }
    } else {
      document.location.href = `./game.html`
    }
  } else if (ev.target.classList.contains('load')) {
    const loadNum = ev.target.classList[1]
    const notFound = document.querySelector('.not-found')

    console.log(loadNum, 'in menu.js')

    if (localStorage.getItem(loadNum)){
      document.location.href = `./game.html?loadNum=${ev.target.classList[1]}`
    } else {
      notFound.innerText = `Save ${loadNum} not found`
      setTimeout(() => {
        notFound.innerText = ''
      }, 2000)
    }
  }
}
