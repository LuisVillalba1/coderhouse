<template>
  <router-view v-slot="{Component}">
    <transition :name="$route.meta.transitionAuth ? $route.meta.transitionAuth : ''" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>


  .register-enter-active{
    animation: rotateTransition 0.8s ease 0s normal none;
  }

  .login-enter-active{
    animation: opacityTransition 0.8s ease 0s normal none;
  }


  @keyframes opacityTransition{
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }

  @keyframes rotateTransition{
    from{
      rotate: y 110deg;
      opacity: 0.5;
    }
  }

</style>