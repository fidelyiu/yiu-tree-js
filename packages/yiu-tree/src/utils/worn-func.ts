import { TreeBaseOpt } from '../type'

/**
 * 警告节点上的某属性应该有效
 * @param log 是否打印警告的逻辑开关
 * @param treeNode 节点
 * @param key 属性名称
 * @param value 接收到的值
 */
export const worringNodeKeyShouldBeValid = (
    log: boolean | undefined,
    treeNode: any,
    key: string,
    value: any
) => {
    // if (__YiuTreeWorn__ !== 'No') {
    if (!log) return
    if (value || value === 0) return
    console.warn(
        `The "${key}" attribute of the tree should be valid, but instead it receives "${value}".`,
        treeNode
    )
    // }
}

/**
 * 警告节点上的某属性应该是数组
 * @param log 是否打印警告的逻辑开关
 * @param treeNode 节点
 * @param key 属性名称
 * @param value 接收到的值
 */
export const worringNodeKeyShouldBeArr = (
    log: boolean | undefined,
    treeNode: any,
    key: string,
    value: any
) => {
    // if (__YiuTreeWorn__ !== 'No') {
    if (!log) return
    if (Array.isArray(value) || typeof value === 'undefined') return
    console.warn(
        `The "${key}" attribute of the tree should be array, but instead it receives "${value}".`,
        treeNode
    )
    // }
}

/**
 * 警告节点的函数执行应该有效
 * @param log 是否打印警告的逻辑开关
 * @param treeNode 节点
 * @param funcName 函数名称
 * @param value 接收到的值
 */
export const worringFuncDoShouldBeValid = (
    log: boolean | undefined,
    treeNode: any,
    funcName: string,
    value: any
) => {
    // if (__YiuTreeWorn__ !== 'No') {
    if (!log) return
    if (value || value === 0) return
    console.warn(
        `The result of the "${funcName}" function should be valid, but instead it receives "${value}".`,
        treeNode
    )
    // }
}

/**
 * 警告节点的函数执行应该是数组
 * @param log 是否打印警告的逻辑开关
 * @param treeNode 节点
 * @param funcName 函数名称
 * @param value 接收到的值
 */
export const worringFuncDoShouldBeArr = (
    log: boolean | undefined,
    treeNode: any,
    funcName: string,
    value: any
) => {
    // if (__YiuTreeWorn__ !== 'No') {
    if (!log) return
    if (Array.isArray(value) || typeof value === 'undefined') return
    console.warn(
        `The result of the "${funcName}" function should be array, but instead it receives "${value}".`,
        treeNode
    )
    // }
}

/**
 * 警告配置上的某属性应该是什么
 * @param treeOpt 配置
 * @param key 属性名称
 * @param type 类型名称
 * @param value 接收到的值
 */
export const worringOptKeyShouldBe = (
    treeOpt: TreeBaseOpt,
    key: string,
    type: string,
    value: any
) => {
    // if (__YiuTreeWorn__ !== 'No') {
    if (!treeOpt.worn) return
    console.warn(
        `TreeOpt's "${key}" execution result type should be a "${type}", but a "${typeof value}" is received.`,
        treeOpt
    )
    // }
}
