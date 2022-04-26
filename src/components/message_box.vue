<template>
	<view class="message-content">
		<view class="header-box">
			<view class="left">
				<view class="head-img">
					<u-image  width="70rpx" height="70rpx" border-radius="35rpx"  src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3011893491,4249262958&fm=26&gp=0.jpg"></u-image>
				</view>
				<view class="info">
					<view class="name">
						张琳
					</view>
					<view class="time">
						01月02日21:27
					</view>
				</view>
			</view>
			<view class="right">
				回复
			</view>
		</view>
		<view class="first-message">
			好的，等我!
		</view>
		<view class="content-box">
			<view class="left">
				<u-image width="100%" mode="widthFix" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3011893491,4249262958&fm=26&gp=0.jpg"></u-image>
			</view>
			<view class="right">
				<view class="text-content">
					<span class="man">橘右京:</span> 今天你的事情办妥了没有，办妥了我们就去吃饭吧! 明天再去进行下一个进度的进程。
				</view>
			</view>
		</view>
		<view class="message-list">
			<view class="single-mess">
				<span class="man">张琳: </span>
				还没有呢，今天我准备再去见他一次，看能不能搞定这件事情，然后会给你一份报告。
			</view>
			<view class="single-mess">
				<span class="man">橘右京: </span>
				好的，注意安全，开车注意点，今晚我在星巴克等你，带上你的苹果笔记本，我们一起去装逼。
			</view>
			<view class="single-mess">
				<span class="man">张琳: </span>
				好的，等我!
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" >
	.message-content{
		padding: 20rpx;
		background-color: #FFFFFF;
		.header-box{
			display: flex;
			margin-bottom: 20rpx;
			.left{
				flex: 1;
				display: flex;
				.head-img{
					margin-right: 20rpx;
				}
				.info{
					.name{
						margin-bottom: 8rpx;
						font-size: 32rpx;
						color: #222222;
						font-weight: 600;
					}
					.time{
						font-size: 23rpx;
						color: #bfbfbf;
					}
				}
					
			}
				
			.right{
				font-size: 32rpx;
				font-weight: 600;
				color: #13227a;
			}
		}
		
		.first-message{
			font-size: 35rpx;
			font-weight: 550;
			line-height: 1.5;
			margin-bottom: 20rpx;
		}
		.content-box{
			background-color: #e6e6e6;
			display: flex;
			margin-bottom: 20rpx;
			.left{
				width: 200rpx;
				height: 200rpx;
				overflow: hidden;
				border-radius: 20rpx;
			}
			.right{
				flex: 1;
				font-size: 28rpx;
				font-weight: 550;
				line-height: 1.5;
				display: flex;
				align-items: center;
				justify-content: center;
				padding-left: 20rpx;
				padding-right: 20rpx;
				.text-content{
					.man{
						color: #1296db;
						margin-right: 15rpx;
					}
				}
				
			}
		}
		.message-list{
			.single-mess{
				font-size: 28rpx;
				font-weight: 550;
				line-height: 1.5;
				margin-bottom: 8rpx;
				.man{
					color: #13227a;
					margin-right: 10rpx;
				}
			}
		}	
	}
		
</style>
