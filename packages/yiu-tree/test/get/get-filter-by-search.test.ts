import { getFilterBySearch } from '../../src'
import type { TreeFilterOpt } from '../../src/type'

describe('过滤测试', () => {
    test('父节点匹配-子节点不匹配', () => {
        const matchOpt: TreeFilterOpt = {
            parentMatch: true,
            childrenMatch: false,
        }
        expect(getFilterBySearch([], () => false, matchOpt)).toStrictEqual([])
    })
})
