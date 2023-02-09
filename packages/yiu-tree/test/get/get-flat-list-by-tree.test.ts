import { getFlatListByTree } from '../../src'

describe('展开测试', () => {
    test('空数据1', () => {
        expect(getFlatListByTree([])).toStrictEqual([])
    })
    test('空数据2', () => {
        expect(getFlatListByTree([undefined, undefined])).toStrictEqual([])
    })
    test('空数据3', () => {
        expect(getFlatListByTree([0, false])).toStrictEqual([])
    })
    test('正常数据', () => {
        type TreeNode = {
            id: string | number
            name: string
            age?: number
            children?: TreeNode[]
        }
        const tree: TreeNode[] = [
            {
                id: 1,
                name: 'name-1',
                children: [
                    {
                        id: '1-1',
                        name: 'name-1-1',
                        children: [
                            { id: '1-1-1', name: 'name@1@1@1' },
                            { id: '1-1-2', name: 'name-1-1-2' },
                        ],
                    },
                    { id: '1-2', name: 'name@1@2' },
                    { id: '1-3', name: 'name-1-3' },
                ],
            },
            {
                id: 2,
                name: 'name-2',
                children: [{ id: '2-1', name: 'name-2-1' }],
            },
            { id: 3, name: 'name-3' },
            { id: 4, name: 'name-4' },
        ]

        const result = [
            {
                id: 1,
                name: 'name-1',
                children: [
                    {
                        id: '1-1',
                        name: 'name-1-1',
                        children: [
                            { id: '1-1-1', name: 'name@1@1@1' },
                            { id: '1-1-2', name: 'name-1-1-2' },
                        ],
                    },
                    { id: '1-2', name: 'name@1@2' },
                    { id: '1-3', name: 'name-1-3' },
                ],
            },
            {
                id: '1-1',
                name: 'name-1-1',
                children: [
                    { id: '1-1-1', name: 'name@1@1@1' },
                    { id: '1-1-2', name: 'name-1-1-2' },
                ],
            },
            { id: '1-1-1', name: 'name@1@1@1' },
            { id: '1-1-2', name: 'name-1-1-2' },
            { id: '1-2', name: 'name@1@2' },
            { id: '1-3', name: 'name-1-3' },
            {
                id: 2,
                name: 'name-2',
                children: [{ id: '2-1', name: 'name-2-1' }],
            },
            { id: '2-1', name: 'name-2-1' },
            { id: 3, name: 'name-3' },
            { id: 4, name: 'name-4' },
        ]
        expect(getFlatListByTree(tree)).toStrictEqual(result)
    })
})
