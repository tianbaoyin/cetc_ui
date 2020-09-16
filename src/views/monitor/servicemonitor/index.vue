<template>
  <div>
    <iframe id="myiframe" src="http://127.0.0.1:9204" height="560px" width="100%" frameborder="0" />
  </div>
</template>
<script>
export default {
  created() {
    this.setHeigth()
  },
  mounted() {
    /**
     * iframe-宽高自适应显示
     */
    const oIframe = document.getElementById('myiframe')
    let deviceHeight = document.documentElement.clientHeight

    oIframe.style.height = (Number(deviceHeight)) - 88 + 'px' // 数字是页面布局高度差
    window.onresize = function() {
      deviceHeight = document.documentElement.clientHeight
      oIframe.style.height = (Number(deviceHeight)) - 88 + 'px' // 数字是页面布局高度差
    }
  },
  methods: {
    setHeigth() {
    }
  }

}
</script>
