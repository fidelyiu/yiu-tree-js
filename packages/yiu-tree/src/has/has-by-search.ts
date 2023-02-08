import type { TreeBaseOpt, TreeSearchFunc } from '../type'
import getDeepTree from '../utils/get-deep-tree'
import getTreePropsValue from '../utils/get-tree-props-value'

function _hasBySearch<T>(
    treeData: Array<T>,
    scFunc: TreeSearchFunc<T>,
    currentLevel: number,
    parent: T | undefined,
    nodePath: Array<T>,
    opt?: TreeBaseOpt<T>
): boolean {
    const treeDataLen = treeData.length
    for (let index = 0; index < treeDataLen; index++) {
        const item = treeData[index]
        const currentPath = nodePath.slice()
        currentPath.push(item)
        const children = getTreePropsValue<T>(item, 'children', opt)
        let childrenLen = 0
        if (Array.isArray(children)) childrenLen = children.length
        if (
            scFunc(item, {
                level: currentLevel + 1,
                index,
                isLeaf: !childrenLen,
                isFirst: index === 0,
                isLast: index === treeData.length - 1,
                parent,
                path: currentPath,
                parentPath: nodePath,
            })
        ) {
            return true
        }
        if (
            childrenLen &&
            _hasBySearch<T>(
                children,
                scFunc,
                currentLevel + 1,
                item,
                currentPath,
                opt
            )
        ) {
            return true
        }
    }
    return false
}

/**
 * 判断树中是否有符合查询函数的节点
 * @param treeData 树数据
 * @param scFunc 查询函数
 * @param opt 树解析配置
 * @returns
 */
export default function hasBySearch<T>(
    treeData: Array<T>,
    scFunc: TreeSearchFunc<T>,
    opt?: TreeBaseOpt<T>
): boolean {
    if (typeof scFunc !== 'function') return false
    const deepData = getDeepTree<T>(treeData, opt, false)
    if (!Array.isArray(deepData) || !deepData.length) return false
    return _hasBySearch<T>(deepData, scFunc, 0, undefined, [], opt)
}
