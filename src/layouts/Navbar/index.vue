<!-- eslint-disable vue/no-export-in-script-setup -->
<script setup lang="ts">
import { defineComponent } from "vue";
import ThemeChange from "./components/ThemeChange/index.vue";
import LocalesChange from "./components/LocalesChange/index.vue";
import Clock from "./components/ClockBar/index.vue";
import TogMenu from "./components/Togmenu/index.vue";
</script>

<template>
  <div
    class="sticky top-0 z-30 flex h-20 w-full justify-center text-base-content opacity-90 backdrop-blur transition-all duration-100"
  >
    <nav class="navbar w-full bg-base-100">
      <div class="flex flex-1 md:gap-1 lg:gap-2">
        <RouterLink
          to="/"
          aria-current="page"
          aria-label="Homepage"
          class="btn-ghost btn px-2"
        >
          <div
            class="inline-flex text-lg text-primary  md:text-2xl"
          >
            <span class="uppercase text-accent"><span class="text-sm uppercase">AWAHS</span></span>
            <span class="text-base-content">  <span class="text-sm uppercase">Services</span></span>
          </div>
        </RouterLink>
        <div class="container mx-auto mt-4">
          <Clock />
        </div>
      </div>

      <div class="flex-none">
        <ul class="hoverable hover:bg-blue-800 hover:text-white">
          <input id="toggle-one" type="checkbox" value="selected" class="toggle-input">
          <label for="toggle-one" class="btn-ghost btn gap-1 normal-case">Services</label>
          <div role="toggle" class="mega-menu mb-16 bg-gray-800 p-6 shadow-xl sm:mb-0">
            <div class="ontainer  mx-2 flex w-full flex-wrap justify-between">
              <ul class="w-full border-b border-gray-600 px-4 py-6 sm:w-1/2 sm:border-r lg:w-1/4 lg:border-b-0 lg:pt-3">
                <h3 class="text-bold mb-2 text-xl font-bold text-white">
                  <span class="text-lg font-normal uppercase text-accent">iBase</span><span class="ml-1 font-normal uppercase">Codes</span>
                </h3>
                <RouterLink to="/ibase">
                  <li><a class="block p-3  text-gray-300 hover:bg-base-100 hover:text-accent">IMP Codes</a></li>
                </RouterLink>
              </ul>
              <ul class="w-full border-b border-gray-600 px-4 py-6 sm:w-1/2 sm:border-r lg:w-1/4 lg:border-b-0 lg:pt-3">
                <h3 class="text-bold mb-2 text-xl font-bold text-white">
                  <span class="text-lg font-normal  uppercase text-accent ">Aviation</span><span class="ml-1 font-normal uppercase">Codes</span>
                </h3>
                <RouterLink to="/ibase/airports">
                  <li><a class="block p-3 text-gray-300 hover:bg-base-100 hover:text-accent">Airports</a></li>
                </RouterLink>
                <RouterLink to="/ibase/airlines">
                  <li><a class="block p-3 text-gray-300 hover:bg-base-100 hover:text-accent">Airlines</a></li>
                </RouterLink>
              </ul>
            </div>
          </div>
        </ul>
      </div>

      <div>
        <ThemeChange />
        <LocalesChange />
      </div>
    </nav>
  </div>
</template>

<style>
.mega-menu {
  display: none;
  left: 0;
  position: absolute;
  text-align: left;
  width: 100%;
}

.hoverable {
  position: static;
}

.hoverable > a:after {
  content: "\25BC";
  font-size: 10px;
  padding-left: 6px;
  position: relative;
  top: -1px;
}

.hoverable:hover .mega-menu {
  display: block;
}

.toggleable > label:after {
  content: "\25BC";
  font-size: 10px;
  padding-left: 6px;
  position: relative;
  top: -1px;
}

.toggle-input {
  display: none;
}
.toggle-input:not(checked) ~ .mega-menu {
  display: none;
}

.toggle-input:checked ~ .mega-menu {
  display: block;
}

.toggle-input:checked + label {
  color: white;
  background: #2c5282; /*@apply bg-blue-800 */
}

.toggle-input:checked ~ label:after {
  content: "\25B2";
  font-size: 10px;
  padding-left: 6px;
  position: relative;
  top: -1px;
}
</style>
