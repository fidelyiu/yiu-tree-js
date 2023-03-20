---
简单数组构造树
---

# 简单数组构造树

## 方法使用

```js
import { getTreeByListSimple } from "yiu-tree"

const nodeList = [
    { id: 1 },
    { id: '1-1', pid: 1 },
    { id: '1-1-1', pid: '1-1' },
    { id: '1-1-2', pid: '1-1' },
    { id: '1-2', pid: 1 },
    { id: '1-3', pid: 1 },
    { id: 2 },
    { id: '2-1', pid: 2 },
    { id: 3 },
    { id: 4 },
]
const result = getTreeByListSimple(nodeList)
console.log(`构造的树 :>> ${result}`)
```

## 方法说明

```txt
getTreeByListSimple(nodeList, [opt])
```

方法默认开启深拷贝。

简单的从数组中构造树，构造的依据是节点的`pid`，如果定义的`pid`在数组找不到父节点，那么这个节点将会被抛弃，根节点的`pid`一定不能设置。

该方法性能比`getTreeByList`高。

- `NodeType`: `T`
- `getTreeByListSimple<T>`: 泛型支持传入你定义的节点类型
- `nodeList`:
  - 类型: `T[]`
  - 说明: 传入的树数据
- `opt`:
  - 类型: `TreeBaseOpt<T>`
  - 说明: 树配置
