import type { TreeBaseOpt, TreeKeyType } from '../type'
import { worringOptKeyShouldBe } from './worn-func'

export default function setTreePropsValue<T = any>(
    treeNode: any,
    key: TreeKeyType,
    value: any,
    opt?: TreeBaseOpt<T>
): any {
    if (!treeNode) return undefined
    const baseOpt: TreeBaseOpt<T> = Object.assign({}, opt)
    switch (key) {
        case 'id': {
            if (typeof baseOpt.idSetter === 'undefined') {
                const idProp = baseOpt.idProp || 'id'
                treeNode[idProp] = value
            } else if (typeof baseOpt.idSetter === 'function') {
                baseOpt.idSetter(treeNode, value)
            } else {
                /* idSetter应该是函数 */
                worringOptKeyShouldBe(
                    baseOpt,
                    'idSetter',
                    'funcation',
                    baseOpt.idSetter
                )
            }
            break
        }
        case 'pid': {
            if (typeof baseOpt.pidSetter === 'undefined') {
                const pidProp = baseOpt.pidProp || 'pid'
                treeNode[pidProp] = value
            } else if (typeof baseOpt.pidSetter === 'function') {
                baseOpt.pidSetter(treeNode, value)
            } else {
                /* pidSetter应该是函数 */
                worringOptKeyShouldBe(
                    baseOpt,
                    'pidSetter',
                    'funcation',
                    baseOpt.pidSetter
                )
            }
            break
        }
        case 'children': {
            if (typeof baseOpt.childrenSetter === 'undefined') {
                const childrenProp = baseOpt.childrenProp || 'children'
                treeNode[childrenProp] = value
            } else if (typeof baseOpt.childrenSetter === 'function') {
                baseOpt.childrenSetter(treeNode, value)
            } else {
                /* childrenSetter应该是函数 */
                worringOptKeyShouldBe(
                    baseOpt,
                    'childrenSetter',
                    'funcation',
                    baseOpt.childrenSetter
                )
            }
            break
        }
    }
}
