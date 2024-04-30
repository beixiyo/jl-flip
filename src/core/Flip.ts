import { FlipDOM, type Pos } from './FlipDOM'


export class Flip {

    flipDOMs: Set<FlipDOM>

    constructor(doms: HTMLElement[], private duration = 0.5) {
        const flipDOMArr = [...doms].map((it) => new FlipDOM(it, duration))
        this.flipDOMs = new Set(flipDOMArr)
        this.flipDOMs.forEach((it) => it.setPos())
    }

    addDOM(dom: HTMLElement, firstPos: Pos) {
        const flipDOM = new FlipDOM(dom, this.duration)
        this.flipDOMs.add(flipDOM)
        flipDOM.setPos(firstPos)
    }

    /**
     * 交换完位置后，调用它执行动画
     */
    play() {
        let gs = [...this.flipDOMs]
            .map((it) => {
                const generator = it.play()
                return {
                    generator,
                    iteratorResult: generator.next(),
                }
            })
            .filter((g) => !g.iteratorResult.done)

        while (gs.length > 0) {
            gs = gs
                .map((g) => {
                    g.iteratorResult = g.generator.next()
                    return g
                })
                .filter((g) => !g.iteratorResult.done)
        }
    }

    /**
     * 交换元素位置
     */
    swap(sourceEl: HTMLElement, targetEl: HTMLElement, parentEl: HTMLElement) {
        const doms = [...parentEl.children],
            sourceIndex = doms.indexOf(sourceEl),
            targetIndex = doms.indexOf(targetEl)

        if (sourceIndex < targetIndex) {
            parentEl.insertBefore(sourceEl, targetEl.nextElementSibling)
        }
        else {
            parentEl.insertBefore(sourceEl, targetEl)
        }
    }
}