# Filp 动画

> 给原生 HTML 添加丝滑的拖拽交换效果

---

## 安装
```bash
npm i @jl-org/flip
```

> `iife` 模式下，全局对象名为：*_flip*

## 使用

```ts
import { toDrag } form '@jl-org/flip'

toDrag('.list', {
    draggingClass: 'dragging',
    duration: 500,
})
```

```html
<div class="list">
    <div class="list-item">1</div>
    <div class="list-item">2</div>
    <div class="list-item">3</div>
    <div class="list-item">4</div>
    <div class="list-item">5</div>
    <div class="list-item">6</div>
</div>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .list {
        width: 300px;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    .list-item {
        margin: 5px 0;
        padding: 0 20px;
        line-height: 40px;
        height: 40px;
        background: linear-gradient(to right, #267871, #136a8a);
        color: #fff;
        cursor: move;
        user-select: none;
        border-radius: 5px;
        width: 40%;
    }

    .list-item.dragging {
        background: transparent;
        color: transparent;
        border: 1px dashed #ccc;
    }
</style>
```