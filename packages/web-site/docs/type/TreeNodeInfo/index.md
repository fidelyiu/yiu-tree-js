---
title: Tree节点信息类型
---

# Tree节点信息类型

```typescript
type TreeNodeInfo<T = any> = {
    /**
     * 层级数，从1开始
     */
    level: number
    /**
     * 当前List中索引数，从0开始
     */
    index: number
    /**
     * 是否是叶子节点
     */
    isLeaf: boolean
    /**
     * 是否是第一个节点
     */
    isFirst: boolean
    /**
     * 是否是最后一个节点
     */
    isLast: boolean
    /**
     * 父节点
     */
    parent: T | undefined
    /**
     * 节点路径
     */
    path: readonly T[]
    /**
     * 父节点路径
     */
    parentPath: readonly T[]
}
```
