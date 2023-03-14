const ibase = [{
  path: "/ibase",
  name: "Ibase",
  component: () => import("~/views/ibase/index.vue"),
  meta: {
    title: "Home",
  },
},
{
  path: "/ibase/airports",
  name: "Airports",
  component: () => import("~/views/ibase/airports/index.vue"),
},

];

export default ibase;
