---
title: 获取树最大层级
---

# 获取树最大层级

## 方法使用

```js
import { getMaxLevel } from "yiu-tree"

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
const result = getMaxLevel(tree)
console.log(`最大层级数 :>> ${result}`)
```

## 方法说明


```plaintext
getMaxLevel(tree, [opt])
```

获取数的最大层级数。

如果是空数组，那么层级是`0`。