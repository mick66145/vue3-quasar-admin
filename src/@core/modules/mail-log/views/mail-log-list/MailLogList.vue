<template>
  <base-page>
    <page-header>
      {{ $t('mail-log.title') }}
    </page-header>

    <q-card>
      <card-body>
        <mail-log-list-search-block
          v-model="search"
          class="q-mb-sm"
          @changeFilter="onChangeFilter"
          @reset="onReset"
        />
        <vxe-server-table
          ref="dataTable"
          :data="data"
          :total="total"
          :current="search.page"
          @sort-change="onChangeSort"
          @update:current="onChangePage"
        >
          <vxe-column
            v-for="{ field, title, min_width } in tableFields"
            :key="field"
            :field="field"
            :title="`${$t(title)}`"
            :min-width="min_width"
          />
          <vxe-column :title="`${$t('g.common.operate')}`" fixed="right" width="80">
            <template #default="{ row }">
              <div class="row">
                <view-icon-button
                  v-permission="['view mail_log']"
                  class="q-mr-xs q-mb-xs"
                  @click="showDialog({ id:row.id, mode:'edit', callRead:true })"
                />
              </div>
            </template>
          </vxe-column>
        </vxe-server-table>
      </card-body>
    </q-card>
    <mail-log-dialog ref="dialog" />
  </base-page>
</template>

<script>
import MailLogListSearchBlock from './components/MailLogListSearchBlock.vue'
import MailLogDialog from './components/MailLogDialog.vue'
import { defineComponent, ref, reactive } from 'vue-demi'
import { MailLogResource } from '@core/modules/mail-log/api'
import useCRUD from '@/hooks/useCRUD'
import useVxeServerDataTable from '@/hooks/useVxeServerDataTable'

const mailLogResource = MailLogResource({})

export default defineComponent({
  components: {
    MailLogListSearchBlock,
    MailLogDialog,
  },
  setup () {
    // data
    const dialog = ref()
    const filter = reactive({
      keyword: null,
      date_range: null,
      start_date: null,
      end_date: null,
    })
    const tableFields = reactive([
      { title: 'mail-log.form.send-date', field: 'send_datetime', min_width: '130' },
      { title: 'mailinfo.form.fromname', field: 'from', min_width: '200' },
      { title: 'mailinfo.form.tomail', field: 'to', min_width: '130' },
      { title: 'mailinfo.form.cc', field: 'cc', min_width: '130' },
      { title: 'mailinfo.form.bcc', field: 'bcc', min_width: '130' },
      { title: 'mailinfo.form.subject', field: 'subject', min_width: '200' },
      { title: 'g.common.state', field: 'state_text', min_width: '130' },
    ])

    // methods
    const fetchData = (query) => mailLogResource.list({ query })
    const refreshFetch = () => {
      const filter = { ...search }
      filter.start_date = filter.date_range?.from ? filter.date_range.from : null
      filter.end_date = filter.date_range?.to ? filter.date_range.to : null
      return getDataList({ ...filter })
    }
    const showDialog = ({ id, mode, callRead }) => {
      dialog.value.showDialog({ id, mode, callRead })
    }

    const { dataTable, search, data, total, onChangePage, onChangeFilter, onChangeSort, onReset } = useVxeServerDataTable({
      searchParames: filter,
      sortParames: [{ field: 'id', order: 'desc' }],
      sessionStorageKey: 'dashboardMailLogServerDataTable',
      callback: refreshFetch,
    })

    const { callReadListFetch: getDataList } = useCRUD({
      readListFetch: fetchData,
    })

    return {
      dialog,
      dataTable,
      tableFields,
      data,
      total,
      search,
      onChangePage,
      onChangeFilter,
      onChangeSort,
      onReset,
      showDialog,
    }
  },
})
</script>

<style lang="postcss" scoped>
</style>
