<template>
    <div>
        <Drawer :closable="false" width="640" v-model="openDrawer" @on-close="handleClose">
            <div class="markdown-body" v-html="articleHtml"></div>
        </Drawer>
    </div>
</template>
<script>
import { getArticleDetail } from '@/api/data'
export default {
  name: 'article_model',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      openDrawer: this.show,
      articleHtml: ''
    }
  },
  mounted () {
    this.getArticleDetail()
  },
  methods: {
    handleClose () {
      this.$emit('close')
    },
    getArticleDetail () {
      getArticleDetail(this.id).then(res => {
        this.articleHtml = res.data.result.content
      })
    }
  },
  watch: {
    show (val) {
      this.openDrawer = val
      this.getArticleDetail()
    }
  }

}
</script>
