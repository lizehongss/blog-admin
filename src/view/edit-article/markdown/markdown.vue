<template>
  <div>
    <markdown-editor v-model="content"/>
    <Button type="primary" @click="submitArticle">{{$t('submitText')}}</Button>
    <Button type="primary" @click="oathArticle">{{$t('oathText')}}</Button>
  </div>
</template>

<script>
import MarkdownEditor from '_c/markdown'
import { postArticle } from '@/api/data'
export default {
  name: 'markdown_page',
  components: {
    MarkdownEditor
  },
  data () {
    return {
      content: ''
    }
  },
  methods: {
    submitArticle () {
      console.log(this.content, 'content')
      let articleArray = this.content.split('<hr>')
      console.log(articleArray, 'array')
      let articleInfo = articleArray[1].replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/\n/g, '').split('<br>')
      let articleInfoArray = []
      for (let item of articleInfo) {
        let infoMeta = item.split(':')
        articleInfoArray[infoMeta[0]] = infoMeta[1]
      }

      console.log(articleInfoArray, 'title ')
      console.log(articleInfoArray['tag'].split('#'), 'tag')
      postArticle({
        title: articleInfoArray['title'],
        keyword: articleInfoArray['keyword'],
        descript: articleInfoArray['descript'],
        tag: articleInfoArray['tag'].split('#'),
        content: articleArray[2]
      }).then(res => {
        if (res.data.code === 1) {
          this.$Message.success(res.data.message)
        }
      }).catch(res => {
        console.log(res)
      })
    },
    oathArticle () {

    }
  }
}
</script>

<style>

</style>
