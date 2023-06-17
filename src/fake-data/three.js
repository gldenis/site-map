export default {
  id: 1111,
  name: 'Home',
  blocks: [
    {
      id: 'asdfasdfasdfasdf',
      title: 'header',
      component: 'header',
      color: 'blue'
    },
    {
      id: 'hgfdfghdfghdfgh',
      title: 'footer',
      component: 'footer',
      color: 'purple'
    }
  ],
  root: true,
  children: [
    {
      id: 2222,
      name: 'About',
      blocks: [
        {
          id: 'sdfhfdhjdfj',
          title: 'header',
          component: 'header',
          color: 'blue'
        }
      ]
    },
    {
      id: 2223,
      name: 'Services',
      blocks: [
        {
          id: 'qweasdf',
          title: 'header',
          component: 'header',
          color: 'blue'
        }
      ]
    },
    {
      id: 2224,
      name: 'Blog',
      blocks: [
        {
          id: 'qwetrdfsgsdfgsdfg',
          title: 'header',
          component: 'header',
          color: 'blue'
        }
      ],
      children: [
        {
          id: 33333,
          name: 'BlogItem',
          blocks: [
            {
              id: '345gdfghsdfgsdfg',
              title: 'header',
              component: 'header',
              color: 'blue'
            }
          ]
        },
        {
          id: 3333234,
          name: 'BlogCreate',
          blocks: [
            {
              id: 'sdfgsdfgh4567',
              title: 'header',
              component: 'header',
              color: 'blue'
            }
          ]
        }
      ]
    },
    {
      id: 2226,
      name: 'Login',
      blocks: [
        {
          id: 'sdfhsdfh',
          title: 'header',
          component: 'header',
          color: 'blue'
        }
      ]
    },
    {
      id: 2227,
      name: 'Registration',
      blocks: [
        {
          id: 'dfgjhdsfh',
          title: 'header',
          component: 'header',
          color: 'blue'
        },
        {
          id: 'asdtgwreyfvbn',
          title: 'footer',
          component: 'footer',
          color: 'purple'
        }
      ]
    }
  ]
}
