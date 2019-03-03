const menu = {
  home: {
    name: 'menu.home',
    path: '/login',
    icon: 'el-icon-menu',
  },
  content: {
    name: 'menu.articlemanage',
    icon: 'el-icon-document',
    children: {
      list: {
        name: 'menu.articlequery',
        icon: 'el-icon-edit-outline',
        path: '/article/list'
      },
      add: {
        name: 'menu.articleadd',
        icon: 'el-icon-edit-outline',
        path: '/article/add'
      }
    }
  },
  deal: {
    name: 'menu.deal',
    path: '/admin/deal',
    icon: 'el-icon-menu',
  },
  input: {
    name: 'menu.input',
    path: '/admin/input',
    icon: 'el-icon-menu',
  },
  statistics: {
    name: 'menu.statistics',
    path: '/admin/statistics',
    icon: 'el-icon-menu',
  },
  earning: {
    name: 'menu.earning',
    path: '/admin/earning',
    icon: 'el-icon-menu',
  },
  expend: {
    name: 'menu.expend',
    path: '/admin/expend',
    icon: 'el-icon-menu',
  },
  personal: {
    name: 'menu.personal',
    path: '/admin/personal',
    icon: 'el-icon-menu',
  }
};

export default menu;