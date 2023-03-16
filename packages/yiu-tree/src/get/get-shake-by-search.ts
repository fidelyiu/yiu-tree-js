import { TreeBaseOpt, TreeSearchFunc } from '../type'
import getDeepTree from '../utils/get-deep-tree'
import getTreePropsValue from '../utils/get-tree-props-value'
import setTreePropsValue from '../utils/set-tree-props-value'

function _getShakeBySearch<T>(
    treeData: T[],
    scFunc: TreeSearchFunc<T>,
    currentLevel: number,
    parent: any,
    nodePath: Array<T>,
    opt: TreeBaseOpt<T>
): { data: T[]; hasShake: boolean } {
    let shakeResult = false
    let hasShake = false
    const result: T[] = []
    if (!Array.isArray(treeData) || !treeData.length) {
        return {
            data: result,
            hasShake,
        }
    }
    do {
        hasShake = false
        const treeDataLen = treeData.length
        for (let i = 0; i < treeDataLen; i++) {
            const treeNode = treeData[i]
            const currentPath = [...nodePath, treeNode]
            const children = getTreePropsValue<T>(treeNode, 'children', opt)
            const childrenIsArr = Array.isArray(children)
            const childrenLen = childrenIsArr ? children.length : 0
            if (childrenLen !== 0) {
                const shakeChildren = _getShakeBySearch<T>(
                    children,
                    scFunc,
                    currentLevel + 1,
                    treeNode,
                    currentPath,
                    opt
                )

                if (shakeChildren.hasShake) {
                    shakeResult = true
                    hasShake = true
                }

                setTreePropsValue<T>(
                    treeNode,
                    'children',
                    shakeChildren.data,
                    opt
                )
            }

            // 当前节点是否匹配
            const currentMatch = !!scFunc(treeNode, {
                level: currentLevel + 1,
                index: i,
                isLeaf: !childrenLen,
                isFirst: i === 0,
                isLast: i === treeDataLen - 1,
                parent,
                path: currentPath,
                parentPath: nodePath,
            })

            if (currentMatch) {
                result.push(treeNode)
            } else {
                shakeResult = true
                hasShake = true
            }
        }
    } while (hasShake)
    treeData = result
    return { data: result, hasShake: shakeResult }
}

export default function getShakeBySearch<T>(
    treeData: T[],
    scFunc: TreeSearchFunc<T>,
    opt?: TreeBaseOpt<T>
): T[] {
    if (typeof scFunc !== 'function') return []
    const defOpt: TreeBaseOpt<T> = {}
    const baseOpt: TreeBaseOpt<T> = Object.assign(defOpt, opt)
    const deepData = getDeepTree<T>(treeData, baseOpt, true)
    if (!Array.isArray(deepData) || !deepData.length) return []
    return _getShakeBySearch<T>(deepData, scFunc, 0, undefined, [], baseOpt)
        .data
}
