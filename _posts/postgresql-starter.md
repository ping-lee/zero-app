---
title: 'PostgreSQL-起步'
excerpt: '介绍、安装PostgreSQL。'
coverImage: '/assets/blog/postgresql/cover.jpg'
date: '2020-09-30T09:10:07.322Z'
author:
  name: 木子李
  picture: '/assets/blog/authors/tristan.jpg'
ogImage:
  url: '/assets/blog/postgresql/cover.jpg'
---

PostgreSQL是一个基于Postgres4.2版本，由加利福尼亚大学伯克利计算机科学学院开发的对象-关系型数据管理系统。

PostgreSQL作为原始伯克利代码的后裔，其源码也是开源的。它支持广泛的SQL标准并且提供很多现代特性：
- 复杂查询
- 外键
- 触发器
- 可更新视图
- 事务完整性
- 多版本并发控制

同时，PostgreSQL还可以以多种方式扩展，例如添加新的：
- 数据类型
- 函数
- 操作符
- 聚合函数
- 索引方法
- 程序语言

因为其自由的开源协议，postgresql可以被被任何用户以任意私人、商业、学术目的免费使用、修改、分发。

## 安装PostgreSQL
[通过RPM安装postgresql](https://www.postgresql.org/download/linux/redhat/)