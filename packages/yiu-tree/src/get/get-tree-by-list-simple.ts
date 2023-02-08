import type { TreeBaseOpt } from '../type'
import getDeepTree from '../utils/get-deep-tree'
import getTreePropsValue from '../utils/get-tree-props-value'
import setTreePropsValue from '../utils/set-tree-props-value'

/**
 * 快速的获取一个Tree，不会做过多的判断
 *
 * 默认深拷贝
 */
export default function getTreeByListSimple<T>(
    list: Array<T>,
    opt?: TreeBaseOpt<T>
): Array<T> {
    const deepData = getDeepTree<T>(list, opt, true)
    if (!Array.isArray(deepData) || !deepData.length) return []
    const treeMap = new Map()
    for (const node of deepData) {
        const id = getTreePropsValue<T>(node, 'id', opt)
        if (!id && id !== 0) continue
        setTreePropsValue<T>(node, 'children', [], opt)
        treeMap.set(id, node)
    }
    for (const node of deepData) {
        const parentId = getTreePropsValue<T>(node, 'pid', opt)
        if (!parentId && parentId !== 0) continue
        const parent = treeMap.get(parentId)
        if (parent) {
            const children = getTreePropsValue<T>(parent, 'children', opt)
            children.push(node)
        }
    }
    return deepData.filter((node) => {
        const pid = getTreePropsValue<T>(node, 'pid', opt)
        return !pid && pid !== 0
    })
}
