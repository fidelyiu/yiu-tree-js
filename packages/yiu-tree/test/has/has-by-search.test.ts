import { hasBySearch } from '../../src'

describe('树中是否存在测试', () => {
  test('非法传入', () => {
    expect(hasBySearch('Should Be Array' as unknown as any[], () => true)).toBe(
      false
    )
  })
})
