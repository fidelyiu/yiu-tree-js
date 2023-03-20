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

```plaintext
getFilterBySearch(tree, searchFunc, [opt])
```

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
  - 说明: 过滤的配置