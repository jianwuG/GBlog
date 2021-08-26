### nextjs



#### 问题
* next.js在引入其他组件或者模块可能会出现报错
  * 解决：使用next动态引入模块或组件
  ```
    import <模块名> from 'next/dynamic';
    const Module = dynamic(
        import('<模块名>'),
        { ssr: false }
    );
  ```
* global引入只支持一个css,同时支持scss或者less
  * @zeit/next-sass、@zeit/next-css
  ```
    // next.config.js
    const withSass = require('@zeit/next-sass')
    const withCss = require('@zeit/next-css');
    const withPlugins = require("next-compose-plugins");
    
    module.exports = withPlugins([withSass,withCss], {
      webpack: (config) => {
        return config
      },
    });

    ```
   *  next-compose-plugins
   * 通过css.module

```
测试
```
