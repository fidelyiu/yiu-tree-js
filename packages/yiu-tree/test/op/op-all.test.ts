import { opAll } from '../../src'

describe('操作所有节点', () => {
  test('给每个节点设置age字段', () => {
    type TreeNode = {
      id: string | number
      age?: number
      children?: TreeNode[]
    }
    const tree: TreeNode[] = [
      {
        id: 1,
        children: [
          { id: '1-1', children: [{ id: '1-1-1' }, { id: '1-1-2' }] },
          { id: '1-2' },
          { id: '1-3' },
        ],
      },
      { id: 2 },
      { id: 3 },
      { id: 4 },
    ]
    const setAge = 10
    const opTree = opAll<TreeNode>(tree, (node) => (node.age = setAge))
    expect(opTree[0].id).toBe(1)
    expect(opTree[0].age).toBe(setAge)
    expect(opTree[1].id).toBe(2)
    expect(opTree[1].age).toBe(setAge)
    expect(opTree[2].id).toBe(3)
    expect(opTree[2].age).toBe(setAge)
    expect(opTree[3].id).toBe(4)
    expect(opTree[3].age).toBe(setAge)
    const opTreeNode1children = opTree[0].children as TreeNode[]
    expect(opTreeNode1children[0].id).toBe('1-1')
    expect(opTreeNode1children[0].age).toBe(setAge)
    expect(opTreeNode1children[1].id).toBe('1-2')
    expect(opTreeNode1children[1].age).toBe(setAge)
    expect(opTreeNode1children[2].id).toBe('1-3')
    expect(opTreeNode1children[2].age).toBe(setAge)
    const opTreeNode11children = opTreeNode1children[0].children as TreeNode[]
    expect(opTreeNode11children[0].id).toBe('1-1-1')
    expect(opTreeNode11children[0].age).toBe(setAge)
    expect(opTreeNode11children[1].id).toBe('1-1-2')
    expect(opTreeNode11children[1].age).toBe(setAge)

    expect(tree[0].id).toBe(1)
    expect(tree[0].age).toBe(undefined)
    expect(tree[1].id).toBe(2)
    expect(tree[1].age).toBe(undefined)
    expect(tree[2].id).toBe(3)
    expect(tree[2].age).toBe(undefined)
    expect(tree[3].id).toBe(4)
    expect(tree[3].age).toBe(undefined)
    const treeNode1children = tree[0].children as TreeNode[]
    expect(treeNode1children[0].id).toBe('1-1')
    expect(treeNode1children[0].age).toBe(undefined)
    expect(treeNode1children[1].id).toBe('1-2')
    expect(treeNode1children[1].age).toBe(undefined)
    expect(treeNode1children[2].id).toBe('1-3')
    expect(treeNode1children[2].age).toBe(undefined)
    const treeNode11children = treeNode1children[0].children as TreeNode[]
    expect(treeNode11children[0].id).toBe('1-1-1')
    expect(treeNode11children[0].age).toBe(undefined)
    expect(treeNode11children[1].id).toBe('1-1-2')
    expect(treeNode11children[1].age).toBe(undefined)
  })
})
