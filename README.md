# Filp 动画

---

## 安装
```bash
npm i @jl-org/flip
```

## 使用

```ts
import { dataToTs } form '@jl-org/data-to-ts'

/** 标准 JSON */
const json = `{
    "lease": {
        "term": "36 months",
        "monthlyPayment": "$199",
        "dueAtSigning": "$3,000"
    },
    "purchase": {
        "price": "$21,570",
        "downPayment": "$2,500"
    }
}`

console.log(dataToTs(json, {
    enableExport: false,
    useTypeAlias: false,
    rootName: 'Test'
}).join('\n'))


/** JavaScript 对象字面量 */
const js1 = `const data = {
    lease: {
        term: '36 months',
        monthlyPayment: '$199',
        dueAtSigning: '$3,000'
    },
    purchase: {
        price: '$21,570',
        downPayment: '$2,500'
    }
}`
console.log(dataToTs(js1).join('\n'))


/** 混合单双引号的对象 */
const js2 = `var data = {
    "lease": {
        term: '36 months',
        monthlyPayment: '$199',
        dueAtSigning: '$3,000'
    },
    'purchase': {
        price: '$21,570',
        downPayment: '$2,500'
    }
}`
console.log(dataToTs(js2).join('\n'))


/** 没有命名的对象 */
const js3 = `{
    lease: {
        term: '36 months',
        monthlyPayment: '$199',
        dueAtSigning: '$3,000'
    },
    purchase: {
        price: '$21,570',
        downPayment: '$2,500'
    }
}`
console.log(dataToTs(js3).join('\n'))


/** 未声明的全局变量 */
const js4 = `a = {
    lease: {
        term: '36 months',
        monthlyPayment: '$199',
        dueAtSigning: '$3,000'
    },
    purchase: {
        price: '$21,570',
        downPayment: '$2,500'
    }
}`
console.log(dataToTs(js4).join('\n'))


/** 值带有冒号的 */
const js5 = `{
    jobName: "",
    "createdTime": "2024-04-28 14:24:54",
    "createdBy": ""
}`
console.log(dataToTs(js5).join('\n'))
```