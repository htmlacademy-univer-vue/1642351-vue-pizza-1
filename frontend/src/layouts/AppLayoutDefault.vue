<template>
  <div class="appLayout">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.appLayout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
