(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  // 拿到数组原型上的方法 （原有方法）
  var oldArrayProtoMethds = Array.prototype; //继承一下

  var arrayMethods = Object.create(oldArrayProtoMethds);
  var methods = ['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice'];
  methods.forEach(function (method) {
    arrayMethods[method] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var result = oldArrayProtoMethds[method].apply(this, args); // this就是Observer里的value

      var inserted;

      switch (method) {
        case 'push': // arr.push({a:1},{b:2})

        case 'unshift':
          //这两个方法都是追加 追加的内容可能是对象类型，应该被再次进行劫持
          inserted = args;
          break;

        case 'splice':
          // vue.$set原理
          inserted = args.slice(2);
      }

      if (inserted) this.__ob__.observeArray(inserted); //给数组新增值也添加观测

      return result;
    };
  });

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      //判断是否被观测过
      Object.defineProperty(value, '__ob__', {
        enumerable: false,
        // 不能被枚举 ，不能被循环
        configurable: false,
        value: this
      }); // 使用defineProperty 重新定义属性

      if (Array.isArray(value)) {
        //调用push shift unshift splice sort reverse pop 
        //函数劫持，切片编程
        value.__proto__ = arrayMethods;
        this.observeArray(value);
      } else {
        this.walk(value);
      }
    }

    _createClass(Observer, [{
      key: "observeArray",
      value: function observeArray(value) {
        //观测数组
        value.forEach(function (item) {
          observer(item); //观测数组中的对象
        });
      }
    }, {
      key: "walk",
      value: function walk(data) {
        var keys = Object.keys(data); // 获取对象的key

        keys.forEach(function (key) {
          defineReactive(data, key, data[key]);
        });
      }
    }]);

    return Observer;
  }();

  function defineReactive(data, key, value) {
    observer(value);
    Object.defineProperty(data, key, {
      get: function get() {
        return value;
      },
      set: function set(newValue) {
        if (newValue == value) return;
        observer(newValue);
        value = newValue;
      }
    });
  }

  function observer(data) {
    if (_typeof(data) !== 'object' || data == null) {
      return;
    }

    if (data.__ob__) {
      return;
    }

    return new Observer(data);
  }

  function Proxy(vm, data, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[data][key];
      },
      set: function set(newValue) {
        vm[data][key] = newValue;
      }
    });
  }

  function initState(vm) {
    // vm.$options
    var opts = vm.$options;

    if (opts.props) ;

    if (opts.methods) ;

    if (opts.data) {
      initData(vm);
    }

    if (opts.computed) ;

    if (opts.watch) ;
  }

  function initData(vm) {
    var data = vm.$options.data; // 数据的初始化操作

    vm._data = data = typeof data == 'function' ? data.call(vm) : data; //当我去vm上取属性时，帮我将属性的取值代理到vm._data上

    for (var key in data) {
      Proxy(vm, '_data', key);
    } //数据的劫持方案 对象的  Object.defineProperty


    observer(data); //数组是单独处理的
  }

  function initMixin(Vue) {
    //初始化操作
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = options; //初始化状态（将数据做一个初始化的劫持 当我改变数据时应该跟新视图）

      initState(vm); //vue组件中有很多状态 data props watcch computed
      //vue里面核心特性 响应式数据原理
      //vue 是一个什么样的框架 
      // MVVM 数据变化视图会更新，视图变化数据会被影响 MVVM不能跳过数据取跟新视图
    };
  }

  // new Vue({})

  function Vue(options) {
    this._init(options); // 入口方法，做初始化操作 

  }

  initMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
