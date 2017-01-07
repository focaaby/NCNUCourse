<template>
  <div id="app">
    <course></course>
  </div>
</template>

<script>
import Course from './components/Course';

export default {
  name: 'app',
  components: {
    Course,
  },
};
</script>

<style scoped>
#app {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
</style>
