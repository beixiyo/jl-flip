export class FlipDOM {

    isPlaying = false
    transition: string
    firstPos = {
        x: 0,
        y: 0,
    }

    onTransitionEnd: VoidFunction

    constructor(public dom: HTMLElement, duration = 500) {
        this.transition = typeof duration === 'number'
            ? `${duration}ms`
            : duration

        this.onTransitionEnd = () => {
            this.isPlaying = false
            this.setPos()
        }
    }

    getPos() {
        const { left, top } = this.dom.getBoundingClientRect()
        return {
            x: left,
            y: top,
        }
    }

    setPos(firstPos?: Pos) {
        if (!firstPos) {
            firstPos = this.getPos()
        }
        this.firstPos.x = firstPos.x
        this.firstPos.y = firstPos.y
    }

    *play() {
        if (!this.isPlaying) {
            this.dom.style.transition = 'none'

            const lastPos = this.getPos()
            const dis = {
                x: lastPos.x - this.firstPos.x,
                y: lastPos.y - this.firstPos.y,
            }
            if (!dis.x && !dis.y) {
                return
            }

            /**
             * 外面使用 insertBefore 交换元素位置
             * 然后调用这个方法，就会把位置设置回去
             * 并停止在 yield 这里
             * 
             * 等待下一次调用生成器的 next
             * 然后开启动画，把位置设置回去，即可实现动画
            */
            this.dom.style.transform = `translate(${-dis.x}px, ${-dis.y}px)`

            yield 'moveToFirst'
            this.isPlaying = true
        }

        document.body.clientWidth
        this.dom.style.transition = this.transition
        this.dom.style.transform = `none`
        this.setEvent()
    }

    setEvent() {
        this.dom.removeEventListener('transitionend', this.onTransitionEnd)
        this.dom.addEventListener('transitionend', this.onTransitionEnd)
    }
}

export type Pos = { x: number, y: number }