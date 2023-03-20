---
操作所有节点
---

# 操作所有节点

## 方法使用

```js
import { opAll } from "yiu-tree"

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
const result = opAll(tree, (node) => node.name = `${node.id}-name`)
console.log(`操作后的树 :>> ${result}`)
```

## 方法说明

```plaintext
opAll(tree, opFunc, [opt])
```

方法默认开启深拷贝。

将所有节点处理之后，再返回处理过的树，你可以理解为`array.forEach()`中修改`item`。

- `NodeType`: `T`
- `opAll<T>`: 泛型支持传入你定义的节点类型
- `tree`:
  - 类型: `T[]`
  - 说明: 传入的树数据
- `opFunc`:
  - 类型: `(node: T, [nodeInfo: TreeNodeInfo<T>]) => void`
  - 说明: 操作函数
- `opt`:
  - 类型: `TreeBaseOpt<T>`
  - 说明: 树配置
