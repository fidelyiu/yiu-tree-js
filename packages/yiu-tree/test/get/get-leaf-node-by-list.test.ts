import { getLeafNodeByList } from '../../src'

describe('数组中获取叶子节点测试', () => {
    test('非法传入', () => {
        expect(
            getLeafNodeByList('Should Be Array' as unknown as any[])
        ).toStrictEqual([])
    })
    test('测试1', () => {
        type TreeNode = {
            id: string
            pid?: string
            children?: TreeNode[]
        }

        const treeNodeList: TreeNode[] = [
            { id: '1' },
            { id: '1-1', pid: '1' },
            { id: '1-1-1', pid: '1-1' },
            { id: '1-1-2', pid: '1-1' },
            { id: '1-2', pid: '1' },
            { id: '2' },
            { id: '2-1', pid: '2' },
            { id: '3' },
            { id: '3-1', pid: '3' },
            { id: '3-2', pid: '3' },
            { id: '4' },
        ]

        const result = [
            { id: '1-1-1', pid: '1-1' },
            { id: '1-1-2', pid: '1-1' },
            { id: '1-2', pid: '1' },
            { id: '2-1', pid: '2' },
            { id: '3-1', pid: '3' },
            { id: '3-2', pid: '3' },
            { id: '4' },
        ]

        expect(getLeafNodeByList<TreeNode>(treeNodeList)).toStrictEqual(result)
    })
})
