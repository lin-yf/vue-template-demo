<!-- codeEditor -->
<template>
  <div class="code-editor">
    <!-- <a-button >代码编辑，高亮补全</a-button> -->
    <div>
      <div class="code-panel">
        <textarea ref="textarea"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * codeEditor
 * @description:
 * @file: index.vue
 * @author: example <example@raycloud.com>
 * @date: 2021-05-21
 */
import CodeMirror from 'codemirror'
import 'codemirror/theme/ambiance.css'
import 'codemirror/theme/idea.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/hint/show-hint.css'

import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/mode/css/css.js'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/mode/shell/shell.js'
import 'codemirror/mode/sql/sql.js'
import 'codemirror/mode/vue/vue.js'

// 代码补全提示
import 'codemirror/addon/hint/anyword-hint.js'
import 'codemirror/addon/hint/css-hint.js'
import 'codemirror/addon/hint/html-hint.js'
import 'codemirror/addon/hint/javascript-hint.js'

import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/sql-hint.js'
import 'codemirror/addon/hint/xml-hint.js'

export default {
    name: 'CodeEditor',
    components: {},
    data () {
        return {
          coder: null,
          language: '',
          options: {
            indentWithTabs: true,
            smartIndent: true,
            matchBrackets: true,
            // 缩进格式
            tabSize: 4,
            // 主题，对应主题库 JS 需要提前引入
            // theme: 'idea',
            theme: 'idea',
            // 显示行号
            lineNumbers: true,
            line: true,
            extraKeys: { 'Ctrl': 'autocomplete' },
            mode: 'htmlmixed',
            htmlMode: true
            // mode: 'xml',
            // htmlMode: true
            // hintOptions: {// 自定义提示选项
            //   tables: {
            //     users: ['name', 'score', 'birthDate'],
            //     countries: ['name', 'population', 'size']
            //   }
            // }
          },
          modes: [{
              value: 'css',
              label: 'CSS'
            }, {
              value: 'javascript',
              label: 'Javascript'
            }, {
              value: 'html',
              label: 'XML/HTML'
            }, {
              value: 'x-sh',
              label: 'Shell'
            }, {
              value: 'x-sql',
              label: 'SQL'
          }],
          code: `<div class="code-editor">\n</div>`
        }
    },
    computed: {},
    watch: {},
    methods: {
      initEditor () {
        this.coder = CodeMirror.fromTextArea(this.$refs.textarea, this.options)
        // 编辑器赋值
        this.coder.setValue(this.code)
        // 支持双向绑定
        this.coder.on('change', (coder) => {
          this.code = coder.getValue()

          if (this.$emit) {
            this.$emit('input', this.code)
          }
        })
        // this.coder.on('cursorActivity', () => {
        //   this.coder.showHint()
        // })
        // 尝试从父容器获取语法类型
        // if (this.language) {
        //   // 获取具体的语法类型对象
        //   const modeObj = this.getLanguage(this.language)

        //   // 判断父容器传入的语法是否被支持
        //   if (modeObj) {
        //     this.mode = modeObj.label
        //   }
        // }
      },
      // 获取当前语法类型
      getLanguage (language) {
        // 在支持的语法类型列表中寻找传入的语法类型
        return this.modes.find((mode) => {
          // 所有的值都忽略大小写，方便比较
          const currentLanguage = language.toLowerCase()
          const currentLabel = mode.label.toLowerCase()
          const currentValue = mode.value.toLowerCase()
          // 由于真实值可能不规范，例如 java 的真实值是 x-java ，所以讲 value 和 label 同时和传入语法进行比较
          return currentLabel === currentLanguage || currentValue === currentLanguage
        })
      }
    },
    created () {

    },
    mounted () {
      this.initEditor()
    },
    destroyed () {}
}
</script>
<style lang='less' scoped>
// @import url(); 引入公共css类
.cm-tab{
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWOQkpLyZfD09PwPAAfYAnaStpHRAAAAAElFTkSuQmCC) right repeat-y;
}
</style>
