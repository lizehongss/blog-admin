<template>
  <div>
    <Form ref="articleForm" :model="articleForm"  label-position="left" :rules="ruleValidate">
      <FormItem :label="$t('articleForm_title')" prop="title">
        <Input type="text" v-model="articleForm.title"/>
      </FormItem>
      <FormItem :label="$t('articleForm_keyword')" prop="keyword">
        <Input type="text" v-model="articleForm.keyword"/>
      </FormItem>
      <FormItem :label="$t('articleForm_descript')" prop="descript">
        <Input type="text" v-model="articleForm.descript"/>
      </FormItem>
      <FormItem :label="$t('articleForm_tag')">
        <span class="tags">
          <Tag
          v-for="tag in articleForm.tag"
          closable
          :key="tag"
          color ="success"
          @on-close="closeTag(tag)"
          >{{tag}}</Tag>
        </span>
        <Input v-if="inputVisible"
          class="input-new-tag"
          v-model="tagInput"
          @on-enter='addTag'
          @on-blur='addTag'
        />
        <Button class="button-new-tag" v-else size="small" @click="inputVisible = true">+</Button>
      </FormItem>
      <FormItem :label="$t('articleForm_content')" prop="content">
        <markdown-editor v-model="articleForm.content"/>
      </FormItem>
    </Form>
    <Button type="primary" @click="submitArticle('edit')" v-if="this.articleId" style="marginRight: 5em">{{$t('saveEdit')}}</Button>
    <Button type="primary" @click="submitArticle('save')" v-else style="marginRight: 5em" >{{$t('submitText')}}</Button>
    <Button type="primary" @click="oathArticle">{{$t('oathText')}}</Button>
  </div>
</template>

<script>
import MarkdownEditor from '_c/markdown'
import { postArticle, postTag, getArticleDetail, editArticle } from '@/api/data'
export default {
  name: 'markdown_page',
  components: {
    MarkdownEditor
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    this.$destroy('markdown_page')
    next()
  },
  data () {
    return {
      ruleValidate: {
        title: [
          { required: true, message: this.$t('ruleValidate'), trigger: 'blur' }
        ],
        keyword: [
          { required: true, message: this.$t('ruleValidate'), trigger: 'blur' }
        ],
        descript: [
          { required: true, message: this.$t('ruleValidate'), trigger: 'blur' }
        ],
        // tag: [
        //   { required: true, message: this.$t('ruleValidate'), trigger: 'change', type: 'array' }
        // ],
        content: [
          { required: true, message: this.$t('ruleValidate'), trigger: 'change' }
        ]

      },
      content: '',
      articleId: '',
      inputVisible: false,
      tagInput: '',
      articleForm: {
        title: '',
        keyword: '',
        descript: '',
        tag: [],
        content: ''
      },
      tagId: []
    }
  },
  mounted () {
    this.articleId = this.$route.params.id
    if (this.articleId) {
      getArticleDetail(this.articleId).then(res => {
        for (let item in this.articleForm) {
        // this.articleForm.title = res.data.result.title
          if (item === 'tag') {
            this.articleForm[item] = res.data.result[item].map(res => {
              return res.name
            })
          } else {
            this.articleForm[item] = res.data.result[item]
          }
        }
      })
    }
  },
  methods: {
    closeTag (tag) {
      this.articleForm.tag.splice(this.articleForm.tag.indexOf(tag), 1)
    },
    addTag () {
      let inputValue = this.tagInput
      if (inputValue) {
        this.articleForm.tag.push(inputValue)
      }
      this.inputVisible = false
      this.tagInput = ''
    },
    submitArticle (sign) {
      this.$refs['articleForm'].validate((valid) => {
        if (valid) {
          if (sign === 'save') {
            this.postArticle()
          } else {
            this.editArticle()
          }
          localStorage.markdownContent = ''
          this.$router.push({ name: 'articleList_page' })
        } else {
          this.$Message.error(this.$t('faileValid'))
        }
      })
    },
    postArticle () {
      this.articleForm.tag = this.tagId
      postArticle(this.articleForm).then(res => {
        this.$Message.success(res.data.message)
      })
    },
    editArticle () {
      this.articleForm.tag = this.tagId
      editArticle(this.articleId, this.articleForm).then(res => {
        this.$Message.success(res.data.message)
      })
    },
    oathArticle () {

    }
  },
  watch: {
    async 'articleForm.tag' (val) {
      if (val === this.tagId) return
      this.tagId = []
      for (let item of val) {
        await postTag({ name: item, descript: item }).then(res => {
          this.tagId.push(res.data.result[0]._id)
        })
      }
    }
  }
}
</script>

<style>

</style>
