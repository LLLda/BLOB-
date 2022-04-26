<template>
	<view class="content-list">
		<view class="goods-item" v-for="(item, key) in goods" :key="key" @click="detail(item, $event)">
			<image :src="item.commodity_img"></image>
			<view class="goods-item-content">
				<view class="goods-title text-line-hide">{{item.commodity_name}}</view>
				<view class="goods-little-title gary-font text-line-hide">{{item.commodity_des}}</view>
				<view class="goods-amount">
					积分：
					<text space="emsp">{{item.commodity_integral}}</text>
					<view class="gary-font text-line-hide">库存:{{item.commodity_stock}}</view>
				</view>
				<view class="goods-label"><rich-text :nodes="item.commodity_stock"></rich-text></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "MkGoodsList",
		props: {
			goods: {
				type: Array,
				default: []
			},
		},
		methods: {
			detail(item, e) {
				this.$emit("clickItem", item, e);
			}
		},
	}
</script>

<style lang="scss">
	.content-list {
		width: 100%;
		margin: 0 19rpx;
		display: flex;
		flex-wrap: wrap;
	}
	.goods-item {
		background-color: #ffffff;
		width: 347.5rpx;
		border-radius: 19rpx;
		margin: 0 19rpx 19rpx 0;
	}
	.goods-item image {
		width: 100%;
		height: 308rpx;
		border-radius: 19rpx 19rpx 0 0;
	}
	.goods-item-content {
		padding: 19rpx;
	}
	.goods-little-title {
		padding: 10rpx 0;
	}
	.goods-title {
		font-weight: bold;
	}
	.goods-amount {
		display: flex;
		align-items: baseline;
	}
	.goods-amount text {
		color: #ff0000;
	}
	.goods-amount view {
		margin-left: 22rpx;
	}
	.goods-label {
		padding: 10rpx 0 0;
	}
	.gary-font {
		color: #999;
		font-size: 22rpx;
	}
	.text-line-hide {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
