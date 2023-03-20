import type { TreeBaseOpt, TreeSearchFunc } from '../type'
import getDeepTree from '../utils/get-deep-tree'
import getTreePropsValue from '../utils/get-tree-props-value'

function _getOneNodePathBySearch<T>(
    treeData: Array<T>,
    scFunc: TreeSearchFunc<T>,
    currentLevel: number,
    parent: T | undefined,
    nodePath: Array<T>,
    opt?: TreeBaseOpt<T>
): Array<T> {
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
            if (childrenLen) {
                const childrenResult = _getOneNodePathBySearch<T>(
                    children,
                    scFunc,
                    currentLevel + 1,
                    treeNode,
                    currentPath,
                    opt
                )
                if (childrenResult.length) return childrenResult
            }
            const currentMatch = scFunc(treeNode, nodeInfo)
            if (currentMatch) return currentPath
        } else {
            const currentMatch = scFunc(treeNode, nodeInfo)
            if (currentMatch) return currentPath
            if (childrenLen) {
                const childrenResult = _getOneNodePathBySearch<T>(
                    children,
                    scFunc,
                    currentLevel + 1,
                    treeNode,
                    currentPath,
                    opt
                )
                if (childrenResult.length) return childrenResult
            }
        }
    }
    return []
}

/**
 * 获取一个节点元素的元素路径
 *
 * 默认深拷贝
 *
 * @param treeData 树
 * @param scFunc 过滤条件，返回true则立即返回该节点（不要修改节点）
 * @param opt 解析节点配置
 * @returns 找到的节点即父节点数组
 */
export default function getOneNodePathBySearch<T>(
    treeData: Array<T>,
    scFunc: TreeSearchFunc<T>,
    opt?: TreeBaseOpt<T>
): Array<T> {
    if (typeof scFunc !== 'function') return []
    const deepData = getDeepTree<T>(treeData, opt, true)
    if (!Array.isArray(deepData) || !deepData.length) return []
    return _getOneNodePathBySearch<T>(deepData, scFunc, 0, undefined, [], opt)
}
