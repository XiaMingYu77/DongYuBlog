屿家笔记库—SQL语法

SQL是用于访问和处理数据库的标准计算机语言

+ SQL指结构化查询语言

+ SQL使我们有能力访问数据库

+ SQL是一种ANSI的标准计算机语言

  （ANSI 美国国家标准化组织）

SQL能做什么：

+ 面向数据库执行查询
+ 可从数据库取回数据
+ 可在数据可以中插入新的记录
+ 可更新数据库中的数据
+ 可从数据库删除记录
+ 可在数据库中创建新表
+ 可在数据库中创建存储过程
+ 可在数据库中创建视图
+ 可以设置表、存储过程和视图的权限

需要注意的是，虽然SQL为一种标准，但是存在着很多不同版本的SQL语言，为了与ANSI标准相兼容，它们必须以相似的方式共同支持一些主要的关键词（比如 SELECT，UPDATE，DELETE，INSERT，WHERE等等）

**注释：**除了SQL标准外，大部分的SQL数据库程序都拥有它们自己的私有扩展

## SQL基本语法

### 数据库表：

一个数据库通常包含一个表或者多个表，每个表由一个名字标识（如“客户”或者“订单”）。表包含带有数据的记录（行）

这个表就和我们通常意义上的表一样，下面是一个名为"Persons"的表

| id   | LastName | FirstName | Address        | City     |
| ---- | -------- | --------- | -------------- | -------- |
| 1    | Adams    | John      | Oxfored Street | London   |
| 2    | Bush     | George    | Fifth Avenue   | New York |
| 3    | Carter   | Thomas    | Changan Street | Beijing  |

**SQL语句：**比如我们要获取LastName列的数据：

```sql
SELECT LastName FROM Persons
```

结果集类似这样

<img src="https://XiaMingYu77/My-Markdown-Picture/img/202112112133172.jpg" style="zoom:25%;" /> 

