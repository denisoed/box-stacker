<template>
  <div>
    <Toggle v-model="value" v-bind="$attrs" />
  </div>
</template>

<script>
  import Toggle from '@vueform/toggle'

  export default {
    components: {
      Toggle,
    },
    data() {
      return {
        value: true
      }
    }
  }
</script>

<style src="@vueform/toggle/themes/default.css"></style>

<style lang="scss">
:root {
  --toggle-bg-on: #FF9472;
  --toggle-border-on: #FF9472; 
}

.toggle-container:focus {
  box-shadow: none !important;
}
</style>