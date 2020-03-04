<template>
    <div id="overview">
      {{$route.params}}
    </div>
</template>

<script>
// import TodoList from '../components/TodoList'

export default {
  methods: {
    test () {
      console.log(this.id)
    }
  }
}
</script>

<style lang="scss" scoped>
// Scoped Styles only for this view
#overview {
  border-top: 1px solid #E0E0E0;
}
</style>
