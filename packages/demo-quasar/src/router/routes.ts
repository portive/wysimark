import MainLayout from 'layouts/MainLayout.vue';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [{ path: '', component: () => import('pages/Index.vue') }],
  },

  /**
   * Add a route for local component
   */

  // {
  //   path: '/wysimark-local-composition-component-demo',
  //   component: MainLayout,
  //   children: [
  //     {
  //       path: '',
  //       component: () =>
  //         import('src/pages/wysimark-local-composition-component-demo.vue'),
  //     },
  //   ],
  // },

  // {
  //   path: '/wysimark-local-options-component-demo',
  //   component: MainLayout,
  //   children: [
  //     {
  //       path: '',
  //       component: () =>
  //         import('src/pages/wysimark-local-options-component-demo.vue'),
  //     },
  //   ],
  // },
  /**
   * DO NOT REMOVE!
   *
   * The linked NPM package was broken and this route didn't exist. Added this
   * route back in to test with just a relative path which worked. Then the
   * linked package worked.
   *
   * I think there is a caching issue with a linked package that we can fix
   * by simply loading the same file with a relative path.
   */

  {
    path: '/build-composition',
    component: MainLayout,
    children: [
      {
        path: '',
        component: () => import('src/pages/build-composition.vue'),
      },
    ],
  },
  {
    path: '/build-options',
    component: MainLayout,
    children: [
      {
        path: '',
        component: () => import('src/pages/build-options.vue'),
      },
    ],
  },
  {
    path: '/package',
    component: MainLayout,
    children: [
      {
        path: '',
        component: () => import('src/pages/package.vue'),
      },
    ],
  },
  // {
  //   path: '/wysimark-linked-npm-package-demo',
  //   component: MainLayout,
  //   children: [
  //     {
  //       path: '',
  //       component: () =>
  //         import('src/pages/wysimark-linked-npm-package-demo.vue'),
  //     },
  //   ],
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
