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
    if (parentMatch) {
        // 父节点必须匹配
        for (let index = 0; index < treeDataLen; index++) {
            const treeNode = treeData[index]
            const currentPath = [...nodePath, treeNode]
            // 处理子节点
            const children = getTreePropsValue<T>(treeNode, 'children', opt)

            const childrenLen = (children || []).length
            // 当前节点是否匹配
            const currentMatch = scFunc(treeNode, {
                level: currentLevel + 1,
                index,
                isLeaf: !childrenLen,
                isFirst: index === 0,
                isLast: index === treeDataLen - 1,
                parent,
                path: currentPath,
                parentPath: nodePath,
            })
            // 不匹配直接跳过
            if (!currentMatch) continue
            if (Array.isArray(children) && childrenLen) {
                if (childrenMatch) {
                    setTreePropsValue(
                        treeNode,
                        'children',
                        _getFilterBySearch<T>(
                            children,
                            scFunc,
                            currentLevel + 1,
                            treeNode,
                            currentPath,
                            opt
                        ),
                        opt
                    )
                }
            } else {
                setTreePropsValue(treeNode, 'children', [], opt)
            }
            result.push(treeNode)
        }
    } else {
        // 父节点不需要匹配
        // 此时需要考虑，子节点是否匹配
        for (let index = 0; index < treeDataLen; index++) {
            const treeNode = treeData[index]
            const currentPath = nodePath.slice()
            currentPath.push(treeNode)
            const children = getTreePropsValue<T>(treeNode, 'children', opt)
            let childrenLen = 0
            if (Array.isArray(children)) childrenLen = children.length
            // 当前节点是否匹配
            const currentMatch = !!scFunc(treeNode, {
                level: currentLevel + 1,
                index,
                isLeaf: !childrenLen,
                isFirst: index === 0,
                isLast: index === treeDataLen - 1,
                parent,
                path: currentPath,
                parentPath: nodePath,
            })
            if (currentMatch) {
                // 如果当前节点匹配了，就直接处理子节点
                if (childrenMatch) {
                    setTreePropsValue<T>(
                        treeNode,
                        'children',
                        _getFilterBySearch<T>(
                            children,
                            scFunc,
                            currentLevel + 1,
                            treeNode,
                            currentPath,
                            opt
                        ),
                        opt
                    )
                }
                result.push(treeNode)
            } else {
                // 当前节点不匹配
                if (Array.isArray(children) && childrenLen) {
                    const childrenMatchResult = _getFilterBySearch<T>(
                        children,
                        scFunc,
                        currentLevel + 1,
                        treeNode,
                        currentPath,
                        opt
                    )
                    // 如果此时还存在子节点就输出
                    if (
                        Array.isArray(childrenMatchResult) &&
                        childrenMatchResult.length
                    ) {
                        // 将节点按照当前查询条件再过滤一遍
                        setTreePropsValue<T>(
                            treeNode,
                            'children',
                            childrenMatchResult,
                            opt
                        )
                        result.push(treeNode)
                    }
                }
            }
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
    const baseOpt: TreeFilterOpt<T> = Object.assign({}, opt)
    const deepData = getDeepTree<T>(treeData, baseOpt, true)
    if (!Array.isArray(deepData) || !deepData.length) return []
    return _getFilterBySearch<T>(deepData, scFunc, 0, undefined, [], baseOpt)
}
