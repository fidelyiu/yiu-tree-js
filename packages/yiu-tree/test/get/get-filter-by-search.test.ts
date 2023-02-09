import { getFilterBySearch } from '../../src'
import type { TreeFilterOpt } from '../../src/type'

describe('过滤测试', () => {
    describe('父节点匹配-子节点不匹配', () => {
        const matchOpt: TreeFilterOpt = {
            parentMatch: true,
            childrenMatch: false,
        }
        test('测试1', () => {
            type TreeNode = {
                id: string | number
                age?: number
                children?: TreeNode[]
            }
            const tree: TreeNode[] = [
                {
                    id: 1,
                    children: [
                        {
                            id: '1-1',
                            children: [{ id: '1-1-1' }, { id: '1-1-2' }],
                        },
                        { id: '1-2' },
                        { id: '1-3' },
                    ],
                },
                { id: 2, children: [{ id: '2-1' }] },
                { id: 3 },
                { id: 4 },
            ]
            expect(
                getFilterBySearch<TreeNode>(
                    tree,
                    (node) => node.id === 2,
                    matchOpt
                )
            ).toStrictEqual([{ id: 2, children: [{ id: '2-1' }] }])
        })
    })
})
