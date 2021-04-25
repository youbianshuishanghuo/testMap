# mpa-scaffold

多页应用脚手架-reactjs

# 项目结构:
    config 基础结构配置项
        --locals 国际化 
                 ***注意: 页面中一切中文都需在此进行声明,严禁 <p>你好呀</p>此种情况出现
                 必须以变量的形式进行引用,可参考框架demo中语言切换功能代码<p>{intl.get("Hello")}</p>
        --index.js 页面相关配置、打包时的页面分包
    mock mock环境下的数据存储
    public 模板文件（react框架容器）
    scripts 脚本文件
        --page 用于自动生成页面    
        --api.config.js swagger接口文档路径配置
        --env.xxx.json 环境相关配置
    src 项目代码文件
        --api 根据swagger文档自动生成的接口,不可修改
        --asserts 资源目录 用于存放项目公用的资源文件
        --components 通用组件
        --constants 静态常量
            --env.json 环境配置相关参数,不可手动修改（自动生成,下文会做说明）
        --models typescript通用接口声明文件
        --page 项目页面
            --xxx  页面名
               --component 仅当前页面所用的组件,非通用组件
               --app.scss 样式文件
               --App.tsx 具体页面
               --index.tsx 页面容器,无需做任何修改
        --service 服务封装
            --AppProvider.tsx 数据存储最外层容器
            --http.ts 网络请求封装
            --mock.ts 处理mock环境下网络请求相关配置
        --stores 数据存储
            --DemoStore.tsx 此文件提供了一个基本的数据存储操作样例
        --style 切换网页风格时的样式配置(动态切换主题)
            --color 颜色配置,代码中严禁使用直接赋值的形式 如：background-color: #00aeff
                    必须以引用的形式进行配置,如:
                    1、xxx.scss样式文件中
                    $bg-color: var(--mainBg); 
                    #container>.demo {
                        background-color:$bg-color
                    }
                    其中--mainBg 
                    在style/theme下的darkTheme.less与lightTheme.less中
                    :root{}中进行定义
                    2、在代码文件中 
                    import { themeColors } from "@/style/color";
                    <Content style={style} id={"frame-content"}>
                    let style = {
                      background: themeColors.contentBg
                    };
            --theme 主题配置根据项目需求自行配置
                --darkTheme.less 暗色主题
                --lightTheme.less 亮色主题
                ## 备注: 框架demo中有动态切换主题的功能,是根据localstorage中bgStatus来判断1为暗,0为亮
            --utils 工具类

## 1、初始化项目
npx git+https://yunluwh:yunluwh1234@code.htres.cn/frontend/init_scaffold.git mpa  项目名

### 安装依赖
进入项目根目录，运行`yarn`

## 2、设置研发环境

### 配置服务端swagger接口
    ①在项目scripts/api.config.js文件中修改services数组中内容，其中
    apiDoc表示你所需接口的swagger文档路径
    name表示最后根据swagger文档生成的接口文件名 
    ignorePaths表示swagger文档中想要忽略的接口数组(无需填写完整路径，只要包含此字段的接口都会忽略) 
    例： http://home.mst.casicloud.com/1/app_version/test1/ 
         http://home.mst.casicloud.com/1/app_version/test2/ 
         填写ignorePaths: ["/1/app_version"] 则以上两接口都会屏蔽掉，不会生成
         
    ②scripts文件夹下
    env.mock.json 对应mock配置
    env.prod.json 对应正式环境配置
    env.test.json 对应测试环境配置
    其中clientId和clientSecret不同项目测试环境与正式都不同，需自行配置, 此二者的值在env.mock.json与env.test.json中可配置一样
    
    host中对象key即为①中name,value为接口的根地址,env.mock.json中host可全部填写为http://localhost:3001
### 生成api 
    执行 yarn api
         在src目录下的api文件夹下会自动生成与接口相关的网络请求代码,不可手动修改,避免人为错误,若文件生成过程中遇问题请根据打印台提示联系
         swagger接口提供者或框架开发人员进行处理
         同时在根目录下会生成mock文件夹，用于本地切换mock环境时提供mock数据支持
         
### 开发环境
    执行 yarn env prod
### 测试环境
    执行 yarn env test
