import {
  getterTestData,
  getterBeData,
} from '../../mock/get-tree-by-list-simple.mock'
import { getTreeByListSimple } from '../../src'

describe('构造简单树', () => {
  test('0层级', () => {
    expect(getTreeByListSimple([])).toStrictEqual([])
  })
  test('idGetter & pidGetter', () => {
    expect(
      getTreeByListSimple(getterTestData, {
        idGetter: (node) => `${node.type}&${node.code}`,
        pidGetter: (node) => {
          if (node.type === 'classification') return ''
          return `classification&${node.parentCode}`
        },
      })
    ).toStrictEqual(getterBeData)
  })
})
