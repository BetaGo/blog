---
layout: post
title: "用React构建一个小商城（三）"
date: 2017-08-14
excerpt: "解决组件间通讯的问题"
tags: [web, 学习, 前端, React]
comments: true
---

用 React 组件，可以轻松地构建出我们想要的页面；但是由于各组件都是可以独立存在的，当不同的组件之间需要通信时，就会使我们面临诸多的问题。

`props`和`state`是我们最常用的两个可以操控组件状态的东西。`state`是组件自身的状态，在组件内部定义；`props`是组件的属性，可以由父组件传来；我们借助`props`和`state`这两样东西来实现组件间通讯（`context`也可以，这个要另说）。

**组件间通讯的几种形式：**

1. 父组件 ==> 子组件： 最简单的一种形式，直接通过`props`传递就好。
2. 子组件 ==> 父组件： 一种简单的方式是可以通过`props`传一个`callback`给子组件，当子组件`state`发生变化时，调用该`callback`来传递信息到父组件。
3. 跨级组件通信： 我们可以通过在这些组件之上再添加一个共同的父组件，然后再利用上述的两种方法来一层层地传递。但是，这样的做法不仅写起来很麻烦，而且很难维护。这个时候我们可以利用`context`来实现组件间的通讯。


**关于`context`:**

`context`是一个很强大的API，利用`context`我们可以很轻松地构建一个父子组件通讯的API。例如 [React Router V4](https://reacttraining.com/react-router/)库。

当我们的组件解构复杂，而我们又使用了大量的`context`时，我们就很难弄清`context`到底是从什么地方传过来的，使用应的数据流动变得很混乱。此时我们可以利用一些状态管理库来帮助我们。例如[redux](https://github.com/reactjs/redux)。

这里，我们从[React Redux](https://github.com/reactjs/react-redux)库中的`Provider`组件来看一下`context`API的使用。


以下是`Provider`组件的源码：

```js
function createProvider(storeKey = 'store', subKey) {
    const subscriptionKey = subKey || `${storeKey}Subscription`

    class Provider extends Component {
        /*
        * 通过在Provider（context提供者）中添加 childContextTypes 和 getChildContext，
        * React 会向下自动传递参数，任何组件只要在它的子组件中，就能通过定义 contextTypes 来获取参数。
        * 这也就解释了为什么 `Provider` 组件要放在顶层，以及为什么我们可以在任一组件中获取 `store`。
        */
        getChildContext() {
          return { [storeKey]: this[storeKey], [subscriptionKey]: null }
        }

        constructor(props, context) {
          super(props, context)
          this[storeKey] = props.store;
        }

        render() {
          return Children.only(this.props.children)
        }
    }

    Provider.propTypes = {
        store: storeShape.isRequired,
        children: PropTypes.element.isRequired,
    }
    Provider.childContextTypes = {
        [storeKey]: storeShape.isRequired,
        [subscriptionKey]: subscriptionShape,
    }

    return Provider
}

export default createProvider()
```

总而言之，我们可以通过 父组件传递 `props`给子组件，子组件调用父组件传来的`callback`来实现组件间通讯；也可以利用`context`API来进行父子组件间的通讯。使用`props`虽然繁琐，但是数据的流动方向很清晰，容易理解；`context`功能强大，方便快捷，但是使用时需要合理规划，否则容易导致应用走向混乱。

