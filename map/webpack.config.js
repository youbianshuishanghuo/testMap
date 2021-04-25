const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const modules = require("./config/module");
const argv = require("yargs").argv;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");

const isDev = argv.cfg && argv.cfg === "dev"; //是否为开发模式

const entrys = Object.create(null);
const htmlPlugins = [];

if (modules.length > 0) {
  for (let srcModule of modules) {
    let { name, title } = srcModule;
    entrys[`${name}/${name}`] = path.resolve(__dirname, `./src/page/${name}/index.tsx`);
    htmlPlugins.push(
      new HtmlWebpackPlugin({
        title,
        template: path.resolve(__dirname, "./public/index.html"),
        filename: path.resolve(`./dist/${name}/index.html`),
        chunks: [`${name}/${name}`, `common/common`],
        favicon: "./favicon.ico",
        inject: true
      })
    );
  }
}

module.exports = {
  mode: isDev ? "development" : "production", //生产环境还是测试环境
  entry: entrys,
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist")
  },
  // 添加resolve
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  module: {
    rules: [{
      test: /\.(ts|tsx|js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          babelrc: true,
          cacheDirectory: true
        }
      }
    },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",  // postcss-loader中options里使用了function、require时需要ident属性，可以是任意值
              plugins: () => [
                require("postcss-flexbugs-fixes"),
                autoprefixer({
                  overrideBrowserslist: [
                    ">1%",
                    "last 4 versions",
                    "Firefox ESR",
                    "not ie < 9"
                  ],
                  flexbox: "no-2009"  // false将禁用flexbox属性前缀。或flexbox:“no-2009”将仅为最终版本和IE版本的规范添加前缀。
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: "less-loader",
            options: {
              //modifyVars: JSON.stringify(theme),
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            // 将所有图片合到一个文件夹
            outputPath: "images",
            publicPath: "../../images"
            // 下方是将图片分别放置对应页面的文件夹内
            // name: '[path]/[hash:8]-[name].[ext]',
            // context: path.resolve(__dirname, './src/'),//过滤掉[path]中的相对路径
          }
        }
      },
      {
        test: /\.(ttf|ttc|eot|svg|woff|woff2)$/,
        use: "url-loader"
      }, //处理字体文件的loader
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },

  plugins: [...htmlPlugins,
    new OptimizeCSSAssetsPlugin({ // css 压缩
      cssProcessor: require("cssnano"), //引入cssnano配置压缩选项
      cssProcessorOptions: {
        discardComments: { removeAll: true }
      },
      canPrint: isDev //是否将插件信息打印到控制台
    }),
    new MiniCssExtractPlugin({}),
    new webpack.SourceMapDevToolPlugin({
      test: /\.(css|scss|sass)/,
      filename: "[name].map"
    }),
    new webpack.SourceMapDevToolPlugin({ // sourcemap资源映射
      test: /\.(css|scss|sass)/,
      filename: "[name].map"
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"), // 告诉服务器那个文件夹提供静态资源
    hot: true, // 热更新
    compress: true, // 开启gzip压缩
    port: 1234, // 服务端口号
    open: true,
    openPage: `${modules[0].name}` // 默认打开的页面
  },
  optimization: {
    // 提取公用js到common.js中
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "common/common",
          chunks: "all",
          minChunks: 2
        }
      }
    }
  },
  watchOptions: {
    poll: 1000, //监测修改的时间(ms)
    aggregateTimeout: 500, //防止重复按键，500毫米内算按键一次
    ignored: /node_modules/ //不监测
  },
  stats: { children: false, warningsFilter: [/export .* was not found in/] },
  devtool: isDev ? "source-map" : false    // 值为source-map时，方便在浏览器中使用react开发工具调试
};