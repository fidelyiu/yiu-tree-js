---
Tree节点配置类型
---

# Tree节点配置类型

## TreeBaseOpt

```typescript
type TreeBaseOpt<T = any> = {
    /**
     * 使用`key`解析时
     */
    idProp?: string
    pidProp?: string
    childrenProp?: string
    /**
     * 使用`func`解析时
     */
    idGetter?: (treeNode: T) => any
    idSetter?: (treeNode: T, value: any) => void
    pidGetter?: (treeNode: T) => string
    pidSetter?: (treeNode: T, value: any) => void
    childrenGetter?: (treeNode: T) => T[] | undefined
    childrenSetter?: (treeNode: T, value: any) => void

    /**
     * 是否深拷贝
     */
    deepClone?: boolean
    /**
     * 深拷贝函数
     * 默认`JSON.parse(JSON.stringify(data))`
     */
    deepCloneFunc?: (d: T[]) => T[] | undefined

    /**
     * 当传参错误时是否警告
     */
    worn?: boolean
    /* 暂未实现 */
    direction?: TreeDirectionFunc<T>
}
```

### Prop & Getter & Setter

解析节点的信息主要包含`id`、`pid`、`children`。

如果你定义了`Prop`，那么工具就会通过你指定的`Prop`读取和写入。

如果你的这些信息获取方式比较复杂，那么你可以定义`Getter`、`Setter`方法，来进行读取和写入。

## TreeFilterOpt

```typescript
type TreeFilterOpt<T = any> = {
    /**
     * 默认false，父节点是否必须 需要匹配
     */
    parentMatch?: boolean
    /**
     * 默认false，子节点是否必须 需要匹配
     */
    childrenMatch?: boolean
} & TreeBaseOpt<T>
```
