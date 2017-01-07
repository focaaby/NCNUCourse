// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'element-ui/lib/theme-default/index.css';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/zh-TW';
import App from './App';
// import firebase from 'firebase';

Vue.use(ElementUI, { locale });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
