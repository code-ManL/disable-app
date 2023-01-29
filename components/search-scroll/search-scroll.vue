<template>
	<view>
		<mescroll-uni ref="mescrollRef" @init="init" @down="downCallback" :down="downOption" :up="upOption"
			@up="upCallback" :fixed="true">
			<view class="" v-for="(item) in 10">
				123123
			</view>
		</mescroll-uni>

	</view>
</template>

<script>
	export default {
		name: "search-scroll",
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">

</style>
