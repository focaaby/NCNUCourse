<template>
  <div id="app">
    <navbar class="nav"></navbar>
    <course></course>
  </div>
</template>

<script>
import Course from './components/Course';
import Navbar from './components/Navbar';

export default {
  name: 'app',
  components: {
    Course,
    Navbar,
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

.nav {
  margin-bottom: 20px;
}
</style>
