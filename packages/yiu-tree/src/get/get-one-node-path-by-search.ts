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
            return [item]
        }
        if (childrenLen) {
            const childrenResult = _getOneNodePathBySearch<T>(
                children,
                scFunc,
                currentLevel + 1,
                item,
                currentPath,
                opt
            )
            if (childrenResult && childrenResult.length) {
                return [item, ...childrenResult]
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
