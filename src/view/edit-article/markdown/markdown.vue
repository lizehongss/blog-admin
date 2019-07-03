<template>
  <div>
    <markdown-editor v-model="content"/>
    <Button type="primary" @click="submitArticle">{{$t('submitText')}}</Button>
    <Button type="primary" @click="oathArticle">{{$t('oathText')}}</Button>
  </div>
</template>

<script>
import MarkdownEditor from '_c/markdown'
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
      let articleArray = this.content.split('<hr>')
      let articleInfo = articleArray[1].replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/\n/g, '').split('<br>')
      let articleInfoArray = []
      for (let item of articleInfo) {
        let infoMeta = item.split(':')
        articleInfoArray[infoMeta[0]] = infoMeta[1]
      }

      console.log(articleInfoArray, 'title ')
    },
    oathArticle () {

    }
  }
}
</script>

<style>

</style>
