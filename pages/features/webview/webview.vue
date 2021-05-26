<template>
	<view>
		
	</view>
</template>

<template>
	<view class="pages">
		<web-view :src="webviewUrl" class="cover" ></web-view>
	</view>
</template>
<script>
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				url:'http://www.baidu.com'
			};
		},
		computed: mapState(['webviewUrl']),
		onLoad(){
				
		}
	}
</script>

<style lang="scss" scoped>
	.pages{
		.cover{
			width: 100vw;
			height: 100vh;
		}
	}
</style>
