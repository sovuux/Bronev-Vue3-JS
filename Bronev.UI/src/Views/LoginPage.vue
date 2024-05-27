<template>
  <div class="login">
    <div class="login-aside">
      <img
        src="@/assets/img/bgmain.jpg"
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
      <ButtonBaseComponent
        :button-name="'Войти'"
        class="login-text-button"
        @click-action="tryLogin"
      >
        <template #buttonContent />
      </ButtonBaseComponent>
    </div>
  </div>
</template>

<script setup>
import ButtonBaseComponent from "@/components/ BaseComponents/Button/ButtonBaseComponent.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()

const loginPage = ref()

const tryLogin = () => {
  const loginUrl = 'https://core.dev.bronew.ru/auth/sso'
  loginPage.value = window.open(loginUrl, '_blank', 'left=800,top=100,width=500,height=500')
  const checkTokenInterval = setInterval(() => {
    if (loginPage.value.closed || loginPage.value.location.pathname.startsWith("/login")) {
      const result = loginPage.value.location.href.split(/[=?/&]/).splice(5,6).join('');
      const resultParts = result.split("refresh_token");
      const token = resultParts[0].trim();
      const refreshToken = resultParts[1].trim();
      clearInterval(checkTokenInterval)
      localStorage.setItem("token", token)
      localStorage.setItem("refresh_token", refreshToken)
      loginPage.value.close()
      console.clear()
      router.push("/home")
    }
  }, 1000)
}
</script>

<style scoped lang="scss">
.login {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  height: 100vh;
  z-index: 9999;
  background: #fff;

  &-aside {
    &-img {
      width: 83.2%;
      height: 100vh;
      object-fit: cover;
    }
  }

  &-text {
    display: grid;
    width: 40%;
    padding: 0;

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