// layouts
import MainLayout from "../layouts/MainLayout.vue";

// pages
import ErrorPage from "../pages/ErrorNotFound.vue";
import Login from "../pages/LoginPage.vue";
import Home from "../pages/HomePage.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", redirect: "/home" },
      {
        path: "login",
        component: Login,
        meta: { guest: true },
      },
      {
        path: "home",
        component: Home,
        meta: { auth: true },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: ErrorPage,
  },
];

export default routes;
