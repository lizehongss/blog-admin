<template>
  <div>
    <Card>
      <tables ref="tables"  search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete"/>
    </Card>
    <Models :show="showArticalDetail" v-if="showArticalDetail" :id="articleId" @close="handleCloseDetail"></Models>
  </div>
</template>

<script>
import Tables from '_c/tables'
import Models from './models'
import { getArticle, deleteArticle, patchArticle } from '@/api/data'

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
          align: 'center',
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              on: {
                click: () => {
                  this.handlePublish(params.row._id, params.row.publish)
                }
              }
            }, this.article_publish[params.row.publish])
          }
        },
        {
          title: this.$t('article_state'),
          key: 'state',
          align: 'center',
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              on: {
                click: () => {
                  this.handleState(params.row._id, params.row.state)
                }
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
                    this.handleEditArticle(params.row._id)
                  }
                }
              }, this.$t('article_edit')),
              // h('Button', {
              //   props: {
              //     type: 'text',
              //     size: 'small'
              //   },
              //   style: {
              //     marginRight: '5px'
              //   },
              //   on: {
              //     click: () => {
              //       this.showArticleDetail(params.row._id)
              //     }
              //   }
              // }, this.$t('article_detail')),
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
        0: this.$t('article_private')
      },
      article_state: {
        1: this.$t('article_push'),
        0: this.$t('article_keep')
      }
    }
  },
  methods: {
    handleDelete (params) {
    },
    showArticleDetail (_id) {
      this.showArticalDetail = true
      this.articleId = _id
    },
    handleDeleteArticle (_id) {
      deleteArticle(_id).then(res => {
        this.$Message.success(res.data.message)
        this.getArticle()
      })
    },
    handleCloseDetail () {
      this.showArticalDetail = false
    },
    handlePublish (_id, publish) {
      let params = {
        publish: publish === 1 ? '0' : '1'
      }
      patchArticle(_id, params).then(res => {
        this.$Message.success(res.data.message)
        this.getArticle()
      })
    },
    handleState (_id, state) {
      let params = {
        state: state === 1 ? '0' : '1'
      }
      patchArticle(_id, params).then(res => {
        this.$Message.success(res.data.message)
        this.getArticle()
      })
    },
    getArticle () {
      getArticle({}).then(res => {
        this.tableData = res.data.result.list
      })
    },
    handleEditArticle (_id) {
      this.$router.push({ name: 'markdown_page', params: { id: _id } })
    }
  },
  mounted () {
    this.getArticle()
  }
}
</script>
<style>
</style>
