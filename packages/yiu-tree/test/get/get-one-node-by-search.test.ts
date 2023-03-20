import { getOneNodeBySearch } from '../../src'

describe('数组中获取单个节点测试', () => {
  test('非法传入', () => {
    expect(
      getOneNodeBySearch('Should Be Array' as unknown as any[], () => true)
    ).toBe(undefined)
  })
  test('非函数传入', () => {
    expect(
      getOneNodeBySearch([], 'Should Be Funcation' as unknown as () => boolean)
    ).toBe(undefined)
  })
  test('空数组传入', () => {
    expect(getOneNodeBySearch([], () => false)).toBe(undefined)
  })

  test('测试1', () => {
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

    const result = { id: '1-1-1', name: 'name@1@1@1' }

    expect(
      getOneNodeBySearch<TreeNode>(tree, (node) => node.name === 'name@1@1@1')
    ).toStrictEqual(result)
  })

  test('测试2', () => {
    type TreeNode = {
      id: string | number
      name: string
      age?: number
      children?: TreeNode[]
    }
    const tree: TreeNode[] = [
      {
        id: 2,
        name: 'name-2',
        children: [{ id: '2-1', name: 'name-2-1' }],
      },
      { id: 3, name: 'name-3' },
      { id: 4, name: 'name-4' },
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
    ]

    const result = { id: '1-1-1', name: 'name@1@1@1' }

    expect(
      getOneNodeBySearch<TreeNode>(tree, (node) => node.name === 'name@1@1@1')
    ).toStrictEqual(result)
  })
})
