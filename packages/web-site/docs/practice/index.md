---
title: 实践&建议
---

# 实践&建议

## 节点

节点尽量简单，不要有**循环引用**，否则可能存在死循环问题。

## 深拷贝

`YiuTree`的深拷贝默认使用`JSON.parse(JSON.stringify(treeData))`，如果这不满足你的要求，你可以使用`TreeBaseOpt.deepClone`或`TreeBaseOpt.deepCloneFunc`进行修改。

### 禁用深拷贝

```js
const result = getFilterBySearch([], (node) => true, { deepClone: false })
```

### 替换深拷贝方法

```js
import { cloneDeep } from "lodash"

const result = getFilterBySearch([], (node) => true, { deepCloneFunc: cloneDeep })
```
