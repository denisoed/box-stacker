<template>
  <div class="button">
    <slot />
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.button {
  min-width: 40px;
  min-height: 40px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 50px;
  background: #fff;
  box-shadow: 0 2px 0 0 #e9edee, 0 2px 0 2px #ccd2d2, 0 5px 2px 1px #d5dbdb;
  
  text-align: center;
  color: #333344;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  
  -webkit-tap-highlight-color: rgba(black, 0);
  
  &:active {
    top: 2px;
    
    box-shadow: 0 1px 0 1px #ccd2d2, 0 1px 1px 1px #d5dbdb;
  }
}
</style>