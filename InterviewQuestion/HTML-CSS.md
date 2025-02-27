## 一、什么是重绘，什么是回流？如何减少回流？

### 重绘（Repaint）

- 简单来说，就是元素样式在不改变其布局的情况下，浏览器重新绘制元素的过程。

### 回流（Reflow）

- 跟重绘比较，回流就是页面布局发生改变。

### 如何减少

- 使用`css`代替`js`动画。
- 使用`translate3d`开启硬件加速
- 通过`css`类去控制多个属性
- 通过`requestAnimationFrame`
- 使用文档片段（Docunment Fragment）
- 让元素脱离文档流
- 使用`visibility：hidden`代替`visibility：none`

## 二、Margin 塌陷问题如何解决？BFC 是什么？怎么触发？

- 相邻的两个`margin`会叠加，解决办法有使用 flex 布局，grid 布局等方式处理。
- BFC（块级格式化上下文），一个独立的渲染区域。
- 设置成 BFC 的方式
  - `float` （不为 none）
  - `position` 为 absolution 或 fixed
  - `dispaly` 为 inline-block
  - `overflow` （不为 visible）

### 简单来说就是让两个盒子的 margin 不在重叠。

## 三、如何隐藏一个元素

| 元素                                 | 是否占位 | 能否触发点击事件 |
| ------------------------------------ | -------- | ---------------- |
| `dispaly：none`                      | 不占位   | 无法触发点击事件 |
| `opacity：0`                         | 占位     | 可触发点击事件   |
| ` visibility：hidden`                | 占位     | 无法触发点击事件 |
| `clip-path：circle（0）`             | 占位     | 无法触发点击事件 |
| `position：absolute` ；`top：-999px` | 不占位   | 可触发点击事件   |

## 四、overflow

- `inherit`：继承父元素的 `overflow` 的值

## 五、三栏布局的方法

- `flex`布局
  - 父级`flex`，左右各限制宽度，中间的用` flex：1`
- `float`布局
  - 两边用`float:right/left`，中间用`margin`
- `Girg`布局
  - 通过`grid-template-colums`等属性设置列宽等属性
- 使用绝对/相对定位

## 六、calc（）方法

- 响应式布局
- 动态尺寸调整
- 优化代码

## 七、实现一个 div 盒子在屏幕中间水平居中的方式

- Flex 布局法（推荐）
- 绝对定位法
- Grid 布局法
- 传统 Margin 法
- CSS 数学函数法

```
.box {
  position: absolute;
  left: calc(50% - 150px); /* 50%视窗 - 元素半宽 */
  width: 300px;
}
```

## 八、渐进增强(progressive enhancement)和优雅降级(graceful degradation)

- 一种样式的设计逻辑，通过不同的 css class 类，加载兼容性问题的 css

## 九、什么是 iframe，有什么优点和使用场景

- 是一种可在当前页面中创建嵌套的「子窗口」的便签
- 优点
  - 防止第三方脚本污染主站
  - 安全实现父子页面数据传递（如支付回调）
  - 动态更新局部内容（如实时客服窗口）
  - 无缝集成旧系统（如企业内网遗留模块）
- 使用场景
  - 1️⃣ ‌ 第三方服务嵌入
  - 2️⃣ ‌ 广告与数据追踪
  - 3️⃣ ‌ 微前端架构
  - 4️⃣ ‌ 文档/媒体预览

## 十、HTML 的特性

### 语义元素

- `<header>` `<footer>` `<nav>` `<section>` 能够更好的描述页面的结构。

### 多媒体支持

- 内置了`<audio>` `<video>` 元素，无需使用第三方插件

### 引入 Canvas 元素

### 新的表单元素

- type：`date` `email` `range`

### web workers

