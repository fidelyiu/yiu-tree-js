import type { TreeBaseOpt, TreeOperationFunc, TreeSearchFunc } from '../type'
import getDeepTree from '../utils/get-deep-tree'
import getTreePropsValue from '../utils/get-tree-props-value'
import setTreePropsValue from '../utils/set-tree-props-value'

function _opBySearch<T>(
  treeData: Array<T>,
  opFunc: TreeOperationFunc<T>,
  scFunc: TreeSearchFunc<T>,
  currentLevel: number,
  parent: T | undefined,
  nodePath: Array<T>,
  opt?: TreeBaseOpt<T>
): Array<T> {
  const treeDataLen = treeData.length
  for (let index = 0; index < treeDataLen; index++) {
    const item = treeData[index]
    const currentPath = nodePath.slice()
    currentPath.push(item)
    const children = getTreePropsValue<T>(item, 'children', opt)
    let childrenLen = 0
    if (Array.isArray(children)) childrenLen = children.length

    const nodeInfo = {
      level: currentLevel + 1,
      index,
      isLeaf: !childrenLen,
      isFirst: index === 0,
      isLast: index === treeData.length - 1,
      parent,
      path: currentPath,
      parentPath: nodePath,
    }

    if (opt?.direction) {
      /* 子节点 */
      if (childrenLen) {
        setTreePropsValue<T>(
          item,
          'children',
          _opBySearch<T>(
            children,
            opFunc,
            scFunc,
            currentLevel + 1,
            item,
            currentPath,
            opt
          ),
          opt
        )
      }
      /* 当前节点 */
      if (scFunc(item, nodeInfo)) {
        opFunc(item, nodeInfo)
      }
    } else {
      /* 当前节点 */
      if (scFunc(item, nodeInfo)) {
        opFunc(item, nodeInfo)
      }
      /* 子节点 */
      if (childrenLen) {
        setTreePropsValue<T>(
          item,
          'children',
          _opBySearch<T>(
            children,
            opFunc,
            scFunc,
            currentLevel + 1,
            item,
            currentPath,
            opt
          ),
          opt
        )
      }
    }
  }
  return treeData
}

/**
 * 操作所有符合查询条件的节点
 *
 * 默认深拷贝
 *
 * @param treeData 树
 * @param opFunc 操作函数
 * @param scFunc 过滤函数，必须返回boolen（不要修改节点）
 * @param opt 树解析配置
 */
export default function opBySearch<T>(
  treeData: Array<T>,
  opFunc: TreeOperationFunc<T>,
  scFunc: TreeSearchFunc<T>,
  opt?: TreeBaseOpt<T>
): Array<T> {
  if (typeof scFunc !== 'function' || typeof opFunc !== 'function') {
    return treeData
  }
  const deepData = getDeepTree<T>(treeData, opt, true)
  if (!Array.isArray(deepData) || !deepData.length) return treeData
  return _opBySearch<T>(deepData, opFunc, scFunc, 0, undefined, [], opt)
}