### 本地mock环境
    执行 yarn env mock
    yarn mock 启动本地mock服务器（若已经启动则无需此步操作;若自己新增mock数据接口,则需重新启动）
### 备注
    执行环境命令切换时
    会在src/constants目录下自动生成env.json文件,不可手动修改此文件,若想修改相关配置信息,请参考②中说明
    
### 补充
    更多mock及环境切换相关配置可在node_modules/yunlu-sdk/README.md中查看
    
## 3、生成业务代码
### 生成页面
    框架中已经提供部分页面生成的样例，现对页面生成及如配置进行说明，如只看框架效果，可跳过这一步
    
    ①在根目录下的config/index.js文件中
    配置相关数组
    headerList:表示头部通栏中对应的相关页面
    sliderList:表示侧边栏中对应的相关页面配置
    ...其余的可根据需求自行决定是否添加
    
    数组中对象的格式:
    name:若为多级菜单,则表示当前这一级的名字(必须用英文,为项目国际化配置考虑,对应的中文需在在根目录下的config/locales/zh-CN.json中进行配置)
         若为最后一级则填写此级名称,最后生成页面时,会根据此名称生成对应的页面,例: name: "demo",则最后会在src/page下生成demo文件夹,文件夹中
         包含页面的基本结构(可根据需求自行修改页面代码)
         必填项
    nextLink: 数组形式,表示是否有下一级,若有则其中对象格式与上级同理(递归)
    groupName: 若为多级菜单的最后一级,则此项必填,内容为包含之前各级name的数组
               若本身就是第一级,且无下级菜单,则可不填
    link: 表示外部链接,非本项目页面
    defaultKey: 若当前页面不想在侧边栏展示,仅为上级页面(假设为pagexxx)的切换跳转,可将值设为pagexxx的name
    
    ②配置完成后
    执行 yarn page
    即可在src/page文件夹下自动生成所配置的所有页面的结构代码;如已存在,不会重新创建和覆盖
##### 执行命令
 > `yarn start` 启动项目

## 4、测试
需下载谷歌提供的react-devtools插件,然后在谷歌浏览器中加载扩展程序功能里添加你下载的插件
运行起项目后,在谷歌浏览器中按f12,切换至React栏,即可查看当前页面状态,及各级组件间传值与状态

## 5、打包

##### 执行命令
> `yarn build`


### 打包、上传镜像

adc镜像仓库地址：reg.htres.cn

##### 镜像上传
> `yarn image-upload xxx`

1. xxx为云网正式服务的用户名；
1. 上传镜像名称：reg.htres.cn/xxx/项目名称

## 6、部署
##### 镜像测试

> `yarn image-test xxx 主机端口`

1. xxx为云网正式服务的用户名；

测试访问地址：**localhost:主机端口/developer/demo**

## Tips: 若只看项目运行效果及整个打包部署流程,按一下步骤执行命令即可
    1、 npx git+https://yunluwh:yunluwh1234@code.htres.cn/frontend/init_scaffold.git spa 项目名
    2、 yarn
    3、 yarn api
    4、 yarn env test
    5、 yarn start  
    6、 yarn build 
    7、 yarn image-upload 云网正式服务的用户名
    8、 yarn image-test  云网正式服务的用户名  主机端口
    
## 实际开发中框架拉取后根据需求,要手动配置的文件:
    1、config/index.js  配置所需页面
    2、scripts/api.config.js 配置swagger接口文档地址
       scripts/env.xxx.json 配置项目所需的clientId、clientSecret、host
    3、config/locales/en-US.json与config/locales/zh-CN.json  国际化语言配置
       若有此要求,则不可在页面中直接写汉字或英文,必须以变量的形式进行引用,方法见所给demo
    4、src/style 根据项目所需自行配置主题色及对应的变量引用,不可直接在组件或scss文件中写固定色值

## 添加新的swagger接口的步骤
    1、在项目scripts/api.config.js中的services数组里新增你想添加的swagger接口地址
    2、在scripts/env.prod.json中的host对象中添加此swagger文档内接口对应的正式环境根地址
       若暂无正式地址,也可暂不配置,跳过此步,但无法使用yarn env prod切换正式环境进行测试
    3、执行yarn env xxx 切开发环境,将新增文档根地址同步src/constants/env.json中
    4、执行yarn api 操作,再src/api下生成新增的swagger接口