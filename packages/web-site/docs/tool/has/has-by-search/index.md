---
title: 是否存在一个节点
---

# 是否存在一个节点

## 方法使用

```js
import { hasBySearch } from "yiu-tree"

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
const result = hasBySearch(tree, (node) => node.id === 2)
console.log(`是否存在节点 :>> ${result}`)
```

## 方法说明

```
hasBySearch(tree, searchFunc, [opt])
```

方法默认关闭深拷贝。

根据搜索方法在树中查询一个节点，如果存在该节点，那么立马返回`true`。


- `NodeType`: `T`
- `hasBySearch<T>`: 泛型支持传入你定义的节点类型
- `tree`:
  - 类型: `T[]`
  - 说明: 传入的树数据
- `searchFunc`:
  - 类型: `(node: T, [nodeInfo: TreeNodeInfo<T>]) => boolean`
  - 说明: 搜索函数
- `opt`:
  - 类型: `TreeBaseOpt<T>`
  - 说明: 树配置


