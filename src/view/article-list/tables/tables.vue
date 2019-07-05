<template>
  <div>
    <Card>
      <tables ref="tables"  search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete"/>
    </Card>
    <Models :show="showArticalDetail" :id="articleId" @close="handleCloseDetail"></Models>
  </div>
</template>

<script>
import Tables from '_c/tables'
import Models from './models'
import { getArticle } from '@/api/data'

export default {
  name: 'tables_page',
  components: {
    Tables,
    Models
  },
  data () {
    return {
      columns: [
        { title: this.$t('article_id'), key: 'id', sortable: true },
        { title: this.$t('article_title'), key: 'title' },
        { title: this.$t('article_keyword'), key: 'keyword' },
        { title: this.$t('article_descript'), key: 'descript' },
        {
          title: this.$t('article_create_at'),
          key: 'create_at',
          render: (h, params) => {
            return h('div', this.$moment(params.row.create_at).format('YYYY-MM-DD HH:mm'))
          }
        },
        {
          title: this.$t('article_update_at'),
          key: 'update_at',
          render: (h, params) => {
            return h('div', this.$moment(params.row.update_at).format('YYYY-MM-DD HH:mm'))
          }
        },
        {
          title: this.$t('article_publish'),
          key: 'publish',
          render: (h, params) => {
            return h('Tag', {
              props: {
                color: 'primary'
              }
            }, this.article_publish[params.row.publish])
          }
        },
        {
          title: this.$t('article_state'),
          key: 'state',
          render: (h, params) => {
            return h('Tag', {
              props: {
                color: 'primary'
              }
            }, this.article_state[params.row.state])
          }
        },
        {
          title: this.$t('article_operation'),
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.showArticleDetail(params.row._id)
                  }
                }
              }, this.$t('article_detail')),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.handleDeleteArticle(params.row._id)
                  }
                }
              }, this.$t('article_delete'))
            ])
          }
        }
      ],
      tableData: [],
      showArticalDetail: false,
      articleId: '',
      article_publish: {
        1: this.$t('article_publice'),
        2: this.$t('article_private')
      },
      article_state: {
        1: this.$t('article_push'),
        2: this.$t('article_keep')
      }
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    showArticleDetail (_id) {
      this.showArticalDetail = true
      this.articleId = _id
    },
    handleDeleteArticle (_id) {
    },
    handleCloseDetail () {
      this.showArticalDetail = false
    }
  },
  mounted () {
    getArticle({}).then(res => {
      console.log(res.data.result.list)
      this.tableData = res.data.result.list
    })
  }
}
</script>
<style>
</style>
