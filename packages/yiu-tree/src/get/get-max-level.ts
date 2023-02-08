import type { TreeBaseOpt } from '../type'
import getTreePropsValue from '../utils/get-tree-props-value'

function _getMaxLevel<T>(
    treeData: Array<T>,
    currentLevel: number,
    opt?: TreeBaseOpt<T>
): number {
    let result = currentLevel
    if (!Array.isArray(treeData) || !treeData.length) return currentLevel
    const loopLen = treeData.length
    result += 1
    let maxChildrenResult = 0
    for (let i = 0; i < loopLen; i++) {
        const item = treeData[i]
        const children = getTreePropsValue<T>(item, 'children', opt)
        if (!Array.isArray(children) || !children.length) continue
        const childrenResult = _getMaxLevel<T>(children, result, opt)
        if (childrenResult <= maxChildrenResult) continue
        maxChildrenResult = childrenResult
    }
    return maxChildrenResult || result
}

/**
 * 获取树最大层级
 * @param treeData 树数据
 * @param opt 节点解析配置
 * @returns 层级
 */
export default function getMaxLevel<T>(
    treeData: Array<T>,
    opt?: TreeBaseOpt<T>
): number {
    return _getMaxLevel<T>(treeData, 0, opt)
}