- 核心：多线程能力、与主线程通信、不能操作 Dom
- 使用场景
  1️⃣ ‌CPU 密集型任务 ✅ 图像滤镜、3D 模型计算、大数据分析

  ```
  // 主线程：启动图像处理Worker
  const worker = new Worker('/image-processor.js');
  worker.postMessage({ imageData: rawData });
  ```

  2️⃣ ‌ 实时数据流处理 ✅ 物联网设备监控、音视频流解码

  ```
  // Worker线程：持续接收传感器数据
  onmessage = ({ data }) => {
  const result = processSensorData(data);
  postMessage(result);
  };
  ```

  3️⃣ ‌ 长任务拆解 ✅ 大型文件解析、分页数据预加载

  ```
  // 主线程：分片处理Excel文件
  worker.postMessage({ task: 'parseExcel', chunk: fileSlice });
  ```

- 如何使用
  - ‌ 创建 Worker 文件 ‌（如 worker.js）
  ```
  // worker.js
  addEventListener('message', ({ data }) => {
  const result = heavyTask(data);  // 执行耗时操作
  postMessage(result);
  });
  ```
- ‌ 主线程初始化 ‌
  ```
  const worker = new Worker('worker.js', {
  type: 'module',  // 2025推荐：支持ES模块
  name: 'calc-worker'
  });
  ```
- ‌ 双向通信 ‌

  ```
  // 主线程发送数据
  worker.postMessage({ action: 'start', params: 1000000 });
  // 主线程接收结果
  worker.onmessage = ({ data }) => {
  console.log('计算结果:', data);
  };
  ```

- ‌ 资源释放 ‌
  ```
  worker.terminate();  // 主动销毁Worker
  ```

### websocket

- 用于实时通信的协议，用于创建实时聊天和多人游戏等

### 地理位置

- 网页访问用户的地理位置信息，以便创建地理位置相关的应用程序，如地图和位置服务

### SVG

### 拖放

- HTML5 引入了拖放 API，允许在网页中实现拖放操作，使用户界面更直观。

### 离线应用程序

- HTML5 引入了应用程序缓存，使 Web 应用程序能够在离线时继续工作。

### 新事件 API

- HTML5 引入了新的事件 API，如`addEventListener`，使事件处理更加灵活和强大。

## 十一、CSS 的特性

### 圆角边框

- 通过 border-radius 属性，可创建圆角边框，包括圆形、椭圆和自定义形状。

### 阴影和发光效果

- 使用 box-shadow 和 text-shadow 属性，可以为元素添加阴影和发光效果。

### 渐变背景

- 通过 linear-gradient 和 radial-gradient 属性，可以创建渐变背景，包括线性和径向渐变。

### 多列布局

- 通过 column-count 和 column-width 等属性，可以创建多列布局，类似于报纸的排版。

### 变换

- 使用 transform 属性，可以对元素进行旋转、缩放、倾斜和平移等变换。

### 过渡

- 通过 transition 属性，可以创建元素状态之间的平滑过渡效果，例如鼠标悬停时的渐变效果。

### 动画

- 使用 @keyframes 规则和 animation 属性，可创建 CSS 动画，使元素可实现复杂的运动和效果

### 2D 和 3D 转换

- CSS3 支持 2D 和 3D 转换，可以实现元素在平面和三维空间的旋转、缩放和倾斜。

### 字体嵌入

- 通过 @font-face 规则，可以在网页上嵌入自定义字体，以提供更多的字体选择。

### 透明度

- 使用 opacity 属性，可以控制元素的透明度，使元素可以半透明或完全不透明。

### 栅格布局

- 通过 display:grid 属性，可以创建更复杂的网格布局，用于定 5 位和对齐元素。

### 自定义属性

- 使用 CSS 变量(var())来定义和重用自定义属性，以简化样式表的管理。

### 用户界面控件

- CSS3 引入了样式化的用户界面控件，如滚动条、复选框和单选框的自定义样式。

### 响应式设计

- 通过媒体查询和弹性布局，CSS3 支持响应式设计，以适应不同的屏幕尺寸和设备

## 十二、CSS 的选择器优先级

