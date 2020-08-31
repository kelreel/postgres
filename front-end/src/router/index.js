import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Race from "../views/Race.vue";
import Hero from "../views/Hero.vue";
import Creature from "../views/Creature";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/race",
    name: "Race",
    component: Race,
  },
  {
    path: "/hero",
    name: "Hero",
    component: Hero,
  },
  {
    path: "/creature",
    name: "Creature",
    component: Creature,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
