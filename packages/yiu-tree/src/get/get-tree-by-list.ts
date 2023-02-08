import type { TreeBaseOpt } from '../type'
import opBySearch from '../op/op-by-search'
import getDeepTree from '../utils/get-deep-tree'
import getTreePropsValue from '../utils/get-tree-props-value'
import setTreePropsValue from '../utils/set-tree-props-value'

/**
 * 根据List生成Tree
 *
 * 默认深拷贝
 *
 * @param list 数组
 * @param opt 节点解析配置
 */
export default function getTreeByList<T>(
    list: Array<T>,
    opt?: TreeBaseOpt<T>
): Array<T> {
    const deepData = getDeepTree<T>(list, opt, true)
    if (!Array.isArray(deepData) || !deepData.length) return []
    let result: Array<T> = []
    deepData.forEach((item) => {
        result = mergeNodeToTree<T>(result, item, opt)
    })
    return result
}

function mergeNodeToTree<T>(
    tree: Array<T>,
    node: T,
    opt?: TreeBaseOpt<T>
): Array<T> {
    if (!Array.isArray(tree)) return []
    const id = getTreePropsValue<T>(node, 'id', opt)
    if (!id) return []
    const pid = getTreePropsValue<T>(node, 'pid', opt)
    if (!pid) {
        return mergeTreeToNode<T>(tree, node, opt)
    }
    let hasMerge = false
    const result = opBySearch<T>(
        tree,
        (item) => {
            if (hasMerge) return
            hasMerge = true
            const children = getTreePropsValue<T>(item, 'children', opt)
            if (
                !children
                    .map((child: any) => getTreePropsValue<T>(child, 'id', opt))
                    .includes(id)
            ) {
                children.push(node)
            }
            setTreePropsValue<T>(item, 'children', children, opt)
        },
        (item) => getTreePropsValue<T>(item, 'id', opt) === pid,
        opt
    )
    if (hasMerge) return result
    return mergeTreeToNode<T>(tree, node)
}

function mergeTreeToNode<T>(
    tree: Array<T>,
    node: T,
    opt?: TreeBaseOpt<T>
): Array<T> {
    const id = getTreePropsValue<T>(node, 'id', opt)
    const children = getTreePropsValue<T>(node, 'children', opt)
    if (!id) return []
    if (!Array.isArray(tree)) return []
    const reuslt = []
    tree.forEach((item) => {
        const cid = getTreePropsValue<T>(item, 'id', opt)
        if (!cid) return
        const pid = getTreePropsValue<T>(item, 'pid', opt)
        if (pid === id) {
            if (
                !children
                    .map((child: any) => getTreePropsValue<T>(child, 'id', opt))
                    .includes(cid)
            ) {
                children.push(item)
            }
        } else {
            reuslt.push(item)
        }
    })
    setTreePropsValue<T>(node, 'children', children, opt)
    reuslt.push(node)
    return reuslt
}
