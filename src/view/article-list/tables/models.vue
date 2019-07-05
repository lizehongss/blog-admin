<template>
    <div>
        <Drawer :closable="false" width="640" v-model="openDrawer" @on-close="handleClose">
            <div>test</div>
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
      openDrawer: this.show
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
        console.log(res)
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
