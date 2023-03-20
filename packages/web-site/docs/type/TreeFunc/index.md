---
title: Tree方法类型
---

# Tree方法类型

## TreeSearchFunc

```typescript
type TreeSearchFunc<T = any> = (
    treeNode: T,
    info: TreeNodeInfo<T>
) => boolean
```

树的搜索函数类型，尽量不要在`search`函数中修改节点数据。


## TreeOperationFunc

```typescript
type TreeOperationFunc<T = any> = (
    treeNode: T,
    info: TreeNodeInfo<T>
) => void
```
