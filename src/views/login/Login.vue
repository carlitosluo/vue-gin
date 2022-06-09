<!--  -->
<template>
  <div class="register">
    <b-row class="mt-5">
      <b-col
        md="8"
        offset-md="2"
        lg="6"
        offset-lg="3"
      >
        <b-card title="登录">
          <b-form>
            <b-form-group label="手机号">
              <b-form-input
                v-model="$v.user.telephone.$model"
                type="number"
                placeholder="请输入手机号（选填）"
                :state="validateState('telephone')"
              ></b-form-input>
              <b-form-invalid-feedback :state="validateState('telephone')">
                手机号不符合要求
              </b-form-invalid-feedback>

              <!-- <b-form-text
                id="password-help-block"
                text-variant="danger"
                v-if="showTelephoneValidate"
              >
                手机号必须要11位
              </b-form-text> -->
            </b-form-group>
            <b-form-group label="密码">
              <b-form-input
                v-model="$v.user.password.$model"
                type="password"
                placeholder="请输入密码（选填）"
                :state="validateState('password')"
              ></b-form-input>
              <b-form-invalid-feedback :state="validateState('password')">
                密码必须大于6位
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group>
              <b-button
                @click="login"
                variant="outline-primary"
                block
              >登录</b-button>
            </b-form-group>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';

import customValidator from '@/helper/validator';

import { mapActions } from 'vuex';

export default {
  data() {
    return {
      user: {
        telephone: '',
        password: '',
      },
      showTelephoneValidate: false,
    };
  },
  validations: {
    user: {
      telephone: {
        required,
        telephone: customValidator.telephoneValidator,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
  methods: {
    ...mapActions('userModule', { userlogin: 'login' }),
    validateState(name) {
      // e6结构赋值
      const { $dirty, $error } = this.$v.user[name];
      return $dirty ? !$error : null;
    },
    login() {
      // if (this.user.telephone.length !== 11) {
      //   this.showTelephoneValidate = true;
      //   return;
      // }
      // 验证数据
      this.$v.user.$touch();
      if (this.$v.user.$anyError) {
        return;
      }
      // const api = 'http://localhost:8025/api/auth/register';
      this.userlogin(this.user).then(() => {
        this.$router.replace({ name: 'Home' });
      }).catch((err) => {
        // console.log('err:', err.response.data.msg);
        this.$bvToast.toast(err.response.data.msg, {
          title: '数据验证错误1',
          variant: 'danger',
          solid: true,
        });
      });
    },
  },
};
</script>
<style lang='scss' scoped>
</style>
