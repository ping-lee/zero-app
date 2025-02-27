---
title: 'PostgreSQL-SQL-语法'
excerpt: '描述了SQL的语法，它是理解后续内容的基础，详细说明了如何应用SQL定义和修改数据。'
coverImage: '/assets/blog/postgresql/cover.jpg'
date: '2020-09-30T09:10:07.322Z'
author:
  name: 木子李
  picture: '/assets/blog/authors/tristan.jpg'
ogImage:
  url: '/assets/blog/postgresql/cover.jpg'
---

本文描述了SQL的语法，它是理解后续内容的基础，详细说明了如何应用SQL定义和修改数据。建议熟悉SQL的用户仔细阅读,因为它包含几个规则和概念，这些规则和概念在数据库之间不一致地实现，或者特定于PostgreSQL数据库。

## 词法结构

SQL输入由一系列指令（***commands***）组成。一条指令由一系列符号（***tokens***）组成，以逗号（;）结尾。

一个符号可以是关键字（***key word***）、标识符（***identifier***）、带引号的标识符（***quoted identifier***）、文字（或者常数）或者特殊字符。符号通常以空格符（`space、tab、newline`）分割。

例如，以下（在句法上）是合法的SQL输入：
```sql
SELECT * FROM MY_TABLE;
UPDATE MY_TABLE SET A = 5;
INSERT INTO MY_TABLE VALUES （3, 'hi there'）;
```  

这里的每一行共同组成了三条连续的指令。  

例外，注释（***comments***）可以在SQL输入里出现。它们不是符号，在功能上等同于空白符。

关于什么符号表示指令、运算符或者参数，SQL语法没用那么严谨。开头的符号通常是指令名称，所以以上的样例我们通常叫做“SELECT”、“UPDATE”、“INSERT”指令。但是`UPDATE`指令在特定位置始终需要`SET`符号，类似的有`INSERT`，为了成功执行，也需要`VALEUES`符号。

### 标识符和关键字
上述例子中像SELECT、UPDATE或者VALUES符号是关键字的举例，的确，这些文字在SQL语言中有固定的含义。符号`MY_TABLE`和`A`是标识符的举例。它们标识了表、列或者数据库对象，取决于指令的使用。因此，他们有时简单的叫做“名字”（***name***）。关键字和标识符有相同的词法结构，这意味着如果不知道语言的话，你不能分辨哪个符号是标识符，哪个符号是关键字。  

SQL的标识符和关键字必须以字母（a-z）或者下划线开头（_），后续的可以是字母、下划线、数字（0-9）、美元符（$）。

系统使用不超过`NAMEDATALEN-1`个字节的标识符，长命名可以指令里编写但会被截取。默认的，`NAMEDATALEN`是64位，最大标识符的长度是63字节。如果这个限制有问题，可以在`src/include/pg_config_manual.h`修改`NAMEDATALEN`常量。

关键字和标识符不区分大小写，因此
```sql
UPDATE MY_TABLE SET A = 5;
```
可以写成：
```sql
uPDaTE my_TabLE SeT a = 5;
```
关键字大写名字小写的习惯通常被使用，比如：
```sql
UPDATE my_table SET a = 5;
``` 
带引号的标识符再次不讨论。

### 常量
在PostgreSQL里有三类隐含类型的常量：字符串，字符和数字。常量也可以用显式类型指定，这可以使系统实现更精确的表示和更有效的处理。

#### 字符串常量
在SQL里一个字符串常量是单引号包裹的任意序列字符串，比如'This is a string'。为了在字符串常量里包含单引号，需要写两个连续的单引号，比如'Dianne''s horse'，注意它不是双引号（"）。

用空格符和跨行符连接的两个字符串常量等效的被看作一个字符串，就好像他们写在一起，比如：
```sql
SELECT 'foo'  
'bar';
```
等同于：
```sql
SELECT 'foobar';
```
但是：
```sql
SELECT 'foo'    'bar';
```
是非法的语法。

#### 数值常量
数值常量通常是以下的形式：
```bash
digits
digits.[digits][e[+-]digits]
digits[.digits][e[+-]digits]
digitse[+-]digits
```
``digist``是一个或者多个十进制数（0到9）。小数点之前或之后必须至少有一位数字，指数标记（e）后必须至少一位数字，常量中不能嵌入任何空格或其他字符，请注意，任何前导的正号或负号实际上并未视为常量的一部分，它是应用于常量的运算符。

