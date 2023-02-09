import { getMaxLevel } from '../../src'

describe('获取最大层级', () => {
    test('0层级', () => {
        expect(getMaxLevel([])).toBe(0)
    })
})
