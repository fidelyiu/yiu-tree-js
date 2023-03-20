// declare global {
//     const __YiuTreeWorn__: any
// }

export type TreeNodeInfo<T = any> = {
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

/**
 * 树的搜索函数类型
 */
export type TreeSearchFunc<T = any> = (
    treeNode: T,
    info: TreeNodeInfo<T>
) => boolean

/**
 * 树的操作函数类型
 */
export type TreeOperationFunc<T = any> = (
    treeNode: T,
    info: TreeNodeInfo<T>
) => void

export type TreeKeyType = 'id' | 'pid' | 'children'
export type TreeBaseOpt<T = any> = {
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
    direction?: boolean
}

/**
 * 树的过滤配置类型
 */
export type TreeFilterOpt<T = any> = {
    /**
     * 默认false，父节点是否必须 需要匹配
     */
    parentMatch?: boolean
    /**
     * 默认false，子节点是否必须 需要匹配
     */
    childrenMatch?: boolean
} & TreeBaseOpt<T>
