---
layout: post
title: "用React构建一个小商城（二）"
date: 2017-08-10
excerpt: "用 React 组件构建小商城的UI。"
tags: [web, 学习, 前端, React]
cover: "https://github.com/GoWantong/GoWantong.github.io/raw/master/assets/img/google-play-carousel.png"
comments: true
---

确定功能、交互后，可以借助一些组价库，来快速搭建UI。
本次项目中采用的是 Material UI 这个 React 组件库。[MaterialUI](http://www.material-ui.com/ "MaterialUI")
(马上1.0的版本就出来了，现在是1.0-beta4，也就是本次项目采用的版本)

对于那些可以直接用组件库提供的组件来组合构建的组件，这里就不再多说，直接拿着用就好了。布局以及样式，有问题的多尝试，多调试就好了，关键是要细心和有耐心。

由于在商品详情页需要一个轮播图，组件库并没有提供。所以只好自己来实现一个了。

###设计的步骤如下：

**1、确定轮播图组件样式**

为了符合MaterialUi的风格，所以这个轮播图参考了google play主页的轮播图的外观。如下图所示：
![google play carousel pic](https://github.com/GoWantong/GoWantong.github.io/raw/master/assets/img/google-play-carousel.png)

**2、确定轮播图组件的调用方式**

由于本次项目中的轮播图组件仅用来展示图片，所以希望的调用方式是直接传入一个数组，数组中包含图片的URL。

例如我们希望只用如下代码就可以显示出一个有四张图片的轮播图：
```js
const images=['http://xxx1.jpg','http://xxx2.jpg','http://xxx3.jpg','http://xxx4.jpg'];
<Carousel images={images} />
```
但是这样调用会带来一个问题，就是轮播图组件的大小如何确定？

一个简单的思路就是再传递`width`和`heigh`的数值去控制轮播图的大小。但是这样就使组件变得不够灵活，当我们希望轮播图能自适应宽和高的时候，这个组件就不能使用了。

理想的情况因该是：当我们传入`width`和`height`时，组件的宽和高以传入的数值为准；当不传入`width`和`height`时，轮播图充满整个父容器。

确定这些后，我们就可以着手写这个组件了。

**3、创建轮播图组件**

轮播图实现思路：

1. 将图片绝对定位；
2. 用 CSS的 `translate` 将图片水平铺开；
3. 通过 React 组件的 `state` 来控制图片的位置；


**具体实现：**

由于我们需要用`touch`事件修改组件的`state`来对轮播的图片进行控制，不能采用无状态组件，所以用ES6 `class`来声明组件。

```js
  class Carousel extends React.Component{
    // 首先检测一下会从 props 中接收到的数据的类型是否正确。
    static propTypes = {
      images: PropTypes.array.isRequired,
      width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      height: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    }

    // 由于 width 和 height 是可选的，所以声明一个默认值，默认都是100%来填充满父容器。
    static defaultProps = {
      height: '100%',
      width: '100%',
    }

    constructor(props) {
      super(props);

      this.state = {
        height: this.props.height,
        width: this.props.width,
        left: 0, // 通过 left 的值来控制图片的平移
        activeIndex: 0, // 通过 activeIndex 来确定当前显示的是哪张图
      };

      this.onNodeTouchStart = this.onNodeTouchStart.bind(this);
      this.onNodeTouchMove = this.onNodeTouchMove.bind(this);
      this.onNodeTouchEnd = this.onNodeTouchEnd.bind(this);
    }

    componentWillMount() {
      this.touchStartX = null;
      this.touchStartY = null;
      this.touchStartTime = null;
      this.carouselElement = null;
    }

    componentDidMount() {
      const width = this.state.width;
      const height = this.state.height;
      const re = /^\d+%$/;

      // 如果输入的 width 和 width 为百分比的形式，我们就需要通过 DOM 来获取当前组件的大小。
      // React 到 componentDidMount 生命周期时，已经将组件渲染到了真实 DOM 中，所以我们可以在该生命周期获取 DOM 元素的大小。
      // 注意： 此次操作会在组件 mount 后重新渲染，有一定的性能损失； 如果调用组件时制定了 width 和 height 的值，则可以避免此次操作。
      if (re.test(width) && re.test(height)) {
        if (this.carouselElement !== null) {
          this.setState({
            width: this.carouselElement.offsetWidth,
            height: this.carouselElement.offsetHeight,
          });
        }
      }
    }


    onNodeTouchStart(e) {
      this.touchStartX = e.touches[0].pageX;
      this.touchStartY = e.touches[0].pageY;
      this.touchStartTime = Date.now();
    }

    onNodeTouchMove(e) {
      const currentX = e.touches[0].pageX;
      const currentY = e.touches[0].pageY;
      const dX = currentX - this.touchStartX;
      const dY = currentY - this.touchStartY;

      // 设定一个最小滑动距离，防止误触。
      if (Math.abs(dX) < 10 ||
        (Math.abs(dX) < Math.abs(dY))
      ) {
        return;
      }

      // 让第一张图无法再向右滑，最后一张图无法再向左滑。
      if (dX < 0 && this.state.activeIndex === this.props.images.length - 1) {
        return;
      }
      if (dX > 0 && this.state.activeIndex === 0) {
        return;
      }

      this.setState({
        left: dX,
      });
    }

    onNodeTouchEnd(e) {
      const currentX = e.changedTouches[0].pageX;
      const currentTime = Date.now();
      const dX = currentX - this.touchStartX;
      const dT = currentTime - this.touchStartTime;

      const width = this.state.width;

      // 如果滑动的距离超过组件宽的一半，或是快速的滑动，则在停止滑动后切换到另一张图片。
      if (Math.abs(dX) > width / 2 || dT < 800) {
        if (dX > 0 &&
          this.state.activeIndex > 0
          ) {
          this.setState({
            activeIndex: this.state.activeIndex - 1,
            left: 0,
          });
          return;
        }

        if (dX < 0 &&
          this.state.activeIndex < this.props.images.length - 1
          ) {
          this.setState({
            activeIndex: this.state.activeIndex + 1,
            left: 0,
          });
          return;
        }
      }

      this.setState({
        left: 0,
      });
    }

    // 获取组件底部的 指示小圆点 （pointer）
    getPointer() {
      const pointers = [];
      const activeIndex = this.state.activeIndex;
      const number = this.props.images.length;
      for (let i = 0; i < number; i += 1) {
        pointers.push(
          <span
            className={
              i === activeIndex ? 'carousel-pointer carousel-pointer-active' : 'carousel-pointer'
            }
            key={`pointer-${i}`}
          />,
        );
      }

      return (
        <div className="carousel-pointer-container">
          <div className="carousel-pointers">
            { pointers }
          </div>
        </div>
      );
    }

    render() {
      const { images } = this.props;
      const { height, width, activeIndex, left } = this.state;

      return (
        <div
          className="carousel-root"
          style={{ height, width }}
          onTouchStart={this.onNodeTouchStart}
          onTouchMove={this.onNodeTouchMove}
          onTouchEnd={this.onNodeTouchEnd}
          ref={(el) => { this.carouselElement = el; }} // 通过 ref 来获取真实 DOM 元素
        >
          {
            images.map((image, index) => {
              const positionX = ((index - activeIndex) * width) + left; // 计算图片的位置
              return (
                <img
                  className="carousel-image"
                  style={{transform: "translateX(" + positionX + "px)"}}
                  src={image && image.src ? image.src : image}
                  alt={image && image.alt ? image.alt : ''}
                  key={`image-${index}`}
                />
              )
            })
          }
          {this.getPointer()}
        </div>
      );
    }
  }
```

对应的css文件：

```css
  .carousel-root {
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }

  .carousel-image {
    max-width: 100%;
    position: absolute;
    top:0;
    left:0;
    transition: 0.2s ease-out;
  }

  .carousel-pointer-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0));
  }

  .carousel-pointers {
    position: absolute;
    bottom: 9px;
    left: 50%;
    transform: translateX(-50%);
  }

  .carousel-pointer {
    display: inline-block;
    box-sizing: border-box;
    margin: auto 3px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #fff;
    transition: 0.5s ease;
  }

  .carousel-pointer-active {
    transform: scale(1.6);
    background: #fff;
  }
```

一个简单的轮播图组件就写完了。