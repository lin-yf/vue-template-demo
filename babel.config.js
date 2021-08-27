const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

const plugins = [
  // '@babel/plugin-transform-runtime',
  // "@babel/plugin-proposal-export-default-from",
  // "@babel/plugin-proposal-export-namespace-from",
  // 'babel-plugin-inline-import-data-uri',
  "@babel/plugin-syntax-dynamic-import"
]
if (IS_PROD) {
  plugins.push('transform-remove-console')
}
// lazy load ant-design-vue
// if your use import on Demand, Use this code
plugins.push(['import', {
  'libraryName': 'ant-design-vue',
  'libraryDirectory': 'lib',
  'style': "css" // `style: true` 会加载 less 文件
}])

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          browsers: [
            'last 2 versions',
            'Firefox ESR',
            '> 1%',
            'ie >= 9',
            'iOS >= 8',
            'Android >= 4',
          ],
        },
      }
    ],
    // ['@vue/babel-preset-jsx']
  ],
  plugins
}
