---
获取条件摇树结果
---

# 获取条件摇树结果

## 方法使用

```js
import { getShakeBySearch } from "yiu-tree"

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
const result = getShakeBySearch(tree, (node) => Array.isArray(node.children) && !!node.children.length)
console.log(`查询结果 :>> ${result}`)
```

## 方法说明

```txt
getShakeBySearch(tree, searchFunc, [opt])
```

方法默认开启深拷贝。

根据搜索方法进行摇树，将不符合搜索函数的节点摇掉。


- `NodeType`: `T`
- `getShakeBySearch<T>`: 泛型支持传入你定义的节点类型
- `tree`:
  - 类型: `T[]`
  - 说明: 传入的树数据
- `searchFunc`:
  - 类型: `(node: T, [nodeInfo: TreeNodeInfo<T>]) => boolean`
  - 说明: 搜索函数
- `opt`:
  - 类型: `TreeBaseOpt<T>`
  - 说明: 树配置


