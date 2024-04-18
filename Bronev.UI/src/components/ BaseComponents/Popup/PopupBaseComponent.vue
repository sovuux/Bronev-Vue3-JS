<template>
  <div class="popup-background popup-show">
    <div class="popup">
      <div class="popup-header">
        <slot name="popupHeader" />
      </div>
      <div class="popup-body">
        <slot name="popupBody" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">

.popup {
  background-color: white;
  width: 500px;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  animation: popup-button-anim 0.3s ease-in-out;

  @keyframes popup-button-anim {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }

    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  &-background {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
  }

  &-show {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-header {
    text-align: center;
    user-select: none;
    background: #dddddd;
    width: 100%;
  }
}
</style>