---
title: 'PostgreSQL-SQL'
excerpt: 'PostgreSQL指南'
coverImage: '/assets/blog/preview/cover.jpg'
date: '2020-09-30T09:10:07.322Z'
author:
  name: 木子李
  picture: '/assets/blog/authors/tristan.jpg'
ogImage:
  url: '/assets/blog/preview/cover.jpg'
---

## SQL句法
### 词法结构

SQL输入由一系列命令(***commands***)组成。一条命令由一系列符号(***tokens***)组成，以逗号(;)结尾。

一个符号可以是关键字(***key word***)、标识符(identifier)、带引号的标识符(***quoted identifier***)、文字(或者常数)或者特殊字符。符号通常以空格符(space、tab、newline)分割,但不一定没有歧义。

例如，以下(句法上)是有效的SQL输入：
```sql
SELECT * FROM MY_TABLE;
UPDATE MY_TABLE SET A = 5;
INSERT INTO MY_TABLE VALUES (3, 'hi there');
```