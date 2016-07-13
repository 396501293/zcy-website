# MEAN 基础框架

## 环境依赖

* [Node.js](http://nodejs.org/) / [io.js](https://iojs.org/cn/index.html) - [下载和安装](http://nodejs.org/download)
* 前端包管理工具 [Bower](http://bower.io/) - `npm install bower -g`
* Node.js 构建工具 [gulp](http://gruntjs.com/) - `npm install gulp-cli -g`

**`node_modules` 目录和 `app/bower_components`目录下的包要通过 `npm` 和 `bower`下载**

## 使用方法

### 设置项目名称:

替换所有文件中的 `baseframe` 改为项目的名称

### 根据 `package.json` 和 `bower.json` 下载相应包:

    cd 到项目目录
    npm install
    bower install

### 运行平台--开发模式

    gulp

### 打发行包

    gulp build

项目目录下的 `dist/gulpMean.zip` 为发行包

**请参考下方 部署到 CentOS 说明**

### 部署到 CentOS 说明

CentOS 版本：CentOS 7.0

#### 安装 gcc, g++, openssl, python(要求2.6或2.7版本):

    yum install gcc gcc-c++ openssl-devel

#### 安装 Node.js

    如果服务器有其他方式安装，可以直接安装node v4.4.7即可

    wget http://nodejs.org/dist/v4.4.7/node-v4.4.7.tar.gz
    tar -xf node-v4.4.7tar.gz
    cd node-v4.4.7
    ./configure --prefix=/usr/local/lib/node
    make && make install

修改 `/etc/profile`， 添加

    export NODE_HOME=/usr/local/lib/node
    export PATH=$NODE_HOME/bin:$PATH

执行

	source /etc/profile

#### 安装 pm2

     npm install pm2@latest -g

**注意:详细使用可参考 [pm2 官网](https://github.com/Unitech/pm2)**

    pm2 startup centos  (ubuntu|centos|redhat|gentoo|systemd|darwin|amazon)

#### 部署平台发行包

复制发行包 `gulpMean.zip` 到操作系统

    unzip gulpMean.zip -d gulpMean
    cd gulpMean

#### 启动平台

    pm2 start index.js --name "zcy-websit"
    pm2 save

#### 平台重启

    pm2 restart "zcy-websit"

#### 平台关闭

    pm2 stop "zcy-websit"
    pm2 delete "zcy-websit"
  