这些是有效数字常量的一些示例：
```
42  
3.5  
4.  
.001  
5e2  
1.925e-3  
```

如果既不包含小数点也不包含指数的数字常量的值适合整数类型（32位），则最初将其假定为整数类型；否则，如果其值适合bigint类型（64位），则假定它为bigint类型；否则，将其视为numeric类型；包含小数点和/或指数的常量最初总是假定为数字类型。

他最初分配的数值常量的数据类型只是类型解析算法的起点。 在大多数情况下，常量将根据上下文自动强制为最合适的类型。 必要时，可以通过强制转换数值将其解释为特定的数据类型。 例如，您可以通过编写以下代码来将数值强制为REAL （float4）类型：
```sql
REAL '1.23'  -- string style
1.23::REAL   -- PostgreSQL （historical） style
```

### 运算符
运算符是以下列表中最多`NAMEDATALEN-1`（默认为63）个字符的序列：
```
+ - * / < > = ~ ! @ # % ^ & | ` ?
```
但是，对运算符名称有一些限制：
- --和/ *不能出现在运算符名称的任何位置，因为它们将被用作注释的开头。
- 多字符运算符名称不能以+或-结尾，除非名称也包含以下至少一个字符：
```
~ ! @ # % ^ & | ` ?
```
例如，@-是允许的运算符名称，但*-不是。 此限制使PostgreSQL可以解析与SQL兼容的查询，而无需在标记之间使用空格。
### 特殊字符
某些不是字母数字的字符具有特殊的含义，不同于运算符。 有关用法的详细信息可以在描述相应语法元素的位置找到。 本部分仅用于建议存在和总结这些字符的目的。

- 美元符号（$）后跟数字用于表示函数定义或准备好的语句主体中的位置参数。 在其他情况下，美元符号可以是标识符的一部分，也可以是美元引用的字符串常量。
- 括号（（））具有将表达式分组和强制执行优先级的通常含义。 在某些情况下，括号是特定SQL指令的固定语法的一部分。
-方括号（[]）用于选择数组的元素。
- 在某些句法构造中使用逗号（，）分隔列表的元素。
- 分号（;）终止SQL指令。 除了字符串常量或带引号的标识符外，它不能出现在指令中的任何位置。
- 冒号（:）用于从数组中选择“切片”。在某些SQL方言（例如Embedded SQL）中，冒号用于为变量名添加前缀。
- 在某些情况下，星号（*）用于表示表行或复合值的所有字段。 当用作聚合函数的参数时，它也具有特殊含义，即该聚合不需要任何显式参数。
- 句点（.）用于数字常量，并用于分隔模式，表和列名。
### 注释
注释是由双破折号开始并延伸到行尾的一系列字符，例如：
```sql
-- This is a standard SQL comment
```
或者，可以使用C样式的块注释：
```c
/* multiline comment
 * with nesting: /* nested block comment */
 */
 ```
 其中注释以`/*`开头，并扩展到匹配的`*/`。 这些块注释按照SQL标准中的规定嵌套，但与C不同，因此可以注释掉可能包含现有块注释的较大代码块。

 在进行进一步的语法分析之前，已从输入流中删除注释，并有效地将其替换为空格。
 
### 运算符优先级
下表显示了PostgreSQL中运算符的优先级和关联性。 大多数运算符具有相同的优先级，并且是左关联的。 运算符的优先级和关联性硬连接到解析器中。

|运算符	|关联	|描述|
|-----------------|---------------|-----------|
|.	|左&nbsp;&nbsp;&nbsp;&nbsp;	|表/列名称分隔符
::	|左	|PostgreSQL风格的类型转换
|[ ]	|左	|数组元素选择
|+ -	|右	|一元加号，一元减号
|^	|左	|求幂
|* / %	|左	|乘法，除法，模
|+ -	|左	|加，减
|（any other operator）	|左	|所有其他原生和用户定义的运算符
|BETWEEN IN LIKE ILIKE SIMILAR	| 	|范围限制，设置成员资格，字符串匹配
|< > = <= >= <>	| 	|比较运算符
|IS ISNULL NOTNULL	| 	|IS TRUE, IS FALSE, IS NULL, IS DISTINCT FROM, etc
|NOT	|右	|逻辑否
|AND	|左	|逻辑与
|OR	|左	|逻辑或

## 值表达式
值表达式在很多情况下被使用，例如在SELECT指令的目标列中，在INSERT或者UPDATE指令中用作新列值，或在许多指令中的搜索条件中使用。值表达式的结果有时称为标量（***scalar***），以将其与表表达式（即表，***table expression***）的结果区分开来。因此，值表达式也称为标量表达式（甚至简称为表达式）。表达式语法允许使用算术，逻辑，聚合和其他运算从原始部分计算值。

值表达式是以下之一：
- 常数或文字值
- 列引用
- 在函数定义或准备好的语句主体中的位置参数引用
- 下标表达式
- 字段选择表达式
- 运算符调用
- 函数调用
- 聚合表达式
- 窗口函数调用
- 类型转换
- 排序规则表达式
- 标量子查询
- 数组构造器
- 行构造器
- 括号中的另一个值表达式（用于对子表达式进行分组并覆盖优先级）

除了此列表外，还有许多可归类为表达式但不遵循任何常规语法规则的构造。 这些通常具有函数或运算符的语义，一个示例是`IS NULL`子句。

### 列引用
一个列可以被以下的方式引用：
```sql
correlation.columnname
```
correlation是表的名字（可能带有方案名字），或通过FROM子句定义的表的别名。如果列名称在当前查询中使用的所有表中都是唯一的，则可以省略相关名称和分隔符号。

### 位置参数
位置参数引用用于指示从外部提供给SQL语句的值。参数用于SQL函数定义和准备好的查询中。 一些客户端库还支持与SQL命令字符串分开指定数据值，在这种情况下，参数用于引用离线数据值。 参数引用的形式为：
```sql
$number
```
例如，考虑函数dept的定义：
```sql
CREATE FUNCTION dept(text) RETURNS dept
    AS $$ SELECT * FROM dept WHERE name = $1 $$
    LANGUAGE SQL;
