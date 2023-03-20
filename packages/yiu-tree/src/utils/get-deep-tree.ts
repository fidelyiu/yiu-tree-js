import type { TreeBaseOpt } from '../type'

export default function getDeepTree<T>(
  treeData: Array<T>,
  opt?: TreeBaseOpt<T>,
  defDeepClone?: boolean
): Array<T> {
  if (!Array.isArray(treeData)) return []
  const baseOpt: TreeBaseOpt<T> = Object.assign({}, opt)
  let deepClone = !!defDeepClone
  if (typeof baseOpt.deepClone === 'boolean') deepClone = baseOpt.deepClone
  if (!deepClone) return treeData
  if (typeof baseOpt.deepCloneFunc !== 'function') {
    return JSON.parse(JSON.stringify(treeData))
  }
  return baseOpt.deepCloneFunc(treeData) || []
}
