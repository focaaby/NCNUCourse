<template>
  <el-row>
    <el-col :span="24">
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
        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              size="small"
              @click="handleShowDialog(scope.row)">
              查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <el-dialog title="課程資訊" v-model="dialogVisible" size="large">
      <span slot="footer" class="dialog-footer">

        <el-row>
          <el-col :span="12">
            <el-table
              :data="currentPosts"
              :stripe="true"
              :show-header="false">
              <el-table-column >
                <template scope="scope">
                  <img :src="'https://graph.facebook.com/'+ scope.row.userid + '/picture'">
                </template>
              </el-table-column>
              <el-table-column>
                <template scope="scope">
                  <span>
                    <a :href="'https://facebook.com/'+ scope.row.userid + '/picture'"</a>
                    </span>
                  <span> {{displayDate(scope.row.date)}} </span>
									<div> {{scope.row.messages}} </div>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>

        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible=false">確認</el-button>
      </span>
    </el-dialog>
  </el-row>
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
  data() {
    return {
      dialogVisible: false,
      currentCourse: {},
      currentPosts: [],
    };
  },
  methods: {
    handleShowDialog(row) {
      this.dialogVisible = true;
      this.currentCourse = row;
      const obj = row.posts || {};
      this.currentPosts = Object.keys(obj).map(k => obj[k]);
    },
    displayDate(timestamp) {
      const dateArr = new Date(timestamp).toString().split(' ', 4);
      const newDate = `${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`;
      return newDate;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