```
这里每当调用函数时，$ 1都会引用第一个函数参数的值。

### 下标表达式
如果表达式产生数组类型的值，则可以通过写来提取数组值的特定元素
```sql
expression[subscript]
```
或多个相邻元素（“数组切片”）可以通过以下方式提取：
```sql
expression[lower_subscript:upper_subscript]
```
每个下标本身就是一个表达式，必须产生一个整数值。

通常，必须对数组表达式加上括号，但是当要下标的表达式只是列引用或位置参数时，可以省略括号。 同样，当原始数组为多维时，可以连接多个下标。 例如：
```sql
mytable.arraycolumn[4]
mytable.two_d_column[17][34]
$1[10:42]
(arrayfunction(a,b))[42]
```
最后一个示例中的括号是必需的。
### 选取字段
如果表达式产生复合类型（行类型）的值，则可以通过写来提取行的特定字段。
```sql
expression.fieldname
```
通常，行表达式必须加括号，但是当要选择的表达式只是表引用或位置参数时，可以省略括号。 例如：
```sql
mytable.mycolumn
$1.somecolumn
(rowfunction(a,b)).col3
```
（因此，合格的列引用实际上只是字段选择语法的一种特殊情况。）一个重要的特殊情况是从复合类型的表列中提取字段：
```sql
(compositecol).somefield
(mytable.compositecol).somefield
```
在第二种情况下，这里需要使用括号来表明Compositecol是列名而不是表名，或者mytable是表名而不是方案名。

您可以通过*来获取复合值的所有字段：
```sql
(compositecol).*
```
### 运算符调用
有以下三种类型的运算符调用：
expression operator expression （二元运算符）
operator expression （一元运算符）
expression operator （一元运算符）

其中运算符遵循上述的语法规则，或者是AND，OR和NOT关键字之一，或者是符合以下格式的合格运算符名称：
```sql
OPERATOR(schema.operatorname)
```
存在哪些特定运算符，以及它们是一元运算符还是二元运算符，取决于系统或用户定义了哪些运算符。
### 函数调用
函数调用的语法是函数的名称（可能包含方案名称），其后是用括号括起来的参数列表：
```sql
function_name ([expression [, expression ... ]] )
```
例如，以下代码计算2的平方根：
```sql
sqrt(2)
```
在某些用户不信任其他用户的数据库中发出查询时，编写函数调用时需遵守安全预防措施。

### 聚合表达式
### 窗口函数调用
### 类型转换
### 归类表达式
### 标量子查询
### 数组构造器
### 行构造器
### 表达式评估规则

## 调用函数
### 使用位置符号
### 使用命名符号
### 使用混合符号 