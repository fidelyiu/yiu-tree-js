---
title: 展开树
---

# 展开树

## 方法使用

```js
import { getFlatListByTree } from "yiu-tree"

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
const result = getFlatListByTree(tree)
console.log(`展开结果 :>> ${result}`)
```

## 方法说明

```plaintext
getFlatListByTree(tree, [opt])
```

方法默认开启深拷贝。

将树全部展平为一维数组。

- `NodeType`: `T`
- `getFlatListByTree<T>`: 泛型支持传入你定义的节点类型
- `tree`:
  - 类型: `T[]`
  - 说明: 传入的树数据
- `opt`:
  - 类型: `TreeBaseOpt<T>`
  - 说明: 树配置
