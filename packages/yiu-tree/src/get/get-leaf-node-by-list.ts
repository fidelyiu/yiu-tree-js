import type { TreeBaseOpt } from '../type'
import getDeepTree from '../utils/get-deep-tree'
import getTreePropsValue from '../utils/get-tree-props-value'

/**
 * 从一维树节点数组中获取所有是叶子节点的树节点
 *
 * 默认深拷贝
 *
 * @param list 一维树节点数组
 * @param opt 树解析配置
 * @returns 新仅包含叶子节点的数组
 */
export default function getLeafNodeByList<T>(
  list: Array<T>,
  opt?: TreeBaseOpt<T>
): Array<T> {
  const deepData = getDeepTree<T>(list, opt, true)
  if (!Array.isArray(deepData) || !deepData.length) return []
  const nonleaves = new Set(
    deepData
      .map((node) => getTreePropsValue<T>(node, 'pid', opt))
      .filter((pid) => typeof pid !== 'undefined')
  )
  return deepData.filter(
    (node) => !nonleaves.has(getTreePropsValue<T>(node, 'id', opt))
  )
}
