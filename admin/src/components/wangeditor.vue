<template>
    <div style="border: 1px solid #ccc">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
            :mode="Data.mode" />
        <Editor style="height: 500px; overflow-y: hidden;" @onChange="handleChange" v-model="valueHtml"
            :defaultConfig="editorConfig" :mode="Data.mode" @onCreated="handleCreated" />
    </div>
</template>
<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted, defineProps, defineEmits, reactive } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const Data = reactive({
    mode: 'default',
})

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')

const props = defineProps({
    value: {
        type: String,
        default: () => "",
    },
})
const emits = defineEmits(['update:value'])


// emits('update:value', arr)

// 模拟 ajax 异步获取内容
onMounted(() => {
    setTimeout(() => {
        valueHtml.value = props.value
    }, 0)
})
const handleChange = (editor) => {
    // console.log('change:', editor.children)
    emits('update:value', valueHtml.value)
}

const toolbarConfig = {
    excludeKeys: [
        // 'insertVideo',
        // 'uploadVideo',
        'group-video',//视频上传按钮
        // 'insertImage'
        // 'group-image',//图片上传接口
    ]
}
const editorConfig = {
    placeholder: '请输入内容...',
    hoverbarKeys: {
        'link': {
            // 重写 link 元素的 hoverbar
            menuKeys: ['editLink', 'unLink', 'viewLink'],
        },
        'image': {
            // 清空 image 元素的 hoverbar
            menuKeys: [],
        }
    },
    MENU_CONF: {
        insertImage: {
            onInsertedImage(imageNode) {                    // JS 语法
                if (imageNode == null) return
                const { src, alt, url, href } = imageNode
                console.log('inserted image', src, alt, url, href)
            },
            customCheckImageFn(src, alt, url) {                                                    // JS 语法
                if (!src) {
                    return
                }
                console.log(888888)
                if (src.indexOf('http') !== 0) {
                    return '图片网址必须以 http/https 开头'
                }
                return true
                // 返回值有三种选择：
                // 1. 返回 true ，说明检查通过，编辑器将正常插入图片
                // 2. 返回一个字符串，说明检查未通过，编辑器会阻止插入。会 alert 出错误信息（即返回的字符串）
                // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止插入。但不会提示任何信息
            },
            // customParseImageSrc(src) {               // JS 语法
            //   if (src.indexOf('http') !== 0) {
            //     return `http://${src}`
            //   }
            //   return src
            // }
        },
        uploadImage: {
            server: '/api/upload',
            // 单个文件的最大体积限制，默认为 2M
            maxFileSize: 1 * 1024 * 1024, // 1M
            // 最多可上传几个文件，默认为 100
            maxNumberOfFiles: 1,
            // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
            allowedFileTypes: ['image/*'],

            // 小于该值就插入 base64 格式（而不上传），默认为 0
            base64LimitSize: 1 * 1024 * 1024, // 1m
            // 单个文件上传失败
            // onFailed(file: File, res: any) {   // TS 语法
            onFailed(file, res) {           // JS 语法
                console.log(`${file.name} 上传失败`, res)
            },

            // 上传错误，或者触发 timeout 超时
            // onError(file: File, err: any, res: any) {  // TS 语法
            onError(file, err, res) {               // JS 语法
                console.log(`${file.name} 上传出错`, err, res)
                alert(err.message)
            },
        }
    }
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}
</script>    