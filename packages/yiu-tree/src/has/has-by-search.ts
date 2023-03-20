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
    for (let i = 0; i < treeDataLen; i++) {
        const treeNode = treeData[i]
        const currentPath = [...nodePath, treeNode]
        const children = getTreePropsValue<T>(treeNode, 'children', opt)
        const childrenIsArr = Array.isArray(children)
        const childrenLen = childrenIsArr ? children.length : 0

        const nodeInfo = {
            level: currentLevel + 1,
            index: i,
            isLeaf: !childrenLen,
            isFirst: i === 0,
            isLast: i === treeDataLen - 1,
            parent,
            path: currentPath,
            parentPath: nodePath,
        }

        if (opt?.direction) {
            /* 子节点 */
            if (childrenLen) {
                const childrenSearchResult = _hasBySearch<T>(
                    children,
                    scFunc,
                    currentLevel + 1,
                    treeNode,
                    currentPath,
                    opt
                )
                if (childrenSearchResult) return true
            }

            /* 当前节点 */
            const currentMatch = scFunc(treeNode, nodeInfo)
            if (currentMatch) return true
        } else {
            /* 当前节点 */
            const currentMatch = scFunc(treeNode, nodeInfo)
            if (currentMatch) return true

            /* 子节点 */
            if (childrenLen) {
                const childrenSearchResult = _hasBySearch<T>(
                    children,
                    scFunc,
                    currentLevel + 1,
                    treeNode,
                    currentPath,
                    opt
                )
                if (childrenSearchResult) return true
            }
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
