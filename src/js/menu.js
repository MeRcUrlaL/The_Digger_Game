import '@/scss/menu.scss'

window.addEventListener('click', showModal, false)

let confirmRemove
let timerId

function showModal(ev) {
  clearTimeout(timerId)

  if(ev.target.classList.contains('menu-button')){
    const btnName = ev.target.classList[1].split('-', 1)[0]
    if (!ev.target.classList.contains('newgame-button')){
      const modal = document.querySelector(`.${btnName}`)
      const cancelBtn = document.querySelector(`.${btnName}__cancel`)

      if (btnName == 'loading') {
        loadPlayTime()
      }
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
    const info = document.querySelector('.info')

    if (localStorage.getItem(`${loadNum}_gameField`) && localStorage.getItem(`${loadNum}_digger`)){
      document.location.href = `./game.html?loadNum=${ev.target.classList[1]}`
    } else if(localStorage.getItem(`${loadNum}_gameField`) || localStorage.getItem(`${loadNum}_digger`)) {
      info.innerHTML = `Save ${loadNum} is broken. Please describe the issue in <a style="color: black;" target="_blank" href="https://github.com/MeRcUrlaL/The_Digger_Game/issues">GitHub Issues</a>`
      timerId = setTimeout(() => {
        info.innerText = ''
      }, 10000)
    } else {
      info.innerText = `Save ${loadNum} not found`
      timerId = setTimeout(() => {
        info.innerText = ''
      }, 2000)
    }
  } else if (ev.target.classList.contains('remove')) {
    const loadNum = ev.target.parentElement.classList[1]
    const info = document.querySelector('.info')
    if (localStorage.getItem(`${loadNum}_gameField`) || localStorage.getItem(`${loadNum}_digger`)) {
      if (loadNum === confirmRemove && confirmRemove !== 'canceled') {
        confirmRemove = undefined
        localStorage.removeItem(`${loadNum}_gameField`)
        localStorage.removeItem(`${loadNum}_digger`)
        localStorage.removeItem(`${loadNum}_minutes`)
        info.innerText = `Save ${loadNum} has been removed`
        timerId = setTimeout(() => {
          info.innerText = ''
        }, 2000)
        loadPlayTime()
      } else {
        info.innerText = 'Click again to confirm'
        timerId = setTimeout(() => {
          info.innerText = ''
          if(confirmRemove != undefined) {
            confirmRemove = 'canceled'
          }
        }, 5000)
      }

      confirmRemove = loadNum
    } else {
      info.innerText = 'No save found'
      timerId = setTimeout(() => {
        info.innerText = ''
      }, 4000)
    }
  }
}

export function loadPlayTime() {
  for (let i = 1; i <= 5; i++) {
    const minutes = JSON.parse(localStorage.getItem(`load${i}_minutes`))
    const timeInfo = document.querySelector(`.time${i}`)
    if(minutes){
      timeInfo.innerHTML = `${Math.floor(minutes / 60)} hours <br> ${minutes % 60} minutes`
    } else {
      timeInfo.innerHTML = 'Empty'
    }
  }
}