![](https://XiaMingYu77/My-Markdown-Picture/img/202112201616453.png)

==特别注意：SQL对大小写不敏感==

**SQL语句后面的分号：**某些数据库系统要求在每条SQL命令末端使用分号，这里就不用了。

SQL  DML和DDL

可以把SQL分为两个部分：数据操作语言（DML）和数据定义语言（DDL）

查询和更新指令构成了SQL的DML部分：

+ SELECT - 从数据库表中获取数据
+ UPDATE - 更新数据库表中的数据
+ DELETE - 从数据库表中删除数据
+ INSERT INTO - 向数据库表中插入数据

DDL部分使我们有能力创建或删除表格。我们野结衣定义索引（键），规定表之间的链接，以及施加表键的约束。SQL中最重要的DDL语句：

+ CREATE DATABASE - 创建新数据库
+ ALTER DATABASE - 修改数据库
+ CREATE TABLE - 创建新表
+ ALTER TABLE - 变更数据库表
+ DROP TABLE - 删除表
+ CREATE INDEX - 创建索引
+ DROP INDEX - 删除索引

### SQL SELECT 语句

SELECT语句用于从表中选取数据

结果被存储在一个结果表中（成为结果集）

**语法**

```sql
SELECT 列名称 FROM 表名称
```

以及选取所有列的快捷方式 “*”

```sql
SELECT * FROM 表名称
```

（SQL语句对大小写不敏感）

#### 实例：

下面是一个名为"Persons"的表

| id   | LastName | FirstName | Address        | City     |
| ---- | -------- | --------- | -------------- | -------- |
| 1    | Adams    | John      | Oxfored Street | London   |
| 2    | Bush     | George    | Fifth Avenue   | New York |
| 3    | Carter   | Thomas    | Changan Street | Beijing  |

使用语句`SELECT LastName,FirstName FROM Persons`

结果：

| LastName | FirstName |
| -------- | --------- |
| Adams    | John      |
| Bush     | George    |
| Carter   | Thomas    |

使用语句`SELECT*FROM Persons`

结果：

| id   | LastName | FirstName | Address        | City     |
| ---- | -------- | --------- | -------------- | -------- |
| 1    | Adams    | John      | Oxfored Street | London   |
| 2    | Bush     | George    | Fifth Avenue   | New York |
| 3    | Carter   | Thomas    | Changan Street | Beijing  |

#### 在结果集（result-set）中导航

有SQL查询程序获得的结果都被放在一个结果集中。大多数数据库软件系统都允许使用编程函数在结果集中进行导航

比如：Move - To - First - Record、Get - Record - Content、Move - To - Next - Record等等

### SQL SELECT DISTINCT 语句（返回唯一不同的值）

在表中可能会包含重复值，有时候我们希望仅列出不同（distinct）的值

**语法**

```sql
SELECT DISTINCT 列名称 FROM 表名称
```

#### 实例

有一个“Orders”表

| Company  | OrderNumber |
| -------- | ----------- |
| IBM      | 3532        |
| W3School | 2356        |
| Apple    | 4698        |
| W3School | 6953        |

我们想知道所有的公司

如果使用语句`SELECT Company FROM Orders`，结果中“W3School”被列出了两次

使用

```sql
SELECT DISTINCT Company FROM Orders
```

结果：

<img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202112112132684.jpg" style="zoom:25%;" /> 

这样“W3School”就只出现了一次

### SQL WHERE 子句

WHERE子句用于规定选择的标准

**语法：**

```sql
SELECT 列名称 FROM 表名称 WHERE 列 运算符 值
```

下面的运算符可以在WHERE语句中使用

| 操作符  | 描述         |
| ------- | ------------ |
| =       | 等于         |
| <>      | 不等于       |
| >       | 大于         |
| <       | 小于         |
| >=      | 大于等于     |
| <=      | 小于等于     |
| BETWEEN | 在某个范围内 |
| LIKE    | 搜索某种模式 |

**注释：**在某些版本的SQL中"<>"可以写为"!="

#### 实例

| id   | LastName | FirstName | Address        | City     | Year |
| ---- | -------- | --------- | -------------- | -------- | ---- |
| 1    | Adams    | John      | Oxfored Street | London   | 1970 |
| 2    | Bush     | George    | Fifth Avenue   | New York | 1975 |
| 3    | Carter   | Thomas    | Changan Street | Beijing  | 1980 |
| 4    | Gates    | Bill      | Xuanwumen 10   | Beijing  | 1985 |

我们希望选取居住在城市“Beijing”中的人，我们需要向SELECT语句中添加WHERE语句

```sql
SELECT * FROM Persons WHERE City='Beijing'
```

结果：

| id   | LastName | FirstName | Address        | City    | Year |
| ---- | -------- | --------- | -------------- | ------- | ---- |
| 3    | Carter   | Thomas    | Changan Street | Beijing | 1980 |
| 4    | Gates    | Bill      | Xuanwumen 10   | Beijing | 1985 |

**需要注意：SQL使用单引号围绕文本值（大部分数据库系统也支持双引号）。如果是数组不要用引号**

**文本值：**

```sql
SELECT * FROM Persons WHERE FirstName='Bush'
```

**数值：**

```sql
SELECT * FROM Persons WHERE Year>1965
```

### SQL AND & OR 运算符

AND 和 OR 运算符用于基于一个以上的条件对记录进行过滤

把两个或者多个条件联合

还是上面的用例

```sql
SELECT * FROM Persons WHERE FirstName='Thomas' AND LastName='Carter'
```

结果：

| id   | LastName | FirstName | Address        | City    | Year |
| ---- | -------- | --------- | -------------- | ------- | ---- |
| 3    | Carter   | Thomas    | Changan Street | Beijing | 1980 |

### SQL ORDER BY 语句

ORDER BY 语句用于根据指定列对结果进行排序

ORDER BY 语句默认按照升序排序

==如果想使用降序可以用DESC关键字==；ASC升序

**语法：**

```sql
SELECT 列名称 FROM 表名称 ORDER BY 列名称
```

#### 实例：

Orders表：

| Company  | OrderNumber |
| -------- | ----------- |
| IBM      | 3532        |
| W3School | 2356        |
| Apple    | 4698        |
| W3School | 6953        |

使用语句

```sql
SELECT Company,OrderNumber FROM Orders ORDER BY Company,OrderNumber
```

先按公司名排序再按OrderNumber排序（也就是同公司名的再对OrderNumber排一次）

结果：

| Company  | OrderNumber |
| -------- | ----------- |
| Apple    | 4698        |
| IBM      | 3532        |
| W3School | 2356        |
| W3School | 6953        |

**以逆字母顺序显示公司名称再按数字顺序排序**

**DESC降序    ASC升序**

```
SELECT Company,OrderNumber FROM Orders ORDER BY Company DESC,OrderNumber ASC
```

结果：

| Company  | OrderNumber |
| -------- | ----------- |
| W3School | 2356        |
| W3School | 6953        |
| IBM      | 3532        |
| Apple    | 4698        |

**需要注意的是null值得特殊性**

### SQL INSERT INTO 语句

用于向表格中插入语新的行

**语法：**

```sql
INSERT INTO 表名称 VALUES(值1,值2,...)
```

我们也可以指定要插入数据的列

```sql
INSERT INTO 表名称(列1,列2,...) VALUES(值1,值2,...)
```

#### 实例

Persons表

| LastName | FirstName | Address        | City    |
| -------- | --------- | -------------- | ------- |
| Carter   | Thomas    | Changan Street | Beijing |

使用语句：

```sql
INSERT INTO Persons VALUES('Gates','Bill','Xuanwumen 10','Beijing')
```

结果：

| LastName | FirstName | Address        | City    |
| -------- | --------- | -------------- | ------- |
| Carter   | Thomas    | Changan Street | Beijin  |
| Gates    | Bill      | Xuanwumen 10   | Beijing |

**在指定的列插入数据：**

使用语句：

```sql
INSERT INTO Persons(LastName,Address) VALUES('Wilson','Champs-Elysees')
```

结果：

| LastName | FirstName | Address        | City    |
| -------- | --------- | -------------- | ------- |
| Carter   | Thomas    | Changan Street | Beijing |
| Gates    | Bill      | Xuanwumen 10   | Beijing |
| Wilson   |           | Champs-Elysees |         |

### SQL UPDATE语句

UPDATE语句用于修改表中的数据

**语法：**

```sql
UPDATE 表名称 SET 列名称=新值 WHERE 列名称=某值
```

后面的内容用于指定某一列内容

#### 实例

Persons表

| LastName | FirstName | Address        | City    |
| -------- | --------- | -------------- | ------- |
| Carter   | Thomas    | Changan Street | Beijing |
| Gates    | Bill      | Xuanwumen 10   | Beijing |
| Wilson   |           | Champs-Elysees |         |

为Wilson添加他的FirstName

```sql
UPDATE Person SET FirstName='Fred' WHERE LastName='Wilson'
```

| LastName | FirstName | Address        | City    |
| -------- | --------- | -------------- | ------- |
| Carter   | Thomas    | Changan Street | Beijing |
| Gates    | Bill      | Xuanwumen 10   | Beijing |
| Wilson   | Fred      | Champs-Elysees |         |

**更新某一行中的若干列：**

```sql
UPDATE Person SET Address='Zhongshan 23',City='Nanjing' WHERE LastName='Wilson'
```

结果：

| LastName | FirstName | Address        | City    |
| -------- | --------- | -------------- | ------- |
| Carter   | Thomas    | Changan Street | Beijing |
| Gates    | Bill      | Xuanwumen 10   | Beijing |
| Wilson   | Fred      | Zhongshan 23   | Nanjing |

### SQL DELETE 语句

DELETE语句用于删除表中的行

语法：

```sql
DELETE FROM 表名称 WHERE 列名称=值
```

后面的还是用于定位到某一行

#### 实例：

| LastName | FirstName | Address        | City    |
| -------- | --------- | -------------- | ------- |
| Carter   | Thomas    | Changan Street | Beijing |
| Gates    | Bill      | Xuanwumen 10   | Beijing |
| Wilson   | Fred      | Zhongshan 23   | Nanjing |

使用语句：

```sql
DELETE FROM Person WHERE LastName='Wilson'
```

结果：

| LastName | FirstName | Address        | City    |
| -------- | --------- | -------------- | ------- |
| Carter   | Thomas    | Changan Street | Beijing |
| Gates    | Bill      | Xuanwumen 10   | Beijing |

**删除所有行**

DELETE语句可以在不删除表的情况下删除所有的行。

这意味着表的结构、属性和索引都是完整的

**语法：**

```sql
DELETE FROM 表名
```

或者

```sql
DELETE * FROM 表名 
```

## SQL高级

### TOP 子句

TOP子句用于规定要返回的记录的数目

注释：并非所有的数据库系统都支持TOP子句

**SQL Server 语法：**

```sql
SELECT TOP 行数|percent 列名 FROM 表名
```

MySQL和Oracle中的SQL SELECT Top是等价的

**MySQL语法：**

```mysql
SELECT 列名 FROM 表名 LIMIT number
```

**Oracle语法：**

```sql
SELECT 列名 FROM 表名 WHERE ROWNUM<=number
```

#### 实例：

Persons表

| id   | LastName | FirstName | Address        | City     | Year |
| ---- | -------- | --------- | -------------- | -------- | ---- |
| 1    | Adams    | John      | Oxfored Street | London   | 1970 |
| 2    | Bush     | George    | Fifth Avenue   | New York | 1975 |
| 3    | Carter   | Thomas    | Changan Street | Beijing  | 1980 |
| 4    | Gates    | Bill      | Xuanwumen 10   | Beijing  | 1985 |

**SQL TOP 实例：**

希望选取头两条记录

使用语句

```sql
SELECT TOP 2*FROM Persons
```

结果：

| id   | LastName | FirstName | Address        | City     | Year |
| ---- | -------- | --------- | -------------- | -------- | ---- |
| 1    | Adams    | John      | Oxfored Street | London   | 1970 |
| 2    | Bush     | George    | Fifth Avenue   | New York | 1975 |

**SQL TOP PERCENT 实例：**

希望选取50%的记录

使用语句

```sql
SELECT TOP 50 PERCENT*FROM Persons
```

结果：

| id   | LastName | FirstName | Address        | City     | Year |
| ---- | -------- | --------- | -------------- | -------- | ---- |
| 1    | Adams    | John      | Oxfored Street | London   | 1970 |
| 2    | Bush     | George    | Fifth Avenue   | New York | 1975 |

### LIKE 操作符(WHERE)

LIKE操作符用于在WHERE 子句中搜索列中的指定模式

**语法：**

Like操作符常和通配符”%“一起使用进行模糊匹配（%用于占位）不用通配符也可以进行精确查询

```sql
SELECT 列名 FROM 表名 WHERE 列名 LIKE pattern
```

#### 实例：

Persons表：

| id   | LastName | FirstName | Address        | City     | Year |
| ---- | -------- | --------- | -------------- | -------- | ---- |
| 1    | Adams    | John      | Oxfored Street | London   | 1970 |
| 2    | Bush     | George    | Fifth Avenue   | New York | 1975 |
| 3    | Carter   | Thomas    | Changan Street | Beijing  | 1980 |
| 4    | Gates    | Bill      | Xuanwumen 10   | Beijing  | 1985 |

1. 我们希望筛选居住在以“N”开头城市里的人

   使用语句

   ```sql
   SELECT * FROM Persons WHERE City LIKE 'N%'
   ```

   **结果：**

   | id   | LastName | FirstName | Address      | City     | Year |
   | ---- | -------- | --------- | ------------ | -------- | ---- |
   | 2    | Bush     | George    | Fifth Avenue | New York | 1975 |

2. 希望筛选居住在以“g”结尾的城市里的人

   使用语句

   ```sql
   SELECT * FROM Persons WHERE City LIKE '%g'
   ```

   结果：

   | id   | LastName | FirstName | Address        | City    | Year |
   | ---- | -------- | --------- | -------------- | ------- | ---- |
   | 3    | Carter   | Thomas    | Changan Street | Beijing | 1980 |
   | 4    | Gates    | Bill      | Xuanwumen 10   | Beijing | 1985 |

3. 希望选取居住在包含“lon”城市里的人

   使用语句

   ```sql
   SELECT * FROM Persons WHERE City LIKE '%lon%'
   ```

   注意SQL对大小写不敏感

   结果：

   | id   | LastName | FirstName | Address        | City   | Year |
   | ---- | -------- | --------- | -------------- | ------ | ---- |
   | 1    | Adams    | John      | Oxfored Street | London | 1970 |

4. 希望不包含“lon”城市里的人

   使用语句

   ```sql
   SELECT * FROM Persons WHERE City NOT LIKE '%lon%'
   ```

   结果：

   | id   | LastName | FirstName | Address        | City     | Year |
   | ---- | -------- | --------- | -------------- | -------- | ---- |
   | 2    | Bush     | George    | Fifth Avenue   | New York | 1975 |
   | 3    | Carter   | Thomas    | Changan Street | Beijing  | 1980 |
   | 4    | Gates    | Bill      | Xuanwumen 10   | Beijing  | 1985 |

#### SQL 通配符

在搜索数据库中的数据时，SQL通配符可以替代一个或者多个字符

==通配符必须和LIKE运算符一起使用==

| 通配符                       | 描述                           |
| ---------------------------- | ------------------------------ |
| %                            | 代表0个或多个字符              |
| __                           | 仅替代一个字符                 |
| [charlist]                   | 字符列表中的任何单一字符       |
| [^charlist] 或者 [!charlist] | 不在该字符列表中的任何单一字符 |

### IN 操作符(WHERE)

IN 操作符允许我们在WHERE子句中规定多个值

**语法：**

```sql
SELECT 列名 FROM 表名 WHERE 列名 IN (value1,value2,...)
```

### BETWEEN 操作符(WHERE)

BETWEEN操作符在WHERE子句中使用，作用是选取介于两个值之间的数据范围（可以是数值、文本或日期）

**语法：**

BETWEEN...AND...

```sql
SELECT 列名 FROM 表名 WHERE 列名 BETWEEN value1 AND value2
```

要显示不在这个范围的话用NOT操作符

#### 实例：

Persons表

| id   | LastName | FirstName | Address        | City     | Year |
| ---- | -------- | --------- | -------------- | -------- | ---- |
| 1    | Adams    | John      | Oxfored Street | London   | 1970 |
| 2    | Bush     | George    | Fifth Avenue   | New York | 1975 |
| 3    | Carter   | Thomas    | Changan Street | Beijing  | 1980 |
| 4    | Gates    | Bill      | Xuanwumen 10   | Beijing  | 1985 |

向要显示介于"Adams"和"Carter"（不包含）之间的人

使用语句：

```sql
SELECT * FROM Persons WHERE LastName BETWEEN 'Adams' AND 'Carter'
```

结果：

| id   | LastName | FirstName | Address        | City     | Year |
| ---- | -------- | --------- | -------------- | -------- | ---- |
| 1    | Adams    | John      | Oxfored Street | London   | 1970 |
| 2    | Bush     | George    | Fifth Avenue   | New York | 1975 |

==注意：==不同数据库对于它的处理方式是不一样的，有的前闭后开，有些前后都开，也有前后都闭，需要根据不同的数据库来使用

### Alias（别名）

可以为列名称和表名称指定别名

**语法：**

AS

表的 SQL Alias 语法：

```
SELECT 列名 FROM 表名 AS 别名
```

列的 SQL Alias 语法：

```sql
SELECT 列名 AS 别名 FROM 表名
```

#### 实例：

1. 表名别名：

   我们有两个表，分别为“Persons”和“Product_Orders”.我们分别为他们指定别名为“p”和“po”

   现在我们希望列出"John Adams"的所有订单

   使用：

   ```sql
   SELECT po.OrderID,p.LastName,p.FirstName FROM Persons As p,Product_Orders AS po WHERE p.LastName='Adams' AND p.FirstName='John'
   ```

   如果不使用别名需要将缩写全部写出

   *别名是查询程序更易阅读和书写*

2. 列名别名：

   表"Persons"

   | id   | LastName | FirstName | Address        | City     | Year |
   | ---- | -------- | --------- | -------------- | -------- | ---- |
   | 1    | Adams    | John      | Oxfored Street | London   | 1970 |
   | 2    | Bush     | George    | Fifth Avenue   | New York | 1975 |
   | 3    | Carter   | Thomas    | Changan Street | Beijing  | 1980 |
   | 4    | Gates    | Bill      | Xuanwumen 10   | Beijing  | 1985 |

   使用语句：

   ```sql
   SELECT LastName AS Family,FirstName AS Name FROM Peosons
   ```

   结果：

   | Family | Name   |
   | ------ | ------ |
   | Adams  | John   |
   | Bush   | George |
   | Carter | Thomas |
   | Gates  | Bill   |

### JOIN

JOIN 用于根据两个或多个表中的列的关系，从这些表中查询数据

**语法：**

优势为了得到完整的结果，我们需要从多个表中提取结果，这时就需要使用JOIN

数据库中的表可以通过 **Key** 将彼此联系起来。主键（PrimaryKey）是一个列，列值不重复（注意：键值不重复），在表中每个主键的值是唯一的（这样就能在不重复的前提下将表间数据交叉捆绑）

#### 实例

Persons表

| id_P | LastName | FirstName | Address        | City     | Year |
| ---- | -------- | --------- | -------------- | -------- | ---- |
| 1    | Adams    | John      | Oxfored Street | London   | 1970 |
| 2    | Bush     | George    | Fifth Avenue   | New York | 1975 |
| 3    | Carter   | Thomas    | Changan Street | Beijing  | 1980 |
| 4    | Gates    | Bill      | Xuanwumen 10   | Beijing  | 1985 |

Orders表

| id_O | OrderNo | id_P |
| ---- | ------- | ---- |
| 1    | 77895   | 3    |
| 2    | 44678   | 3    |
| 3    | 22456   | 1    |
| 4    | 24562   | 1    |

**注意：**id_P为Persons表的主键，id_O为Orders表的主键，id_P将两个表联系了起来

现在从两个表中提取数据：谁订购了产品，产品号是什么

1. 不使用JOIN

   ```sql
   SELECT Persons.LastName,Persons.FirstName,Orders.OrderNo 
   FROM Persons,Orders 
   WHERE Persons.id_P=Orders.id_P
   ```

2. 使用JOIN

   ```sql
   SELECT Persons.LastName,Persons.FirstName,Orders.OrderNo 
   FROM Persons 
   INNER JOIN Orders 
   ON Persons.id_P=Orders.id_P 
   ORDER BY Persons.LastName
   ```

   这里使用了 INNER JOIN（内连接） ORDER BY为排序

结果：

| LastName | FirstName | OrderNo |
| -------- | --------- | ------- |
| Adams    | John      | 22456   |
| Adams    | John      | 24562   |
| Carter   | Thomas    | 77895   |
| Carter   | Thomas    | 44678   |

#### 不同的JOIN

+ JOIN/INNER JOIN：匹配了才返回行
+ LEFT JOIN：即使右侧没有匹配的也会从左侧返回行出来
+ RIGHT JOIN：即使左侧没有匹配的也会从右侧返回行出来
+ FULL JOIN：只要左右侧表中有的都返回行出来

### UNION 和 UNION ALL 操作符

UNION操作符用于合并多个SELECT语句的结果集

==注意：UNION 内部的 SELECT 语句的列数必须相同，列也必须拥有相似的数据类型==

**语法：**

```sql
SELECT 列1,列2 FROM 表1
UNION
SELECT 列2,列3 FROM 表2
```

列名会使用表1的

**UNION 和 UNION ALL 的区别：**加入表1要显示的列中有 "Jack" 这个人，表2要显示的列中也有这个人，UNION 中只会显示一个，而 UNION ALL 会显示两个

#### 实例：

Employees_China

| E_ID | E_Name    |
| ---- | --------- |
| 01   | Zhang,Hua |
| 02   | Wang,Wei  |

Employees_USA

| E_ID | E_Name      |
| ---- | ----------- |
| 01   | Zhang,Hua   |
| 02   | Bush,George |

列出不同雇员：

```sql
SELECT E_Name FROM Employees_China
UNION
SELECT E_Name FROM Employees_USA
```

结果：

| E_Name      |
| ----------- |
| Zhang,Hua   |
| Wang,Wei    |
| Bush,George |

列出所有雇员：

```
SELECT E_Name FROM Employees_China
UNION ALL
SELECT E_Name FROM Employees_USA
```

### SELECT INTO 语句

SELECT INTO 语句可以用于创建表的备份复件或用于对记录进行存档

它从一个表中选取数据，然后把数据插入另一个表中

**语法：**

你可以把所有的列插入新表

```sql
SELECT * INTO 新表名 [IN 另外的数据库] FROM 旧表名
```

或者只把希望的列插入新表：

```sql
SELECT 列名 INTO 新表名 [IN 另外的数据库] FROM 旧表名
```

同样后面可以跟 WHERE 子句来定位到某一些行

从一个以上的表中选取数据也是可以做到的

```sql
SELECT Persons.LastName,Order.OrderNo
INTO Persons_Order_Backup
FROM Persons INNER JOIN Orders
ON Persons.id_P=Orders.id_P
```

### SQL CREATE DATABASE 语句

CREATE DATABASE 语句用于创建数据库

**语法：**

```sql
CREATE DATABASE 数据库名
```

### CREATE TABLE 语句

CREATE TABLE 语句用于创建数据库中的表

**语法：**

```sql
CREATE TABLE 表名称
(
列名称1 数据类型
列名称2 数据类型
...
)
```

各种数据类型（data_type）：

| 数据类型        | 描述                                                         |
| --------------- | ------------------------------------------------------------ |
| integer(size)   | 仅容纳整数。括号内规定最大位数                               |
| int(size)       |                                                              |
| smallint(size)  |                                                              |
| tinyint(size)   |                                                              |
| decimal(size,d) | 容纳带有小数的数字，size规定最大位数，d规定小数点右侧最大位数 |
| numeric(size,d) |                                                              |
| varchar(size)   | 容纳可变长度的字符串（字母、数字及特殊字符）。括号中规定最大长度 |
|                 |                                                              |
| date(yyyymmdd)  | 容纳日期                                                     |

#### 实例：

```sql
CREATE TABLE Persons
(
id_P int,
LastName varchar(255),
FirstName varchar(255),
Address varchar(255),
Ciry varchar(255)
)
```

然后可以再用 INSERT INTO 语句向表中写入数据

### SQL 约束（Constraints）

约束用于限制加入表的数据的类型

可以再表创建时规定也可以在创建后（通过 ALTER TABLE 语句）

有以下约束：

+ NOT NULL

  强制被约束的列不接受NULL值

  ```sql
  CREATE TABLE Persons
  (
  id_P int NOT NULL,
  LastName varchar(255) NOT NULL,
  FirstName varchar(255),
  Address varchar(255),
  Ciry varchar(255)
  )
  ```

+ UNIQUE

  标记在一个列后表示这个字段的值是唯一的，不能出现相同的值（但是可以是NULL）

  **MySQL：**

  ```mysql
  CREATE TABLE Persons
  (
  id_P int NOT NULL,
  LastName varchar(255) NOT NULL,
  FirstName varchar(255),
  Address varchar(255),
  Ciry varchar(255),
  UNIQUE (id_P)
  )
  ```

  **SQL Server / Oracle / MS Access:**

  ```sql
  CREATE TABLE Persons
  (
  id_P int NOT NULL UNIQUE,
  LastName varchar(255) NOT NULL,
  FirstName varchar(255),
  Address varchar(255),
  Ciry varchar(255)
  )
  ```

  可以联合添加约束：

  联合约束时只有两个字段的值都是一样的才会报错

  ```sql
  CREATE TABLE Persons
  (
  id_P int NOT NULL,
  LastName varchar(255) NOT NULL,
  FirstName varchar(255),
  Address varchar(255),
  Ciry varchar(255),
  UNIQUE (id_P,LastName)
  )
  ```

  **表已经创建后添加UNIQUE约束：**

  ```sql
  ALTER TABLE Persons
  ADD UNIQUE (id_P)
  ```

  命名UNIQUE约束并定义联合约束：

  ```sql
  ALTER TABLE Persons
  ADD CONSTRAINT uc_PersonID UNIQUE (id_P,Last Name)
  ```

  **撤销UNIQUE约束：**

  MySQL：

  ```mysql
  ALTER TABLE Persons
  DROP INDEX uc_PersonID
  ```

  SQL Server / Oracle / MS Access：

  ```sql
  ALTER TABLE Persons
  DROP CONSTRAINT uc_PersonID
  ```

  

+ PRIMARY KEY

  和 UNIQUE 一样均为列或列集合提供了唯一性的保证

  PRIMARY KEY 拥有自定义的 UNIQUE 约束==（每个表只能有一个PRIMARY KEY约束）==

  PRIMARY KEY 约束中的列不接受空值（经常用于标识主键）

  **MySQL：**

  ```mysql
  CREATE TABLE Persons
  (
  id_P int NOT NULL,
  LastName varchar(255) NOT NULL,
  FirstName varchar(255),
  Address varchar(255),
  Ciry varchar(255),
  PRIMARY KEY (id_P)
  )
  ```

  **SQL Server / Oracle / MS Access：**

  ```sql
  CREATE TABLE Persons
  (
  id_P int NOT NULL PRIMARY KEY,
  LastName varchar(255) NOT NULL,
  FirstName varchar(255),
  Address varchar(255),
  Ciry varchar(255),
  )
  ```

  **联合约束：**

  同样，联合约束只有在多列值完全一样时才会报错

  ```sql
  CREATE TABLE Persons
  (
  id_P int NOT NULL,
  LastName varchar(255) NOT NULL,
  FirstName varchar(255),
  Address varchar(255),
  Ciry varchar(255),
  PRIMARY KEY (id_P,LastName)
  )
  ```

  **表已经创建后添加 PRIMARY KEY 约束：**

  ```sql
  ALTER TABLE Persons
  ADD PRIMARY KEY (id_P)
  ```

  命名该约束并定义联合约束：

  ```sql
  ALTER TABLE Persons
  ADD CONSTRAINT pk_PersonID PRIMARY KEY (id_P,LastName)
  ```

  注释：如果使用 ALTER TABLE 语句添加主键，必须在表首次创建时将主键生命为不包含 NULL 值

  **撤销 PRIMARY KEY 约束**

  MySQL：

  ```mysql
  ALTER TABLe Persons
  DROP PRIMARY KEY
  ```

  SQL Server / Oracle / MS Access：

  ```[
  ALTER TABLe Persons
  DROP CONSTRAINT pk_PersonID
  ```

  

+ FOREIGN KEY

  FOREIGN KEY 用于预防破坏表之间连接的动作，也能放置非法数据插入外键列，因为它必须是它指向的那个表中的值之一

  ==一个表中的 FOREIGN KEY 指向另一个表中的 PRIMARY KEY==

  还是用Persons表和Orders表做样例

  在Orders表创建时为 "id_P" 列创建 FOREIGN KEY 约束

  **MySQL：**

  ```mysql
  CREATE TABLE Orders
  (
  id_O int NOT NULL,
  OrderNo int NOT NULL,
  id_P int,
  PRIMARY KEY (id_O),
  FOREIGN KEY (id_P) REFERENCES Persons (id_P)
  )
  ```

  **SQL Server / Oracle / MS Access：**

  ```sql
  CREATE TABLE Orders
  (
  id_O int NOT NULL PRIMARY KEY,
  OrderNo int NOT NULL,
  id_P int FOREIGN KEY REFERENCES Persons (id_P),
  )
  ```

  命名该约束以及联合命名约束：

  ```sql
  CREATE TABLE Orders
  (
  id_O int NOT NULL,
  OrderNo int NOT NULL,
  id_P int,
  PRIMARY KEY (id_O),
  CONSTRAINT fk_PerOrders FOREIGN KEY (id_P)
  REFERENCES Persons(id_P)
  )
  ```

  **表已经创建后添加 FOREIGN KEY 约束：**

  ```sql
  ALTER TABLE Orders
  ADD FOREIGN KEY (id_P) REFERENCES Persons(id_P)
  ```

  命名该约束以及联合约束

  ```sql
  ALTER TABLE Orders
  ADD CONSTRAINT fk_PerOrders
  FOREIGN KEY (id_P)
  REFERENCES Persons(id_P)
  ```

  **撤销 FOREIGN KEY 约束：**

  MySQL：

  ```mysql
  ALTER TABLE Orders
  DROP FOREIGN KEY fk_PerOrders
  ```

  SQL Server / Oracle / MS Access：

  ```sql
  ALTER TABLE Orders
  DROP CONSTRAINT fk_PerOrders
  ```

  

+ CHECK

  用于限制列中值的范围

  **MySQL：**

  ```mysql
  CREATE TABLE Persons
  (
  id_P int NOT NULL,
  LastName varchar(255) NOT NULL,
  FirstName varchar(255),
  Address varchar(255),
  Ciry varchar(255),
  CHECK (id_P>0)
  )
  ```

  **SQL Server / Oracle / MS Access：**

  ```sql
  CREATE TABLE Persons
  (
  id_P int NOT NULL CHECK (id_P>0),
  LastName varchar(255) NOT NULL,
  FirstName varchar(255),
  Address varchar(255),
  Ciry varchar(255)
  )
  ```

  命名该约束或者为多列定义CHECK约束：

  ```sql
  CREATE TABLE Persons
  (
  id_P int NOT NULL,
  LastName varchar(255) NOT NULL,
  FirstName varchar(255),
  Address varchar(255),
  Ciry varchar(255),
  CONSTRAINT chk_Person CHECK (id_P>0 AND City ='Sandnes')
  )
  ```

  **表已经创建后添加 FOREIGN KEY 约束：**

  ```sql
  ALTER TABLE Persons
  ADD CHECK (id_P>0)
  ```

  命名及为多列定义

  ```sql
  ALTER TABLE Persons
  ADD CONSTRAINT chk_Person CHECK (id_P>0 AND City='Sandnes')
  ```

  **撤销 CHECK 约束**

  MySQL：

  ```mysql
  ALTER TABLE Persons
  DROP CHECK chk_Person
  ```

  SQL Server / Oracle / MS Access：

  ```sql
  ALTER TABLE Persons
  DROP CONSTRAINT chk_Person
  ```

  

+ DEFAULT

  用于向列中插入默认值

  ```sql
  CREATE TABLE Persons
  (
  id_P int NOT NULL,
  LastName varchar(255) NOT NULL,
  FirstName varchar(255),
  Address varchar(255),
  Ciry varchar(255) DEFAUlT 'Sandnes'
  )
  ```

  通过类似`GERTATE()`这样的函数，DEFAULT 约束也可以用于插入系统值：

  ```sql
  CREAT TABLE Orders
  (
  id_O int NOT NULL,
  OrderNo int NOT NULL,
  id_P int,
  OrderDate date DEFAULT GETDATE()
  )
  ```

  **表已存在创建 DEFAULT 约束：**

  MySQL：

  ```mysql
  ALTER TABLE Persons
  ALTER City SET DEFAULT 'Sandnes'
  ```

  SQL Server / Oracle / MS Access：

  ```sql
  ALTER TABLE Persons
  ALTER COLUMN City SET DEFAULT 'Sandnes'
  ```

  **撤销 DEFAULT 约束：**

  MySQL：

  ```mysql
  ALTER TABLE Persons
  ALTER City DROP DEFAULT
  ```

  SQL Server / Oracle / MS Access：

  ```sql
  ALTER TABLE Persons
  ALTER COLUMN City DROP DEFAULT
  ```


### CREATE INDEX 语句（索引）

用于在表中创建索引。这样就可以不用遍历整个表找到数据

用户无法看到索引，它们只能被用来加速 搜索 / 查询

**注释：**更新一个包含索引的表需要花费更多的时间（索引本身也需要更新），因此我们应当只在常常被搜索的列（以及表）上面创建索引

**语法：**

CREATE INDEX 语法：

 在表上创建一个索引（允许使用重复的值）

```sql
CREATE INDEX 索引名 ON 表名 (列名)
```

注释：给列创建索引需要定位到它的表

CREATE UNIQUE INDEX 语法：

在表是哪个创建一个唯一的索引（不允许重复值）

```sql
CREATE UNIQUE INDEX 索引名 ON 表名 (列名)
```

#### 实例：

在 Persons 表的 LastName 列，创建名为 "PersonIndex" 的索引

```sql
CREATE INDEX PersonIndex ON Person (LastName)
```

如果希望以 **降序** 排列某个列中的值，可以使用 DESC 保留字（列名称后）

```sql
CREATE INDEX PersonIndex ON Person (LastName DESC)
```

注释：默认为升序（ASC）

希望索引不止一个列：

```sql
CREATE INDEX PersonIndex ON Person (LastName,FirstName)
```

### 撤销索引、表以及数据库

通过使用 DROP 语句可以简单地进行删除

**DROP INDEX 语句：**

删除表格中的索引

+ Microsoft SQLjet（以及 Microsoft Access）

  ```sql
  DROP INDEX 索引名 ON 表名
  ```

+ MS SQL Server

  ```mssql
  DROP INDEX table_name.index_name
  ```

+ IBM DB2 和 Oracle

  ```sql
  DROP INDEX index_name
  ```

+ MySQL

  ```mysql
  ALTER TABLE table_name DROP INDEX index_name
  ```

**DROP TABLE 语句：**

删除表

```sql
DROP TABLE 表名称
```

**DROP DATABASE 语句：**

删除数据库

```sql
DROP DATABASE 数据库名称
```

**TRUNCATE TABLE 语句：**

只删除掉表中的数据

```sql
TRUNCATE TABLE 表名称
```

### ALTER TABLE 语句

用于在已有表中添加、修改或者删除列

**语法：**

+ 添加列：

  ```sql
  ALTER TABLE table_name
  ADD column_name datatype
  ```

+ 删除列：

  ```sql
  ALTER TABLE table_name
  DROP COLUMN column_name
  ```

  注释：某些数据库不允许这种方式删除列

+ 修改数据类型：

  ```sql
  ALTER TABLE table_name
  ALTER COLUMN column_name datatype
  ```

### AUTO INCREMENT 字段

它会在新记录插入时生成一个唯一的数字

**语法：**

+ 用于MySQL：

  MySQL 使用 AUTO_INCREMENT 关键字执行该任务

  开始值为1，每条记录 +1

  将 Persons 表的 P_id 列定义为 auto-increment 主键

  ```mysql
  CREATE TABLE Persons
  (
  P_id int NOT NULL AUTO_INCREMENT,
  LastName varchar(255) NOT NULL,
  FirstName varchar(255),
  Address varchar(255),
  Ciry varchar(255),
  PRIMARY KEY (P_id)
  )
  ```

  *以其他值起始：*

  ```mysql
  ALTER TABLE Persons AUTO_INCREMENT=100
  ```

  在 Persons 表中插入新记录时不需要为 P_id 列添加数据

+ 用于SQL Server：

  使用 IDENTITY 关键字执行该任务

  ```mssql
  CREATE TABLE Persons
  (
  P_id int NOT NULL IDENTITY,
  LastName varchar(255) NOT NULL,
  FirstName varchar(255),
  Address varchar(255),
  Ciry varchar(255)
  )
  ```

  起始值依然是1，递增1

  如果要它20起始递增10：将 IDENTITY 修改为 `IDENTITY(20,10)`

+ Access：

  使用 AUTOINCREMENT 关键字来执行该任务

  ```sql
  CREATE TABLE Persons
  (
  P_id int NOT NULL AUTOINCREMENT,
  LastName varchar(255) NOT NULL,
  FirstName varchar(255),
  Address varchar(255),
  Ciry varchar(255)
  )
  ```

  开始值1，递增1

  要开始20，递增10：将 AUTOINCREMENT 修改为 AUTOINCREMENT(20,10)

+ Oracle：

  Oracle 中，代码稍微复杂一点

  必须通过 sequence 来创建 auto-increment 字段

  ```sql
  CREATE SEQUENCE seq_person
  MINVALUE 1
  START WITH 1
  INCREMENT BY 1
  CACHE 10
  ```

  1起始，1递增。该对象缓存10个值以提高性能

  插入记录时需要使用`nextval`函数（从seq__person 序列中取回下一个值）

  ```sql
  INSERT INTO Persons (P_ld,FirstName,LastName)
  VALUES (seq_person.nextval,'Lars','Monsen')
  ```


### View（视图）

可视化的表（基于结果集）

CREATE VIEW 语法：

```sql
CREATE VIEW view_name AS
SELECT column_name
FROM table_name
WHERE condition
```

注释：视图总是显示最近的数据。每当用户查询视图时，数据库引擎通过使用 SQL 语句来重建数据。

#### 实例：

样本数据库 Northwind 有视图 "Current Product List" 会从 Products 表列出所有正在使用的产品

用以下语句创建该视图

```sql
CREATE VIEW [Current Product List] AS
SELECT ProductID,ProductName
FROM Products
WHERE Discontinued=No
```

我们可以查询到这个视图

```sql
SELECT * FROM [Current Product List]
```

Northwind 样本数据库的另一个视图会选取 Products 表中所有单位价格高于平均单位价格的产品

```sql
CREATE VIEW [Products Above Average Price] AS
SELECT ProductName,UnitPrice
FROM Products
WHERE UnitPrice>(SELECT AVG(UnitPrice) FROM Products)
```

查询该视图

```sql
SELECT * FROM [Products Above Average Price]
```

*从另一个视图那里获取数据*

还是该数据库的一个视图实例会计算在1997年每个种类的销售总数。它会从另一个名为 "Product Sales for 1997" 的视图那里获取数据

```sql
CREATE VIEW [Category Sales For 1997] AS
SELECT DISTINCT CatrgoryName,Sum(ProductSales) AS CategorySales
FROM [Product Sales for 1997]
GROUP BY CategoryName
```

查询：

```sql
SELECT * FROM [Category Sales For 1997]
```

也可以用WHERE指定查看的行

```sql
SELECT * FROM [Category Sales For 1997]
WHERE CategoryName='Beverages'
```

#### 更新视图

```sql
CREATE OR REPLACE VIEW view_name AS
SELECT column_name
FROM table_name
WHERE condition
```

希望向 "Current Product List" 视图添加 "Category" 列

```sql
CREATE VIEW [Current Product List] AS
CELECT ProductID,ProductName,Category
FROM Products
WHERE Discontinues=No
```

#### 撤销视图：

通过 DROP VIEW 命令来删除视图

```sql
DROP VIEW view_name
```

### 日期 Date：

#### Date函数

MySQL Date 函数：

| 函数          | 描述                                |
| ------------- | ----------------------------------- |
| NOW()         | 返回当前的日期和时间                |
| CURDATE()     | 返回当前的日期                      |
| CURTIME()     | 返回当前的时间                      |
| DATE()        | 提取日期或日期/时间表达式的日期部分 |
| EXTRACT()     | 返回日期/时间按的单独部分           |
| DATE_ADD()    | 给日期添加指定的时间间隔            |
| DATE_SUB()    | 从日期减去指定的时间间隔            |
| DATEDIFF()    | 返回两个日期之间的天数              |
| DATE_FORMAT() | 用不同的格式显示日期/时间           |

SQL Server Date 函数

| 函数       | 描述                             |
| ---------- | -------------------------------- |
| GETDATE()  | 返回当前的日期和时间             |
| DATEPART() | 返回日期/时间的单独部分          |
| DATEADD()  | 在日期中添加或减去指定的时间间隔 |
| DATEDIFF() | 返回两个日期之间的时间           |
| CONVERT()  | 用不同的格式显示日期/时间        |

#### Date 数据类型

MySQL：

+ DATE：格式 YYYY-MM-DD
+ DATETIME：格式 YYYY-MM-DD HH:MM:SS
+ TIMESTAMP：格式 YYY-MM-DD HH:MM:SS
+ YEAR：格式 YYYY或YY

SQL Server：

+ DATE：格式 YYYY-MM-DD
+ DATETIME：格式 YYYY-MM-DD HH:MM:SS
+ SMALLDATETIME：格式 YYYY-MM-DD HH:MM:SS
+ TIMESTAMP：格式 唯一的数字

#### 实例：

有个Orders表

| OrderId | ProductName  | OrderDate  |
| ------- | ------------ | ---------- |
| 1       | computer     | 2008-12-26 |
| 2       | printer      | 2008-12-26 |
| 3       | electrograph | 2008-11-12 |
| 4       | telephone    | 2008-10-19 |

使用语句：

```sql
SELECT * FROM Orders WHERE OrderDate="2008-12-26"
```

结果：

| OrderId | ProductName | OrderDate  |
| ------- | ----------- | ---------- |
| 1       | computer    | 2008-12-26 |
| 2       | printer     | 2008-12-26 |

**注意：**如果时间部分为这样的形式：2020-12-26 16:23:55 那么用上面的语句是查询不到的（数据类型不一样）

==提示：==如果希望查询简单且更易维护，那么不要在日期中使用时间部分！！！

### NULL 值处理

NULL 值是遗漏的未知数据，默认地，表的列可以存放 NULL 值

使用 IS NULL 和 IS NOT NULL 操作符（无法用比较运算符测试 NULL 值）

Persons表：

| id   | LastName | FirstName | Address      | City     |
| ---- | -------- | --------- | ------------ | -------- |
| 1    | Adams    | John      |              | London   |
| 2    | Bush     | George    | Fifth Avenue | New York |
| 3    | Carter   | Thomas    |              | Beijing  |

匹配 NULL 值记录：

```sql
SELECT LastName,FirstName,Address FROM Persons
WHERE Address IS NULL
```

结果：

| LastName | FirstName | Address |
| -------- | --------- | ------- |
| Adams    | John      |         |
| Carter   | Thomas    |         |

匹配非 NULL 值记录：

```sql
SELECT LastName,FirstName,Address FROM Persons
WHERE Address IS NOT NULL
```

#### NULL 函数

ISNULL()、NVL()、IFNULL() 和 COALESCE() 函数

ISNULL() 函数用于规定怎么处理 NULL 值（这个函数是微软里的），其他的函数是同样的效果

+ SQL Server / MS Access：

  ```mssql
  SELECT ProductName,UnitPrice*(UnitsInStock+ISNULL(UnitsOnOrder,0))
  FROM Products
  ```

  这里如果 UnitsOnOrder 的值为1，那么 ISNULL 函数就会将其当成 0 处理（返回0）

+ Oracle：

  它没有 ISNULL 函数，但是可以用 NVL() 函数来达到同样的效果

  ```sql
  SELECT ProductName,UnitPrice*(UnitsInStock+NVL(UnitsOnOrder,0))
  FROM Products
  ```

+ MySQL：

  工作方式与微软的有点不同

  使用 IFNULL() 函数

  ```mysql
  SELECT ProductName,UnitPrice*(UnitsInStock+IFNULL(UnitsOnOrder,0))
  FROM Products
  ```

  或者使用 COALESCE() 函数

  ```mysql
  SELECT ProductName,UnitPrice*(UnitsInStock+COALESCE(UnitsOnOrder,0))
  FROM Products
  ```

## SQL数据类型

Microsoft Access、MySQL、SQL Server 所使用的数据类型和范围

### Microsoft Access

![](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202112151119106.jpg)

### MySQL 数据类型

MySQL 中有三种主要的类型：文本、数字和日期/时间类型

1. Text 类型：

   ![](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202112151125438.jpg)

2. Number 类型

   ![](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202112151126854.jpg)

   这些整数类型拥有额外的选项 UNSIGNED。通常整数可以是负数或者正数。如果添加 UNSIGNED 属性，那么范围将从 0 开始。

3. Date类型

   ![](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202112151130612.jpg)

   注意：DATETIME() 和 TIMESTAMP() 返回相同的格式，但是它们的工作方式很不同

   在 INSERT 或 UPDATE 查询中，TIMESTAMP 自动把自身设置为当前的时间和日期

   TIMESTAMP 也接收不同的日期格式，如：

   YYYYMMDDHHMMSS、YYMMDDHHMMSS、YYYYMMDD 或 YYMMDD。

### SQL Server 数据类型

1. Character 字符串:

   ![](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202112151138428.jpg)

2. Unicode 字符串：

   ![](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202112151140683.jpg)

3. Binary 类型：

   ![](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202112151141307.jpg)

4. Number类型

   ![](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202112151142047.jpg)

5. Date 类型

   ![](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202112151143871.jpg)

6. 其他数据类型

   ![](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202112151144893.jpg)

## SQL 函数

SQL 拥有很多可用于‘计数和计算的内建函数

**函数的语法：**

```sql
SELECT function(列) FROM 表
```

注意：一整个这样的表达式是这个函数

比如 AVG() 函数来找到 OrderPrice 值高于平均值的语句：

当然这个可以使用 HAVING 来实现

```sql
SELECT Customer FROM Orders
WHERE OrderPrice>(SELECT AVG(OrderPrice) FROM Orders)
```



**函数的类型：**

+ Aggregate 函数（合计）
+ Scalar 函数（面向某个单一的值，并范围一个单一的值）

### 合计函数（Aggregate functions）

面向一系列的值，并返回单一的值

**注释：**如果在 SELECT 语句的项目列表中的众多其他表达式中使用 SELECT 语句，则这个 SELECT 必须使用 GROUP BY 语句

#### MS Access 中的合计函数

![](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202112151929906.jpg)

#### SQL Server 中的合计函数

![](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202112151933980.jpg)

### Scalar 函数

这个用法和上面是一样的（它一对一）

#### Ms Access 中的 Scalar 函数

![](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202112151936843.jpg)

==注意：==如果用的是 SQL Server 数据库，请使用 getdate() 函数获取当前日期和时间

### GROUP BY 语句

GROUP BY 语句用于结合合计函数，根据一个或多个列对结果集进行分组

**语法：**

```sql
SELECT column_name,aggregate_function(column_name)
FROM table_name
WHERE column_name operator value
GROUP BY column_name
```

实例：

Orders表：

| O_Id | OrderDate  | OrderPrice | Customer |
| ---- | ---------- | ---------- | -------- |
| 1    | 2008/12/29 | 1000       | Bush     |
| 2    | 2008/11/23 | 1600       | Carter   |
| 3    | 2008/10/05 | 700        | Bush     |
| 4    | 1008/09/28 | 300        | Bush     |
| 5    | 2008/08/06 | 2000       | Adams    |
| 6    | 2009/02/21 | 100        | Carter   |

希望查到每个用户的总订单金额

需要用 GROUP BY 语句对客户进行组合

```sql
SELECT Customer,SUM(OrderPrice) FROM Orders
GROUP BY Customer
```

结果：

| Customer | SUM(OrderPrice) |
| -------- | --------------- |
| Bush     | 2000            |
| Carter   | 1700            |
| Adams    | 2000            |

也可以对一个以上的列应用 GROUP BY 语句（全部相同就分到一组）

```sql
SELECT Customer,OrderDate,SUM(OrderPrice) FROM Orders
GROUP BY Customer,OrderDate
```

### HAVING 子句

WHERE 子句里面无法使用合计函数，多余新添了 HAVING 子句

**语法：**

```sql
SELECT column_name,aggregate_function(column name)
FROM table_name
WHERE column_name operator value
GROUP BY column_name
HAVING aggregate_function(column name) operator value
```

**实例：**

Orders表

| O_Id | OrderDate  | OrderPrice | Customer |
| ---- | ---------- | ---------- | -------- |
| 1    | 2008/12/29 | 1000       | Bush     |
| 2    | 2008/11/23 | 1600       | Carter   |
| 3    | 2008/10/05 | 700        | Bush     |
| 4    | 1008/09/28 | 300        | Bush     |
| 5    | 2008/08/06 | 2000       | Adams    |
| 6    | 2009/02/21 | 100        | Carter   |

希望查找订单总金额少于2000的客户

```sql
SELECT Customer,SUM(OrderPrice) FROM Orders
GROUP BY Customer
HAVING SUM(OrderPrice)<2000
```

结果：

| Customer | SUM(OrderPrice) |
| -------- | --------------- |
| Carter   | 1700            |

### FORMAT() 函数

FORMAT() 函数用于对字段显示进行格式化

实例：

Products 表：

| Prod_Id | ProductName | Unit   | UnitPrice |
| ------- | ----------- | ------ | --------- |
| 1       | gold        | 1000 g | 32.35     |
| 2       | silver      | 1000 g | 11.56     |
| 3       | copper      | 1000 g | 6.85      |

现在我们希望显示每天日期所对应的名称和价格（日期格式为“YYYY-MM-DD”）

```sql
SELECT ProductName,UnitPrice,FORMAT(NOW(),'YYYY-MM-DD') as PerDate
FROM Products
```

| ProductName | UnitPrice | PerDate    |
| ----------- | --------- | ---------- |
| gold        | 32.35     | 2021-12-15 |
| silver      | 11.56     | 2021-12-15 |
| copper      | 6.85      | 2021-12-15 |

## 快速查询表

![](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202112152037932.jpg)
