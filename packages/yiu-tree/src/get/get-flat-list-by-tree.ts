import type { TreeBaseOpt } from '../type'
import getDeepTree from '../utils/get-deep-tree'
import getTreePropsValue from '../utils/get-tree-props-value'

/**
 * 将树展开，生成一个线性数组
 *
 * 默认深拷贝
 *
 * @param treeData 树数据
 * @param opt 解析节点配置
 * @returns 所有树的节点数组
 */
export default function getFlatListByTree<T>(
    treeData: Array<T>,
    opt?: TreeBaseOpt<T>
): Array<T> {
    const deepData = getDeepTree<T>(treeData, opt, true)
    if (!Array.isArray(deepData) || !deepData.length) return []
    const result: Array<T> = []
    const stack = [...deepData]
    while (stack.length) {
        const node = stack.shift()
        if (!node) continue
        result.push(node)
        const children = getTreePropsValue<T>(node, 'children', opt)
        if (children && Array.isArray(children)) stack.unshift(...children)
    }
    return result
}
