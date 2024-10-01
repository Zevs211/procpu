<script setup lang="ts">
import { ref } from 'vue';

const isAuthenticatedUser= ref<boolean>(false)
  
</script>

<template>
  <div class="header">
    <div class="logo"></div>
    <div class="menu-items">
      <div class="search-button">
        
      </div>
      <div
        class="login-button"
        :class="{'hidden': isAuthenticatedUser}">
        Войти
      </div>
      <div
        class="profile-button"
        :class="{'hidden': isAuthenticatedUser}">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 10px 0px;
  margin-bottom: 4rem;
}
.hidden {
  display: none;
}
.logo {
  height: 100%;
  width: 40px;
  background-color: aqua;
}
.menu-items {
  display: flex;
  align-items: center;
  gap: 20px;
  height: 100%;
}
.search-button {
  height: 100%;
  width: 40px;
  background-color: rgb(238, 185, 28);
  padding: 0 5px;
  border-radius: 10px;
}
.login-button {
  display: flex;
  align-items: center;
  height: 100%;
  color: white;
  cursor: pointer;
  background-color: rgb(176, 202, 109);
  padding: 0 5px;
  border-radius: 10px;
}
.profile-button {
  height: 100%;
  width: 40px;
  background-color: rgb(114, 109, 202);
  padding: 0 5px;
  border-radius: 10px;
}

@media (max-width: 600px) {
}

@media (min-width: 601px) and (max-width: 1024px) {
}

@media (min-width: 1025px) and (max-width: 1279px) {
}

@media (min-width: 1280px) {
}
</style>