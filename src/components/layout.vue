<template>
  <el-container>
    <el-header class="app-header">
      <div class="logo">
        <router-link :to="{path: '/'}">
          <img src="@/assets/logo.png" alt="logo">
        </router-link>
      </div>
      <div class="head-nav">
        <login @change="onChange"></login>
      </div>
    </el-header>
    <div class="container">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
    <el-footer class="app-footer">
      <p>&copy; 2019 Dee</p>
    </el-footer>
  </el-container>
</template>

<script>
import Login from '@/components/login'

export default {
  components: { Login },
  data () {
    return {
      user: ''
    }
  },
  methods: {
    onChange (user) {
      this.user = user.username
    }
  }
}
</script>

<style>
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  color: inherit;
  text-decoration: none;
}
html, body {
  height: 100%;
}
body {
  background: #f0f2f5;
  /* font-family: "Helvetica Neue", Helvetica, Arial, "Hiragino Sans GB", "Hiragino Sans GB W3", "Microsoft YaHei UI", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif; */
  font-size: 14px;
  color: #444;
}
.el-container {
  min-height: 100%;
}
.app-header {
  background-color: #444;
  line-height: 60px;
}
.logo {
  float: left;
  padding: 10px 0;
}
.logo img {
  width: 40px;
}
.head-nav {
  float: right;
}
.app-footer {
  background-color: #ccc;
  bottom: 0;
  margin-top: auto;
  line-height: 60px;
  text-align: center;
}
.container {
  padding: 20px 50px;
}
.popper-warning {
  color: #f56c6c;
}
</style>
