---
title: 获取叶子节点
---

# 获取叶子节点

## 方法使用

```js
import { getLeafNodeByList } from "yiu-tree"

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
const result = getLeafNodeByList(nodeList)
console.log(`叶子节点结果 :>> ${result}`)
```

## 方法说明


```txt
getLeafNodeByList(nodeList, [opt])
```

方法默认开启深拷贝。

从一维数组中过滤出所有叶子节点数组，注意是从一维数组到一维数组，节点不需要是树结构。

- `NodeType`: `T`
- `getLeafNodeByList<T>`: 泛型支持传入你定义的节点类型
- `nodeList`:
  - 类型: `T[]`
  - 说明: 传入的树数据
- `opt`:
  - 类型: `TreeBaseOpt<T>`
  - 说明: 树配置
