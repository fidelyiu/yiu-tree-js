import type { TreeBaseOpt, TreeOperationFunc } from '../type'
import treeOpBySearch from './op-by-search'

/**
 * 操作所有节点
 *
 * 默认深拷贝
 *
 * @param treeData 树
 * @param opFunc 操作函数
 * @param opt 树解析配置
 * @returns 返回树，直接修改原数据
 */
export default function opAll<T>(
  treeData: Array<T>,
  opFunc: TreeOperationFunc<T>,
  opt?: TreeBaseOpt<T>
): Array<T> {
  return treeOpBySearch<T>(treeData, opFunc, () => true, opt)
}