!important > 内联样式（style="..."）> ID 选择器 (#header) > 类/属性/伪类 → .btn、[type="text"] > 元素/伪元素 → div、::before > 通配符/关系选择器 → \*、>、+

## 十三、问题:HTML5 input 元素 type 属性

- text:用于接受单行文本输入。
- password:用于密码输入，输入的字符会被掩盖。
- radio:用于单选按钮，用户可以在一组选项中选择一个。
- checkbox:用于复选框，用户可以选择多个选项。
- number:用于输入数字，可以包括上下箭头来增减数值。
- range:用于输入范围，例如滑动条。
- date:用于日期输入。
- time:用于时间输入。
- file:用于文件上传。
- color:用于颜色选择器。
- hidden:用于存储数据，但不会在页面中显示。
- submit:用于提交表单。
- reset:用于重置表单。
- button:用于创建自定义按钮。

## 十四、CSS 中的属性的继承性

- 可继承的属性(Inherited Properties)

  - color :控制文本颜色。
  - font :包括 `font-family`、`font-size`、`font-style`、`font-weight` 等属性。
  - line-height :控制行高。
  - text-align:控制文本对齐方式。
  - text-indent:控制首行缩进。
  - text-transform :控制文本转换为大写、小写或首字母大写。
  - visibility :控制元素的可见性。

- 不可继承的属性(Non-inherited Properties)
  - border:包括 `border-width`、`border-style`、`border-color`等属性。
  - margin:包括 `margin-top`、`margin-right`、`margin-bottom`、`margin-left` 等属性。
  - padding:包括 `padding-top`、`padding-right` 、`padding-bottom`、`padding-left` 。
  - background:包括 `background-color`、`background-image`、`background-repeat` 等属性。
  - width :控制元素的宽度。
  - height :控制元素的高度.
  - position:控制元素的定位方式(例如，`relative` 、`absolute`、`fixed` )。
  - top、right、bottom、left :控制元素的位置,
  - display :控制元素的显示方式(例如，`block`、`inline`、`none` )
  - float :控制元素的浮动方式。

## 十五、画一条 0.5px 的线

```
.thin-line{
  <!-- 设置线的高度为1像素 -->
  height：1px;
  <!-- 设置线的颜色 -->
  background：#000；
  <!-- 使用scale缩放高度为0.5，模拟较细的线 -->
  transform:scaleY(0.5)；
  <!-- 设置变换的原点 -->
  transform-origin： 0 0 ；
}
```

## 十六、position 的值

- static(静态定位):
  - 默认值。
  - 元素按照文档流正常排列，不受其他定位属性影响。
  - `top`、`right`、`left`、`bottom` 属性不起作用。
- relative(相对定位)
  - 元素相对于其正常位置定位。
  - 可以使用`top`、`right`、`bottom`、`left`属性来调整元素的位置。
  - 相对定位不会脱离文档流，其他元素仍然占据原来的位置。。
- absolute(绝对定位):
  - 元素相对于最近的已定位祖先元素定位，如果没有已定位的祖先元素，则相对于初始包含块(通常是浏览器窗口)定位。
  - `top`、`right`、`bottom`、`left`属性来精确控制位置,使用
  - 绝对定位会脱离文档流，不再占据原来的位置。。
- fixed(固定定位):
  - 元素相对于视口定位，不随页面滚动而移动。
  - `bottom`、`left`、`top`、`right`属性来控制位置使用。
  - 固定定位脱离文档流，不占据原来的位置。
- sticky(粘性定位):
  - 元素在跨越特定阈值前表现为相对定位，之后表现为固定定位。
  - 通常用于创建”粘性”导航栏或侧边栏。
  - 使用`top`、`right`、`bottom`、`left`属性来控制位置

## 十七、什么是浮动，浮动会引起什么问题，有什么解决方案。

### 导致的问题

- 高度塌陷：会使父元素的告诉塌陷。
- 元素重叠：元素可能会重叠。

### 解决的方案

- 清除浮动

```
.box{
  clear:both;
}
```

- 使用`Flex`或`Gird`

- 使用`display:inline-block`,模拟浮动效果。

- 使用 `overflow-hidden`

## 十八、line-height 和 height 的区别

- height 的控制元素的整体的高度。
- line-height 控制文本元素。

## 十九、inline-block、inline 和 block 的区别

- block:块级元素
  - 块级元素会独占一行，它们在页面上按从上到下的顺序垂直排列。
  - 块级元素可以设置宽度、高度、内边距和外边距，并会自动换行。
- inline:内联元素
  - 内联元素不会独占一行，它们在同一行内水平排列，直到一行不足以容纳它们，然后换行。
  - 内联元素通常不可以设置宽度和高度，它们的尺寸由其内容决定。
- inline-block:内联块级元素
  - 内联块级元素结合了块级元素和内联元素的特点。它们在同一行内水平排列，但可以设置宽度、高度、内边距和外边距，同时也会换行。
  - 内联块级元素通常用于创建水平排列的块状元素，如按钮或导航链接。

## 二十、box-sizing 的作用，如何使用?

- css 属性，改变盒子计算方式。
  - content-box(默认值):元素的宽度和高度只包括内容区域，不包括内边距和边框这是传统的盒模型。
  - border-box:元素的宽度和高度包括内容区域、内边距和边框。这意味着设置元素的宽度和高度时，内边距和边框不会增加元素的总宽度和高度，而会占用内容区域内的空间。

## 二十一、css 实现动画

- 定义关键帧（KeyFrames）

- 应用动画（使用 animation 属性）

  - animation-name:myAnimation;/_关键帧名称_/
  - animation-duration:2s;/_持续时间_/
  - animation-timing-function:ease-in-out;/_缓动函数_/
  - animation-delay:0.5s;/_延迟时间_/
  - animation-iteration-count:infinite;/_重复次数_/
  - animation-fill-mode (指定动结束后元素的状态)
  - animation-direction (指定动画播放的方向)
  - animation-play-state (控制动画的播放状态)

- 触发动画
  - 使用类名
  - 使用 js

## 二十二、transition 和 animation 的区别?

- 使用 transition 可以创建简单的状态过渡效果，适用于鼠标悬停、焦点等触发的状态变化。
- 使用 animation 可以创建更复杂的动画，包括关键帧、持续时间、循环和更精细的控制。它适用于需要更多控制和复杂度的动画场景。

## 二十三、css 如何实现在某个容器中居中

- 添加`justify-content: center`;`align-items: center`;两个属性。

## 二十三、CSS3 伪类和伪元素

### CSS3 伪类(Pseudo-classes)

#### 伪类用于选择文档中的特定元素，通常基于它们的状态、位置或属性。

- :hover:选择鼠标悬停的元素
- :active:选择被点击的元素
- :focus :选择获得焦点的元素，如表单元素,
- :nth-child(n):选择某元素在其父元素的第 n 个位置。
- :not(selector):选择不匹配指定选择器的元素
- :first-child:选择某元素的父元素中的第一个子元素。
- :last-child:选择某元素的父元素中的最后一个子元素

### CSS3 伪元素(Pseudo-elements)

#### 伪元素用于在文档中生成虚拟元素，通常用于添加样式或内容。

- ::before :在元素内容之前生成内容，通常用于添加装饰或图标
- ::after:在元素内容之后生成内容，也常用于添加装饰或图标。
- ::first-line:选择元素的首行文本，用于样式化段落中的首行文字
- ::first-letter：选择元素的首字母，用于样式化段落或标题的首字母
- ::selection:选择用户选择的文本部分，允许自定义选中文本的样式。

## 二十四、响应式布局的实现方案

- 使用媒体查询 `CSS3属性`
- 流式布局 `尺寸使用百分比`
- 弹性布局
- 控制最大`max-width`布局

## 二十五、link 和 import 的区别

- `<link>` 标签会在页面加载过程中同时加载 CSS 文件，这可以并行进行，不会阻止页面的渲染。
- `@import` 规则只能在当前 CSS 文件加载完成后才会加载引入的外部 CSS 文件，这会导致页面渲染的延迟，因为它会阻止页面的染。

## 二十六、单行元素的文本省略号实现方式

```
.ellipsis-text {
    /* 防止文本换行 */
  white-space: nowrap;
  /* 隐藏溢出 */
  overflow: hidden;
  /* 显示省略号 */
  text-overflow: ellipsis;
  /* 设置盒子宽度 */
  width: 200px;
}
```
