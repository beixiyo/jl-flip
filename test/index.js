import { Flip } from '../src'

const list = document.querySelector('.list')
let sourceEl
let flip

list.ondragstart = (e) => {
    setTimeout(() => e.target.classList.add('moving'))
    e.dataTransfer.effectAllowed = 'move'
    sourceEl = e.target
    flip = new Flip(list.children, 500)
}

list.ondragover = (e) => {
    e.preventDefault()
}

list.ondragenter = (e) => {
    e.preventDefault()
    if (e.target === list || e.target === sourceEl) {
        return
    }

    flip.swap(sourceEl, e.target, list)
    flip.play()
}

list.ondragend = (e) => {
    e.target.classList.remove('moving')
}
