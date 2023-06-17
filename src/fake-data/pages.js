export default [
  {
    id: 1,
    title: 'root',
    parentId: null,
    childrenIds: [11, 22]
  },
  {
    id: 11,
    title: '1.1',
    childrenIds: ['11a'],
    parentId: 1
  },
  {
    id: '11a',
    title: '1.1.1',
    childrenIds: null,
    parentId: 11
  },
  {
    id: 22,
    title: '1.2',
    childrenIds: [111, 222],
    parentId: 1
  },
  {
    id: 111,
    title: '1.2.1',
    childrenIds: null,
    parentId: 22
  },
  {
    id: 222,
    title: '1.2.2',
    childrenIds: [1111, 2222, 3333, 4444],
    parentId: 22
  },
  {
    id: 1111,
    title: '1.2.2.1',
    childrenIds: null,
    parentId: 222
  },
  {
    id: 2222,
    title: '1.2.2.2',
    childrenIds: null,
    parentId: 222
  },
  {
    id: 3333,
    title: '1.2.2.3',
    childrenIds: null,
    parentId: 222
  },
  {
    id: 4444,
    title: '1.2.2.4',
    childrenIds: null,
    parentId: 222
  }
]
