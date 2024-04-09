<template>
  <div class="login">
    <div class="login-aside">
      <img
        src="../../../assets/img/bgmain.jpg"
        alt="bus-pic"
        class="login-aside-img"
      >
    </div>
    <div class="login-text">
      <span class="login-text-title">
        Добро пожаловать в систему управления продажами
        <strong class="login-text-title-strong">БРОНЕВ</strong>
      </span>
      <span class="login-text-content">
        Для продолжения работы неоходимо пройти авторизацию
      </span>
      <router-link to="/home">
        <ButtonBaseComponent
          :button-name="'Войти'"
          class="login-text-button"
          @click-action="tryLogin"
        >
          <template #buttonContent />
        </ButtonBaseComponent>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import ButtonBaseComponent from "@/components/ BaseComponents/Button/ButtonBaseComponent.vue";

const emit = defineEmits(["tryLogin"])

const tryLogin = () => {
  const loginUrl = 'https://core.dev.bronew.ru/auth/sso'
  const loginPage = window.open(loginUrl, '_blank', 'left=800,top=100,width=500,height=500')
  loginPage.addEventListener('load', () => {
    const pageUrl = loginPage.location.href
    console.log(pageUrl)
  })
  emit("tryLogin")
}
</script>

<style scoped lang="scss">
.login {
  
  display: flex;
  align-items: center;
  height: 100vh;

  &-aside {
    &-img {
      width: 640px;
      height: 1002px;
      object-fit: cover;
    }
  }

  &-text {
    display: grid;
    width: 35%;
    padding: 10%;

    &-title {
      user-select: none;
      font-size: 30px;
      color: #6e6c6c;

      &-strong {
        font-weight: bolder;
      }
    }

    &-content {
      padding-top: 3%;
      user-select: none;
      color: #455a64;
    }

    &-button {
      margin-top: 3%;
      width: 86.5%;
    }
  }
}
</style>