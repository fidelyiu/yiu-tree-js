import { getMaxLevel } from '../../src'

describe('获取最大层级', () => {
  test('0层级', () => {
    expect(getMaxLevel([])).toBe(0)
  })
  test('1层级', () => {
    expect(getMaxLevel([{ id: 1 }])).toBe(1)
  })
  test('2层级', () => {
    expect(
      getMaxLevel([{ id: 1, children: [{ id: '1-1' }, { id: '1-2' }] }])
    ).toBe(2)
    expect(
      getMaxLevel([
        { id: 1, children: [{ id: '1-1' }, { id: '1-2' }] },
        { id: 2 },
      ])
    ).toBe(2)
  })
  test('3层级', () => {
    expect(
      getMaxLevel([
        {
          id: 1,
          children: [{ id: '1-1', children: [{ id: '1-1-1' }] }, { id: '1-2' }],
        },
        { id: 2 },
      ])
    ).toBe(3)
  })
  test('4层级', () => {
    expect(
      getMaxLevel([
        {
          id: 1,
          children: [
            { id: '1-1', children: [{ id: '1-1-1' }] },
            {
              id: '1-2',
              children: [{ id: '1-2-1', children: [{ id: '1-2-1-1' }] }],
            },
            {
              id: '1-3',
              children: [{ id: '1-3-1', children: [{ id: '1-3-1-1' }] }],
            },
          ],
        },
        { id: 2 },
      ])
    ).toBe(4)
  })
})
