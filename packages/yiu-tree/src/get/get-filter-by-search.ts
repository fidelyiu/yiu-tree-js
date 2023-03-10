import type { TreeFilterOpt, TreeSearchFunc } from '../type'
import getDeepTree from '../utils/get-deep-tree'
import getTreePropsValue from '../utils/get-tree-props-value'
import setTreePropsValue from '../utils/set-tree-props-value'

function _getFilterBySearch<T>(
    treeData: Array<T>,
    scFunc: TreeSearchFunc<T>,
    currentLevel: number,
    parent: any,
    nodePath: Array<T>,
    opt: TreeFilterOpt<T>
): Array<T> {
    const result: Array<T> = []
    const { parentMatch, childrenMatch } = opt
    const treeDataLen = treeData.length
    if (!parentMatch) {
        // 父节点不需要匹配
        for (let i = 0; i < treeDataLen; i++) {
            const treeNode = treeData[i]
            const currentPath = [...nodePath, treeNode]
            const children = getTreePropsValue<T>(treeNode, 'children', opt)
            const childrenIsArr = Array.isArray(children)
            const childrenLen = childrenIsArr ? children.length : 0
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

            if (!childrenMatch && currentMatch) {
                /* 如果当前节点匹配了，且子节点就不需要匹配 */
                result.push(treeNode)
                continue
            }

            /* 过滤子节点 */
            const childrenFilterResult = childrenIsArr
                ? _getFilterBySearch<T>(
                      children,
                      scFunc,
                      currentLevel + 1,
                      treeNode,
                      currentPath,
                      opt
                  )
                : []
            /* 当前节点不匹配，子节点也全部不匹配 */
            if (!currentMatch && !childrenFilterResult.length) continue
            setTreePropsValue<T>(
                treeNode,
                'children',
                childrenFilterResult,
                opt
            )
            result.push(treeNode)
        }
    } else {
        // 父节点需求匹配
        for (let i = 0; i < treeDataLen; i++) {
            const treeNode = treeData[i]
            const currentPath = [...nodePath, treeNode]
            const children = getTreePropsValue<T>(treeNode, 'children', opt)
            const childrenIsArr = Array.isArray(children)
            const childrenLen = childrenIsArr ? children.length : 0
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
            // 不匹配直接跳过
            if (!currentMatch) continue

            let setChildrenValue = childrenIsArr ? children : []

            if (childrenMatch && childrenIsArr) {
                setChildrenValue = _getFilterBySearch<T>(
                    children,
                    scFunc,
                    currentLevel + 1,
                    treeNode,
                    currentPath,
                    opt
                )
            }

            setTreePropsValue<T>(treeNode, 'children', setChildrenValue, opt)
            result.push(treeNode)
        }
    }
    return result
}

/**
 * 过滤一个树，生成一个新的树
 *
 * 默认深拷贝
 *
 * @param treeData 树数据
 * @param scFunc 过滤函数（结果true则保留输出）
 * @param opt 过滤配置 & 树解析配置
 * @returns 新的树数据
 */
export default function getFilterBySearch<T>(
    treeData: Array<T>,
    scFunc: TreeSearchFunc<T>,
    opt?: TreeFilterOpt<T>
): Array<T> {
    if (typeof scFunc !== 'function') return []
    const defOpt: TreeFilterOpt<T> = { parentMatch: false, childrenMatch: true }
    const baseOpt: TreeFilterOpt<T> = Object.assign(defOpt, opt)
    const deepData = getDeepTree<T>(treeData, baseOpt, true)
    if (!Array.isArray(deepData) || !deepData.length) return []
    return _getFilterBySearch<T>(deepData, scFunc, 0, undefined, [], baseOpt)
}
