<template>
  <div>
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <td>課號</td>
          <td>課名</td>
          <td>開課教師</td>
          <td>推薦人數</td>
          <td>評價人數</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="course in courses">
          <td>{{ course.courseid }}</td>
          <td>{{ course.cname }}</td>
          <td>{{ course.teachers }}</td>
          <td>{{ course.recommend }}</td>
          <td>{{ course.recommend + course.unrecommend }}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAopMAhImuKRyDKxOmxvdoWGyFGVN0q5IM',
  authDomain: 'ncnu-course.firebaseapp.com',
  databaseURL: 'https://ncnu-course.firebaseio.com',
  storageBucket: 'ncnu-course.appspot.com',
  messagingSenderId: '644552311532',
};

firebase.initializeApp(config);
const db = firebase.database();
const ref = db.ref('/course1/');

export default {
  name: 'course',
  data() {
    return {
      courses: {},
    };
  },
  beforeMount() {
    ref.once('value').then((snapshot) => {
      this.courses = snapshot.val();
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
