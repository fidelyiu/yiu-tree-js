import { getFilterBySearch } from '../../src'
import type { TreeFilterOpt } from '../../src/type'

describe('过滤测试', () => {
  describe('父节点需要匹配-子节点不需要匹配', () => {
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
        getFilterBySearch<TreeNode>(tree, (node) => node.id === 2, matchOpt)
      ).toStrictEqual([{ id: 2, children: [{ id: '2-1' }] }])
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
          id: 1,
          name: 'name-1',
          children: [
            {
              id: '1-1',
              name: 'name@1-1',
              children: [
                { id: '1-1-1', name: 'name@1-1-1' },
                { id: '1-1-2', name: 'name@1-1-2' },
              ],
            },
            { id: '1-2', name: 'name@1-2' },
            { id: '1-3', name: 'name@1-3' },
          ],
        },
        {
          id: 2,
          name: 'name-2',
          children: [{ id: '2-1', name: 'name@2-1' }],
        },
        { id: 3, name: 'name-3' },
        { id: 4, name: 'name-4' },
      ]

      expect(
        getFilterBySearch<TreeNode>(
          tree,
          (node) =>
            ['name-2', 'name-3'].includes(node.name) &&
            node.name !== 'name@2-1',
          matchOpt
        )
      ).toStrictEqual([
        {
          id: 2,
          name: 'name-2',
          children: [{ id: '2-1', name: 'name@2-1' }],
        },
        { id: 3, name: 'name-3', children: [] },
      ])
    })
  })
  describe('父节点需要匹配-子节点需要匹配', () => {
    const matchOpt: TreeFilterOpt = {
      parentMatch: true,
      childrenMatch: true,
    }
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

      expect(
        getFilterBySearch<TreeNode>(
          tree,
          (node) => node.name.includes('-1'),
          matchOpt
        )
      ).toStrictEqual([
        {
          id: 1,
          name: 'name-1',
          children: [
            {
              id: '1-1',
              name: 'name-1-1',
              children: [
                {
                  id: '1-1-2',
                  name: 'name-1-1-2',
                  children: [],
                },
              ],
            },
            { id: '1-3', name: 'name-1-3', children: [] },
          ],
        },
      ])
    })
  })
  describe('父节点不需要匹配-子节点需要匹配', () => {
    const matchOpt: TreeFilterOpt = {
      parentMatch: false,
      childrenMatch: true,
    }
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

      expect(
        getFilterBySearch<TreeNode>(
          tree,
          (node) => node.name === 'name@1@1@1',
          matchOpt
        )
      ).toStrictEqual([
        {
          id: 1,
          name: 'name-1',
          children: [
            {
              id: '1-1',
              name: 'name-1-1',
              children: [
                {
                  id: '1-1-1',
                  name: 'name@1@1@1',
                  children: [],
                },
              ],
            },
          ],
        },
      ])
    })
  })
  describe('父节点不需要匹配-子节点不需要匹配', () => {
    const matchOpt: TreeFilterOpt = {
      parentMatch: false,
      childrenMatch: false,
    }
    expect(
      getFilterBySearch([{ id: '1' }, { id: '2' }], () => false, matchOpt)
    ).toStrictEqual([])
  })
  describe('非法传入', () => {
    test('函数非法传入', () => {
      expect(
        getFilterBySearch(
          [{ id: '1' }, { id: '2' }],
          'Should be Function' as unknown as () => boolean
        )
      ).toStrictEqual([])
    })
    test('树非法传入', () => {
      expect(
        getFilterBySearch('Should be Arr' as unknown as any[], () => true)
      ).toStrictEqual([])
    })
  })
})
