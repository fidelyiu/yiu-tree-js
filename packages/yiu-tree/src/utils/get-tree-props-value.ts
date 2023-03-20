import type { TreeBaseOpt, TreeKeyType } from '../type'
import {
  worringFuncDoShouldBeArr,
  worringFuncDoShouldBeValid,
  worringNodeKeyShouldBeArr,
  worringNodeKeyShouldBeValid,
  worringOptKeyShouldBe,
} from './worn-func'

export default function getTreePropsValue<T = any>(
  treeNode: T,
  key: TreeKeyType,
  opt?: TreeBaseOpt<T>
): any {
  let result: any
  if (!treeNode) return undefined
  const baseOpt: TreeBaseOpt<T> = Object.assign({}, opt)
  switch (key) {
    case 'id': {
      if (typeof baseOpt.idGetter === 'undefined') {
        const idProp = baseOpt.idProp || 'id'
        result = (treeNode as any)[idProp]
        /* id这个属性应该有效，否则打印警告 */
        worringNodeKeyShouldBeValid(baseOpt.worn, treeNode, idProp, result)
      } else if (typeof baseOpt.idGetter === 'function') {
        result = baseOpt.idGetter(treeNode)
        /* idGetter函数的结果应该有效，否则打印警告 */
        worringFuncDoShouldBeValid(baseOpt.worn, treeNode, 'idGetter', result)
      } else {
        /* idGetter应该是一个函数，否则打印警告 */
        worringOptKeyShouldBe(
          baseOpt,
          'idGetter',
          'funcation',
          baseOpt.idGetter
        )
      }
      break
    }
    case 'pid': {
      if (typeof baseOpt.pidGetter === 'undefined') {
        const pidProp = baseOpt.pidProp || 'pid'
        result = (treeNode as any)[pidProp]
        /* pid这个属性应该有效，否则打印警告 */
        worringNodeKeyShouldBeValid(baseOpt.worn, treeNode, pidProp, result)
      } else if (typeof baseOpt.pidGetter === 'function') {
        result = baseOpt.pidGetter(treeNode)
        /* pidGetter函数的结果应该有效，否则打印警告 */
        worringFuncDoShouldBeValid(baseOpt.worn, treeNode, 'pidGetter', result)
      } else {
        /* pidGetter应该是一个函数，否则打印警告 */
        worringOptKeyShouldBe(
          baseOpt,
          'pidGetter',
          'funcation',
          baseOpt.pidGetter
        )
      }
      break
    }
    case 'children': {
      if (typeof baseOpt.childrenGetter === 'undefined') {
        const childrenProp = baseOpt.childrenProp || 'children'
        result = (treeNode as any)[childrenProp]
        /* children这个属性应该是数组，否则打印警告 */
        worringNodeKeyShouldBeArr(baseOpt.worn, treeNode, childrenProp, result)
      } else if (typeof baseOpt.childrenGetter === 'function') {
        result = baseOpt.childrenGetter(treeNode)
        /* pidGetter函数的结果应该是数组，否则打印警告 */
        worringFuncDoShouldBeArr(
          baseOpt.worn,
          treeNode,
          'childrenGetter',
          result
        )
      } else {
        /* childrenGetter应该是一个函数，否则打印警告 */
        worringOptKeyShouldBe(
          baseOpt,
          'childrenGetter',
          'funcation',
          baseOpt.childrenGetter
        )
      }
      break
    }
  }
  return result
}
