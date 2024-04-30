import { Flip } from './core/Flip'


/**
 * 为元素添加拖拽功能，返回一个销毁函数
 * @param selector 选择器
 */
export function toDrag(selector: string | HTMLElement, config: FilpConfig = {}) {
    let parentEl: HTMLElement
    if (typeof selector === 'string') {
        parentEl = document.querySelector(selector)
    }
    else {
        parentEl = selector
    }

    let flip: Flip,
        sourceEl: HTMLElement
    const { draggingClass = 'dragging', duration = 500 } = config

    toDraggable(parentEl.children)
    parentEl.addEventListener('dragstart', onDragStart)
    parentEl.addEventListener('dragover', onDragOver)
    parentEl.addEventListener('dragenter', onDragEnter)
    parentEl.addEventListener('dragend', onDragEnd)

    return () => {
        parentEl.removeEventListener('dragstart', onDragStart)
        parentEl.removeEventListener('dragover', onDragOver)
        parentEl.removeEventListener('dragenter', onDragEnter)
        parentEl.removeEventListener('dragend', onDragEnd)
    }


    function onDragStart(e: DragEvent) {
        const target = e.target as HTMLElement

        e.dataTransfer.effectAllowed = 'move'
        sourceEl = target
        flip = new Flip(parentEl.children, duration)
        setTimeout(() => target.classList.add(draggingClass))
    }

    function onDragOver(e: DragEvent) {
        e.preventDefault()
    }

    function onDragEnter(e: DragEvent) {
        e.preventDefault()
        const target = e.target as HTMLElement

        if (target === parentEl || target === sourceEl) {
            return
        }

        flip.swap(sourceEl, target, parentEl)
        flip.play()
    }

    function onDragEnd(e: DragEvent) {
        const target = e.target as HTMLElement
        target.classList.remove(draggingClass)
    }
}

function toDraggable(el: HTMLCollection) {
    [...el].forEach((item) => {
        item.setAttribute('draggable', 'true')
    })
}


type FilpConfig = {
    /** 默认 500 */
    duration?: number
    /** 默认 dragging */
    draggingClass?: string
}