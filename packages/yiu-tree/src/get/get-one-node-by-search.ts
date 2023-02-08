import type { TreeBaseOpt, TreeSearchFunc } from '../type'
import getOneNodePathBySearch from './get-one-node-path-by-search'

/**
 * 获取一个节点元素
 *
 * 默认深拷贝
 *
 * @param treeData 树
 * @param scFunc 过滤条件，返回true则立即返回该节点（不要修改节点）
 * @param opt 解析节点配置
 * @returns 找到的节点
 */
export default function getOneNodeBySearch<T>(
    treeData: Array<T>,
    scFunc: TreeSearchFunc<T>,
    opt?: TreeBaseOpt<T>
): T | undefined {
    const result = getOneNodePathBySearch<T>(treeData, scFunc, opt)
    const resultLen = result.length
    if (!resultLen) return
    return result[resultLen - 1]
}
