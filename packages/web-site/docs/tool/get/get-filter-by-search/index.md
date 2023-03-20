---
title: 根据条件搜索树
---

# 根据条件搜索树

## 方法使用

```js
import { getFilterBySearch } from "yiu-tree"

const tree = [
    { id: 1, children: [
        { id: '1-1', children: [
            { id: '1-1-1' }, { id: '1-1-2' }] },
        { id: '1-2' },
        { id: '1-3' } ],
    },
    { id: 2, children: [
        { id: '2-1' }] },
    { id: 3 },
    { id: 4 },
]
const result = getFilterBySearch(tree, (node) => node.id === 2)
console.log(`过滤结果 :>> ${result}`)
```

## 方法描述

```
getFilterBySearch(tree, searchFunc, [opt])
```

方法默认开启深拷贝。

根据传入的搜索方法返回负荷条件的树。

- `NodeType`: `T`
- `getFilterBySearch<T>`: 泛型支持传入你定义的节点类型
- `tree`:
  - 类型: `T[]`
  - 说明: 传入的树数据
- `searchFunc`:
  - 类型: `(node: T, [nodeInfo: TreeNodeInfo<T>]) => boolean`
  - 说明: 搜索函数
- `opt`:
  - 类型: `TreeFilterOpt<T>`
  - 说明: 过滤配置


## 配置说明

在`TreeFilterOpt`中有两项配置对于过滤来说很重要：

|    参数名称     |   类型    | 默认值  |        说明        |
| :-------------: | :-------: | :-----: | :----------------: |
|  `parentMatch`  | `boolean` | `false` | 父节点是否需要匹配 |
| `childrenMatch` | `boolean` | `true`  | 子节点是否需要匹配 |


二者搭配出来的过滤效果如下：


| `parentMatch` | `childrenMatch` |                                 说明                                 |
| :-----------: | :-------------: | :------------------------------------------------------------------: |
|    `false`    |     `false`     | 当一个节点匹配搜索函数后，将忽略其父节点、子节点、子孙节点的匹配结果 |
|    `false`    |     `true`      |          当一个节点匹配搜索函数后，将忽略其父节点的匹配结果          |
|    `true`     |     `true`      |                       所有节点都会进行函数匹配                       |
|    `true`     |     `false`     |       当一个节点匹配搜索函数后，其所有子节点、子孙节点都会匹配       |