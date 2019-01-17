fill()	填充路径
stroke()	描边
arc()	创建圆弧
rect()	创建矩形
fillRect()	绘制矩形路径区域
strokeRect()	绘制矩形路径描边
clearRect()	在给定的矩形内清除指定的像素
arcTo()	创建两切线之间的弧/曲线
beginPath()	起始一条路径，或重置当前路径
moveTo()	把路径移动到画布中的指定点，不创建线条
lineTo()	添加一个新点，然后在画布中创建从该点到最后指定点的线条
closePath()	创建从当前点回到起始点的路径
clip()	从原始画布剪切任意形状和尺寸的区域
quadraticCurveTo()	创建二次方贝塞尔曲线
bezierCurveTo()	创建三次方贝塞尔曲线
isPointInPath()	如果指定的点位于当前路径中，则返回 true，否则返回 false

改变路径样式
fillStyle	设置或返回用于填充绘画的颜色、渐变或模式
strokeStyle	设置或返回用于笔触的颜色、渐变或模式
shadowColor	设置或返回用于阴影的颜色
shadowBlur	设置或返回用于阴影的模糊级别
shadowOffsetX	设置或返回阴影距形状的水平距离
shadowOffsetY	设置或返回阴影距形状的垂直距离


设置渐变
createLinearGradient()	创建线性渐变（用在画布内容上）
createPattern()	在指定的方向上重复指定的元素
createRadialGradient()	创建放射状/环形的渐变（用在画布内容上）
addColorStop()	规定渐变对象中的颜色和停止位置

图片变换
scale()	缩放当前绘图至更大或更小
rotate()	旋转当前绘图
translate()	重新映射画布上的 (0,0) 位置
transform()	替换绘图的当前转换矩阵
setTransform()	将当前转换重置为单位矩阵，然后运行 transform()