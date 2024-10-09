<template>
  <base-page class="flex flex-center">
    <q-card class="shadow-1 xs:w-4/5 md:w-3/5 xl:w-2/5">
      <q-card-section>
        <div class="text-center">
          <div class="col text-h5 ellipsis">{{ $t('g.system.system-name') }}</div>
        </div>
      </q-card-section>
      <card-body>
        <base-form ref="form" class="q-gutter-md">
          <base-form-item :label="$t('g.common.account')">
            <input-text
              v-model="formData.account"
              :label="$t('g.common.account')"
              lazy-rules
              required
              :placeholder="$t('g.common.input', {field: $t('g.common.account')})"
            />
          </base-form-item>
          <base-form-item :label="$t('g.common.password')">
            <input-password
              v-model="formData.password"
              :label="$t('g.common.password')"
              lazy-rules
              required
              :placeholder="$t('g.common.input', {field: $t('g.common.password')})"
              @keyup.enter="handleLogin"
            />
          </base-form-item>
          <div>
            <base-button class="w-full q-mb-md" :label="$t('entry.login.btn.login')" @click.prevent="handleLogin" />
            <base-button
              v-if="isShow.forgetPassword"
              class="text-white w-full q-mb-md"
              color="black"
              :label="$t('entry.login.btn.forget-password')"
              @click.prevent="showDialog({ mode: 'create' })"
            />
            <div v-if="isShow.register" class="text-center">
              還沒有帳號嗎? <span><router-link
                class="text-primary no-underline"
                to="/register"
              >立即註冊</router-link></span>
            </div>
          </div>
        </base-form>
      </card-body>
    </q-card>
    <forget-password-dialog ref="dialog" />
  </base-page>
</template>

<script>
import ForgetPasswordDialog from './components/ForgetPasswordDialog.vue'
import { defineComponent, ref, reactive, watch } from 'vue-demi'
import { useRouter } from 'vue-router'
import { useUser } from '@/stores/user'
import useCRUD from '@/hooks/useCRUD'

export default defineComponent({
  components: {
    ForgetPasswordDialog,
  },
  setup () {
    // data
    const router = useRouter()
    const store = useUser()
    const dialog = ref()
    const redirect = ref(undefined)
    const otherQuery = ref({})
    const formData = reactive({
      account: '',
      password: '',
    })
    const isShow = reactive({
      forgetPassword: false,
      register: false,
    })

    // methods
    const createFetch = (payload) => store.login(payload)
    const getOtherQuery = (query) => {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    const showDialog = ({ data, mode }) => {
      dialog.value.showDialog({ data, mode })
    }
    const handleLogin = () => {
      form.value.validate().then(async (success) => {
        if (success) {
          const payload = { ...formData }
          const urlObj = {
            login: () => callCreateFetch({ ...payload }),
          }
          const [res] = await urlObj.login()
          if (res) router.push({ path: redirect.value || '/', query: otherQuery.value })
        }
      })
    }

    // use
    const { form, callCreateFetch } = useCRUD({
      createSuccess: '登入成功',
      createFetch: createFetch,
    })

    // watch
    watch(() => router, () => {
      const query = router.query
      if (query) {
        redirect.value = query.redirect
        otherQuery.value = getOtherQuery(query)
      }
    })

    return {
      dialog,
      form,
      formData,
      redirect,
      otherQuery,
      isShow,
      getOtherQuery,
      showDialog,
      handleLogin,
    }
  },
})
</script>

<style lang="postcss" scoped></style>
