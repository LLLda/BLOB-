<template>
	<view class="contain-box">
		<view class="header-box">
			<view class="left">
				<view class="head-img">
					<u-image width="70rpx" height="70rpx" border-radius="35rpx" :src="article_info.head_portrait">
					</u-image>
				</view>
				<view class="info">
					<view class="name">
						{{article_info.nickname}}
					</view>
					<view class="tip">
						{{article_info.time}} 来自{{article_info.machine}}
					</view>
				</view>
			</view>
			<view class="right">
				<view class="btn">
					<u-icon name="plus" color="#FFFFFF"></u-icon>
					<span class="text">
						关注
					</span>

				</view>
			</view>
		</view>
		<view class="img-list-box">
			<u-image border-radius="20rpx" :src="article_info.imgSrc" mode="widthFix"></u-image>
		</view>
		<view style="clear: both;"></view>
		<view class="content-text">
			年少读书，如隙中窥月
		</view>
		<view style="clear: both;"></view>
		<view class="tag-list-box">
			<view v-for="n in 6">
				#秋日序章
			</view>
		</view>
		<view style="clear: both;"></view>
		<view class="handle-box">
			<view>
				<span class="label">
					<u-icon name="heart" size="40"></u-icon>
				</span>
				<span>
					{{article_info.thumbs_up_count}}
				</span>
			</view>
			<view>
				<span class="label">
					<u-icon name="chat" size="40"></u-icon>
				</span>
				<span>
					{{article_info.comment_count}}
					<!-- 评论 ({{article_info.comment_count}} -->
				</span>
			</view>
			<view>
				<span class="label">
					<u-icon name="star" size="40"></u-icon>
				</span>
				<span>
					20
					<!-- 评论 ({{article_info.comment_count}} -->
				</span>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "article_box",
		props: {
			article_info: {
				type: Object,
				default: () => {
					return {
						id: 0,
						head_portrait: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3011893491,4249262958&fm=26&gp=0.jpg',
						nickname: '坏人今夜不归来',
						time: '01-15 20:37',
						machine: 'iPhone 12 Pro Max',
						content: '这里说的图片图标，指的是小图标，起作用定位为"icon"图标作用，而非大尺寸的图片展示场景，理论上，这个小图标应该为png格式的正方形图标。',
						imgSrc: 'https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00405-743.jpg',
						previewImgList: [
							'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3011893491,4249262958&fm=26&gp=0.jpg',
							'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3011893491,4249262958&fm=26&gp=0.jpg',
							'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3011893491,4249262958&fm=26&gp=0.jpg',
							'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3011893491,4249262958&fm=26&gp=0.jpg',
							'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3011893491,4249262958&fm=26&gp=0.jpg',
							'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3011893491,4249262958&fm=26&gp=0.jpg',
							'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3011893491,4249262958&fm=26&gp=0.jpg',
							'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3011893491,4249262958&fm=26&gp=0.jpg',
							'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3011893491,4249262958&fm=26&gp=0.jpg'
						],
						comment_count: 321,
						thumbs_up_count: 1000
					}
				}

			}
		},
		methods: {
			getImgList(list) {
				let newList = [
					[]
				]
				for (let i = 0; i < list.length; i++) {
					newList[newList.length - 1].push(list[i])
					if ((i + 1) % 3 == 0) {
						newList.push([])
					}
				}
				console.log('数组', newList)
				return newList
			},
			previewImg(idx) {
				let arr = []
				console.log('ninin>>>>', idx)
				// this.article_info.imgList.forEach(res=>{  //id
				// 	arr.push(res.url)
				// })
				console.log('arr>', arr)
				uni.previewImage({
					current: idx,
					urls: [
						'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3011893491,4249262958&fm=26&gp=0.jpg',
						'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3011893491,4249262958&fm=26&gp=0.jpg',
						'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3011893491,4249262958&fm=26&gp=0.jpg',
						'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3011893491,4249262958&fm=26&gp=0.jpg',
						'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3011893491,4249262958&fm=26&gp=0.jpg',
						'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3011893491,4249262958&fm=26&gp=0.jpg',
						'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3011893491,4249262958&fm=26&gp=0.jpg',
						'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3011893491,4249262958&fm=26&gp=0.jpg',
						'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3011893491,4249262958&fm=26&gp=0.jpg'
					]
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contain-box {
		color: #222222;
		padding: 20rpx;
		background-color: #FFFFFF;

		.header-box {
			display: flex;

			.left {
				flex: 1;
				display: flex;
				align-items: center;

				.head-img {
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;

					image {
						width: 70rpx;
						height: 70rpx;
						border-radius: 50%;
					}
				}

				.info {
					margin-left: 15rpx;

					.name {
						font-size: 32rpx;
						font-weight: 550;
						margin-bottom: 10rpx;
					}

					.tip {
						font-size: 23rpx;
						color: #bfbfbf;
					}
				}

			}

			.right {
				display: flex;
				align-items: center;

				.btn {
					color: #FFFFFF;
					background: linear-gradient(to right, #FF623E, #FCBC27);
					height: 50rpx;
					border-radius: 25rpx;
					font-size: 25rpx;
					display: flex;
					align-items: center;
					padding: 0 20rpx;

					.text {
						margin-left: 8rpx;
					}
				}
			}
		}

		.main-text {
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			font-size: 26rpx;
			font-weight: 500;
			color: #222222;
		}

		.img-list-box {
			margin-top: 20rpx;
			margin-bottom: 20rpx;
		}

		.content-text {
			margin-bottom: 20rpx;
			color: #515151;
			font-size: 25rpx;
		}

		.tag-list-box {
			margin-bottom: 20rpx;
			display: flex;
			flex-wrap: wrap;

			view {
				margin-right: 15rpx;
				margin-bottom: 15rpx;
				background-color: #e6e6e6;
				color: #707070;
				height: 40rpx;
				border-radius: 20rpx;
				font-size: 23rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 20rpx;
			}
		}

		.handle-box {
			display: flex;
			// border-top: 1px solid #f2f2f2;
			// padding-top: 20rpx;

			view {
				// flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 20rpx;

				.label {
					margin-right: 10rpx;
				}
			}
		}
	}
</style>
