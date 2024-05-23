<template>
  <div class="multi-upload">
    <el-form ref="form" :inline="true" :model="form" label-width="80px">
      <el-form-item label="图库类型">
        <el-select v-model="form.tukuType" @change="handleChange">
          <el-option label="白小姐" value="1"></el-option>
          <el-option label="状元红" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
    <div class="upload-wrap">
      <div class="input-file">
        <input ref="fileRef" type="file" webkitdirectory directory @change="changeFileHandle"/>
      </div>
      <div class="qishu">
        <el-input v-model="currPeriod" placeholder="当前第多少期">
          <template slot="prepend">第</template>
          <template slot="append">期</template>
        </el-input>
      </div>
      <div class="btn-upload">
        <el-button type="primary" @click="handleUpload">开始上传</el-button>
      </div>
      <div class="btn-clear">
        <el-button type="warning" @click="handleClear">清空</el-button>
      </div>
    </div>
    <!-- 显示文件列表 -->
    <el-table
      border
      :data="tableData"
    >
      <el-table-column
        type="index"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="imgName"
        label="图片名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="imgSize"
        label="图片大小">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
        <template slot-scope="{row}">
          <el-tag v-if="row.status === -2" type="danger">新增图库失败</el-tag>
          <el-tag v-else-if="row.status === -1" type="danger">图片上传失败</el-tag>
          <el-tag v-else-if="row.status === 0" type="info">未上传</el-tag>
          <el-tag v-else-if="row.status === 1" type="warning">正在上传图片...</el-tag>
          <el-tag v-else-if="row.status === 2" type="warning">正在新增图库...</el-tag>
          <el-tag v-else-if="row.status === 3" type="success">新增图库成功</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <el-button type="primary" @click="handleAnewUpload(row)">重新上传</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { apiLogin, apiUploadImg, apiNewPic } from '@/api/user'

function getYearDay() {
  const currentYear = new Date().getFullYear().toString()
  // 今天减今年的第一天（xxxx年01月01日）
  const hasTimestamp = new Date() - new Date(currentYear)
  // 86400000 = 24 * 60 * 60 * 1000
  const hasDays = Math.ceil(hasTimestamp / 86400000)
  console.log('今天是%s年中的第%s天', currentYear, hasDays)
  return hasDays
}

  export default {
    name: 'multi-upload',
    data() {
      return {
        form: {
          tukuType: ''
        },
        currPeriod: getYearDay(),
        fileList: [],
        tableData: [],
        fileIndex: 0
      }
    },
    computed: {
      ...mapState('app', ['tukuType'])
    },
    mounted() {
      this.form.tukuType = this.tukuType
    },
    methods: {
      ...mapMutations('app', ['SET_TUKUTYPE']),
      handleLogin(){
        let params = {}
        if (this.tukuType === '2') {
          console.log('---状元红')
          // 状元红
          params = {
            userName: '918admin',
            password: 'as2600as',
            safeCode: '3355kjwcombb2600248383'
          }
        } else {
          // 白小姐
          console.log('---白小姐')
          params = {
            userName: '918admin',
            password: 'haha6622',
            safeCode: 'bb2600'
          }
        }
        apiLogin(params).then((res)=>{
          if (res.data === 1) {
            console.log('--登录成功')
          } else {
            console.log('--登录失败')
          }
        })
      },
      handleChange(val) {
        this.SET_TUKUTYPE(val)
      },
      changeFileHandle(event) {
        this.fileList = event.target.files
        for(let i = 0; i < this.fileList.length; i++) {
          let file = this.fileList.item(i)
          this.tableData.push({
            idx: i,
            imgName: file.name,
            imgSize: parseInt(file.size / 1024) + "KB",
            status: 0
          })
        }
      },
      handleUpload() {
        if (this.tableData.length === 0 ) {
          return
        }
        this.fileIndex = 0
        this.loopFileList(this.fileIndex)
      },
      // 重新上传
      handleAnewUpload(raw) {
        this.fileIndex = raw.idx
        this.loopFileList(this.fileIndex)
      },
      loopFileList(imgIndex) {
        if (imgIndex >= this.fileList.length) {
          alert('图片上传完成')
          return
        }
        this.changeState(imgIndex, 1) // 正在上传图片
        this.uploadFile(this.fileList[imgIndex])
      },
      changeState(findIndex, state) {
        const ele = this.tableData.find((item) => {
          return item.idx === findIndex
        })
        ele.status = state
      },
      uploadFile(file) {
        let formData = new FormData()
        formData.append('file', file, file.name)
        apiUploadImg(formData).then((res)=>{
          const { code, data } = res.data
          if(code === 0) {
            this.changeState(this.fileIndex, 2) // 正在新增图库...
            let params = this.getNewPicParams(file.name, data.src)
            apiNewPic(params).then((res) => {
              if (res.data === 1) {
                this.changeState(this.fileIndex, 3) // 新增图库成功
                this.fileIndex++
                this.loopFileList(this.fileIndex)
              } else {
                this.changeState(this.fileIndex, -2) // 新增图库失败
              }
            }).catch((err) => {
              this.changeState(this.fileIndex, -2) // 新增图库失败
            })
          } else {
            this.changeState(this.fileIndex, -1) // 图片上传失败
            this.fileIndex++
            this.loopFileList(this.fileIndex)
          }
        }).catch(()=>{
          this.changeState(this.fileIndex, -1) // 图片上传失败
        })
      },
      getImgName(name) {
        return name.substring(0, name.lastIndexOf("."))
      },
      // 获取新增图库资料
      getNewPicParams(imgName, imgUrl) {
        if (this.tukuType === '2') {
          return {
            FGameNo: '90005',
            FType: '37',
            FSubType: '2024年',
            FName: this.getFName(),
            FSubType1: this.getImgName(imgName),
            FContent: '<p>&nbsp; &nbsp; &nbsp; &nbsp;</p>',
            FImg: imgUrl
          }
        } else {
          return {
            FGameNo: '90006',
            FType: '45',
            FSubType: '2024年',
            FName: this.getFName(),
            FSubType1: this.getImgName(imgName),
            FContent: '<p>&nbsp; &nbsp; &nbsp; &nbsp;</p>',
            FImg: imgUrl
          }
        }
      },
      getFName() {
        return `第${this.currPeriod}期`
      },
      handleClear() {
        this.$refs.fileRef.value = ''
        this.fileList = []
        this.tableData = []
        this.fileIndex = 0
      }
    },
  }
</script>

<style lang="scss" scoped>
.multi-upload {
  width: 600px;
  .upload-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
    .qishu {
      width: 200px;
    }
    .btn-upload {
      margin-left: 20px;
    }
    .btn-clear {
      margin-left: 20px;
    }
  }
}
</style>