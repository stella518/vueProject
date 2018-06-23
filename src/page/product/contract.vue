<template>
	<layout>
		<Upload
	        multiple
	        type="drag"
			:format="['pdf']"
			:on-success="handleSuccess"
			:on-format-error="handleFormatError"
        	:on-exceeded-size="handleMaxSize"
			v-bind="{action:'/api/contract/uploadContract/'+token}">
	        <div style="padding: 20px 0">
	            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
	            <p>请点击或拖拽上传文件</p>
	        </div>
	    </Upload>
		<Table height="600" :columns="contractList" :data="contractData"></Table>
	</layout>
</template>
<script type="text/babel">
export default {
  data () {
    return {
      fullHeight: document.documentElement.clientHeight-73,
      contractList:[
        {
            title: '合同编号',
            key: 'annexCode'
        },
        {
            title: '合同类型',
            key: 'annexTypeEnum'
        },
        {
            title: '文件',
            key: 'url',
            width: 150,
            align: 'center',
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small',
                            row:params.row,
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                              this.seeContract(params.row);
                            }
                        }
                    }, '查看'),
                ]);
            }
        }
      ],
      contractData:[],
      token:this.$store.state.token,
      choose_index:-1,
    }
  },
  created(){
    this.getContractList();
  },
  methods: {
    getContractList(){
      this.$api.post('/contract/getAllContract/'+this.token, {}, r => {
        console.log(r)
        if(r.status == 'SUCCESS'){
          this.contractData = r.data;
        }
      })
    },
    handleSuccess (res, file) {
		this.getContractList();
	},
	handleFormatError (file) {
		this.$Notice.warning({
			title: '文件格式有误',
			desc: '您的文件 ' + file.name + ' 格式有误， 请上传PDF文件'
		});
	},
	handleMaxSize (file) {
		this.$Notice.warning({
			title: '上传文件过大',
			desc: '文件  ' + file.name + '过大, 不能超过2M.'
		});
	},
	seeContract(param){
		window.open(param.url);
	},
  }
}
</script>