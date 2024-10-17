<template>
  <padding-page>
    <page-header showPrev showCancel>
      {{ $t('meun.profile') }}
    </page-header>
    <base-tabs v-model="currentCard" class="q-mb-md">
      <q-tab name="accountInfo" :label="`${$t('profile.card.account-info.title')}`" />
      <q-tab name="changePassword" :label="`${$t('profile.card.change-password.title')}`" />
    </base-tabs>
    <div class="row q-col-gutter-md">
      <div v-show="currentCard === 'accountInfo'" class="col-24">
        <q-card>
          <card-header>
            {{ $t('profile.card.account-info.title') }}
            <template #action>
              <save-button @click="onSubmit" />
            </template>
          </card-header>
          <card-body class="q-pt-none">
            <base-form ref="infoForm">
              <div class="row q-col-gutter-md">
                <div class="col-24">
                  <base-form-item :label="`${$t('g.common.account')} *`">
                    <input-text
                      v-model="formData.account"
                      class="full-width"
                      :label="`${$t('g.common.account')}`"
                      :placeholder="$t('g.common.input', { field: $t('g.common.account') })"
                      required
                      readonly
                    />
                  </base-form-item>
                </div>
                <div class="col-24">
                  <base-form-item :label="`${$t('user.form.name')} *`">
                    <input-text
                      v-model="formData.name"
                      class="full-width"
                      :label="`${$t('user.form.name')}`"
                      :placeholder="$t('g.common.input', { field: $t('user.form.name') })"
                      required
                    />
                  </base-form-item>
                </div>
                <div class="col-24">
                  <base-form-item :label="`${$t('g.common.email')}`">
                    <input-email
                      v-model="formData.email"
                      class="full-width"
                      :label="`${$t('g.common.email')}`"
                      :placeholder="$t('g.common.input', { field: $t('g.common.email') })"
                    />
                  </base-form-item>
                </div>
                <div class="col-24">
                  <base-form-item :label="`${$t('g.common.remark')}`">
                    <input-textarea
                      v-model="formData.remark"
                      class="full-width"
                      :label="`${$t('g.common.remark')}`"
                      :placeholder="$t('g.common.input', { field: $t('g.common.remark') })"
                    />
                  </base-form-item>
                </div>
              </div>
            </base-form>
          </card-body>
        </q-card>
      </div>
      <div v-show="currentCard === 'changePassword'" class="col-24">
        <q-card>
          <card-header>
            {{ $t('profile.card.change-password.title') }}
            <template #action>
              <save-button @click="onChangePassword" />
            </template>
          </card-header>
          <card-body class="q-pt-none">
            <base-form ref="changePasswordForm">
              <div class="row q-col-gutter-md">
                <div class="col-24">
                  <base-form-item :label="`${$t('g.common.old-password')} *`">
                    <input-password
                      v-model="changePasswordformData.old_password"
                      class="full-width"
                      :label="$t('g.common.old-password')"
                      autocomplete="new-password"
                      :placeholder="$t('g.common.input', { field: $t('g.common.old-password') })"
                      required
                    />
                  </base-form-item>
                </div>
                <div class="col-24">
                  <base-form-item :label="`${$t('g.common.new-password')} *`">
                    <input-password
                      v-model="changePasswordformData.new_password"
                      class="full-width"
                      :label="$t('g.common.new-password')"
                      autocomplete="new-password"
                      :placeholder="$t('g.common.input', { field: $t('g.common.new-password') })"
                      required
                      :rules="[
                        $rules.regex(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W)(?!.* ).{8,}$/i, $t('g.validation.password'))
                      ]"
                    >
                      <template #hint>
                        {{ $t('g.validation.password') }}
                      </template>
                    </input-password>
                  </base-form-item>
                </div>
                <div class="col-24">
                  <base-form-item :label="`${$t('g.common.confirm-password')} *`">
                    <input-password
                      v-model="changePasswordformData.confirm_password"
                      class="full-width"
                      :label="$t('g.common.confirm-password')"
                      autocomplete="new-password"
                      :placeholder="$t('g.common.input', { field: $t('g.common.confirm-password') })"
                      required
                      :rules="[
                        $rules.sameAs(changePasswordformData.new_password, $t('g.validation.same-as', { field: $t('g.common.new-password') }))
                      ]"
                    />
                  </base-form-item>
                </div>
              </div>
            </base-form>
          </card-body>
        </q-card>
      </div>
    </div>
    <fixed-footer :show-confirm="false" @confirm="onSubmit" />
  </padding-page>
</template>

<script>

import { defineComponent, ref, reactive } from 'vue-demi'
import { useUser } from '@/stores/user'
import useCRUD from '@/hooks/useCRUD'
import useLogout from '@/hooks/useLogout'
export default defineComponent({
  setup () {
    // data
    const store = useUser()
    const formData = reactive({ ...store.info })
    const changePasswordformData = reactive({
      old_password: '',
      new_password: '',
      confirm_password: '',
    })
    const currentCard = ref('accountInfo')

    // methods
    const updateFetch = (payload) => store.profile(payload)
    const changePasswordetch = (payload) => store.changePassword(payload)
    const onSubmit = async () => {
      infoForm.value.validate().then(async (success) => {
        if (success) {
          const payload = { ...formData }
          const urlObj = {
            edit: () => callUpdateFetch({ ...payload }),
          }
          urlObj.edit()
        }
      })
    }
    const onChangePassword = async () => {
      changePasswordForm.value.validate().then(async (success) => {
        if (success) {
          const payload = { ...changePasswordformData }
          const urlObj = {
            changePassword: () => callChangePasswordFetch({ ...payload }),
          }
          const [res] = await urlObj.changePassword()
          if (res) resetStore()
        }
      })
    }

    // use
    const { form: infoForm, callUpdateFetch } = useCRUD({
      updateFetch: updateFetch,
    })
    const { form: changePasswordForm, callCreateFetch: callChangePasswordFetch } = useCRUD({
      createSuccess: '修改密碼成功',
      createFetch: changePasswordetch,
    })
    const { resetStore } = useLogout()

    return {
      infoForm,
      changePasswordForm,
      formData,
      changePasswordformData,
      currentCard,
      onSubmit,
      onChangePassword,
    }
  },
})
</script>

<style lang="postcss" scoped></style>
