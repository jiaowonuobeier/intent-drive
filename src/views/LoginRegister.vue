<template>
  <div class="login">
    <p>Login</p>
    <input
      type="text"
      class="username"
      placeholder="用户名"
      v-model="userName"
    />
    <input
      type="password"
      class="password"
      placeholder="密码"
      v-model="passWord"
    />
    <input
      type="role_id"
      class="role_id"
      placeholder="你的角色"
      v-model="role_id"
    />
    <input type="submit" class="btn" value="登  录" @click="login" />
    <input type="submit" class="btn" value="注  册" @click="register" />
  </div>
</template>

<!-- <script src="https://cdn.staticfile.org/axios/0.18.0/axios.min.js"></script>  -->


<script>
import axios from "axios";
export default {
  name: "LoginRegister",
  data() {
    return {
      userName: "",
      passWord: "",
      role_id: "",
    };
  },
  components: {},
  methods: {
    async register() {
      await axios({
        method: "post",
        url: "http://127.0.0.1:4999/register",
        data: {
          username: this.userName,
          password: this.passWord,
          role_id: Number(this.role_id),
        },
        responseType: "json",
      }).then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log("错误", error);
        }
      );
    },
    // async
    login() {
      // await axios({
      //   method: "post",
      //   url: "http://127.0.0.1:4999/login",
      //   data: {
      //     username: this.userName,
      //     password: this.passWord,
      //   },
      //   responseType: "json",
      // }).then(
      //   (response) => {
      //     console.log("正确", response);
      //     this.$router.push("/IndexPage");
      //   },
      //   (error) => {
      //     console.log("错误", error);
      //     alert("请输入正确的用户名和密码");
      //   }
      // );
      this.$router.push("/IndexPage/NetTopo");
      console.log(123);
    },
  },
};
</script>

<style>
.login {
  position: absolute;
  top: 45%;
  margin-top: -200px;
  left: 50%;
  margin-left: -200px;
  /* absolute居中的一种方法 */
  background-color: whitesmoke;
  width: 400px;
  height: 400px;
  border-radius: 25px;
  text-align: center;
  padding: 5px 40px;
  box-sizing: border-box;
  /* 这样padding就不会影响大小 */
}

p {
  font-size: 42px;
  font-weight: 600;
}

input {
  background-color: whitesmoke;
  width: 100%;
  height: 48px;
  margin-bottom: 10px;
  border: none;
  border-bottom: 2px solid silver;
  /* 下面的会覆盖上面的步伐 */
  outline: none;
  font-size: 22px;
}

.btn {
  background-color: #59c2c5;
  width: 38%;
  height: 48px;
  border-radius: 8px;
  margin-top: 40px;
  font-size: 28px;
  font-weight: 600;
  color: white;
}
.btn:hover {
  background-color: #59c2a0;
}
</style>