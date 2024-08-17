<template>
  <div class="x-list flex items-center">
    <img src="@/assets/boost.svg" class="mr-xs" />

    <div class="x-list_item">
      <span>X</span>5
    </div>
  </div>
</template>

<style lang="scss" scoped>
.x-list {
  > img {
    width: 20px;
  }

  &_item {
    color: #222;
    font-weight: bold;
    line-height: normal;
    font-size:16px;
    
    span {
      font-size: 14px;
      font-family: 'TrickyJimmy', sans-serif;
    }
  }
}
</style>