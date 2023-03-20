---
Tree方法类型
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

树的操作函数类型。

## TreeDirectionFunc(待实现)

```typescript
type TreeDirectionFunc<T = any> = (
    treeNode: T,
    info: TreeNodeInfo<T>
) => number
```

定义迭代树的顺序，返回结果`>0`，则先迭代子节点，否则直接处理当前节点。

> `TreeDirectionFunc`暂未实现。