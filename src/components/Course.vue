<template>
  <div>
    <el-table
      :data="courses"
      height="600"
      border
      style="width: 100%">
      <el-table-column
        prop="courseid"
        label="課號"
        sortable>
      </el-table-column>
      <el-table-column
        prop="cname"
        label="課名">
      </el-table-column>
      <el-table-column
        prop="teachers"
        label="開課教師">
      </el-table-column>
      <el-table-column
        prop="recommend"
        label="推薦人數"
        sortable>
      </el-table-column>
    </el-table>
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

export default {
  name: 'course',
  firebase: {
    courses: db.ref('/course1/'),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
