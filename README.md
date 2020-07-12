# Bangumi API 爬虫

基于[bangumi-data](https://github.com/bangumi-data/bangumi-data)中的bangumi id，使用[番组计划官方API](https://github.com/bangumi/api)进行数据爬取的爬虫。

因为Bangumi的API有CORS限制，所以写了这个爬虫+利用(~~白嫖~~)jsdelivr cdn加速给我自己写的番剧网站使用。

因为使用GitHub Actions来更新数据就直接叫做bangumi_ga了。（很随便的命名方式。

## 使用注意 :warning:

- :warning: 请不要fork，因为GitHub Actions也会fork过去。那样会给番组计划的服务器造成压力；又或者请求过多，有可能触发拒绝请求的保护机制，造成workflow失败。

- 数据不是实时，利用GitHub Actions每天爬取最新的数据。与最新的数据最大会有一天的时差。(更新时间为GMT时区凌晨时分延后一点点)

- 数据不是番组计划全站的数据，只包含bangumi-data里面有bangumi id的。bangumi data里没有bangumi id的数据不会爬取。据我所知，在更新这readme时的最新版本`0.3.30`中是有1个没有bangumi id的。

- 番剧计划的API中，subject数据分small, medium, large三种大小。本爬虫只爬取large大小的数据。

## 使用方法

使用方法是照搬[Bangumi-Subject](https://github.com/czy0729/Bangumi-Subject)的。(Actions是抄[bangumi-onair](https://github.com/ekibun/bangumi_onair) (面向Ctrl+C Ctrl+V编程

```bash
https://cdn.jsdelivr.net/gh/developer-haku/bangumi_ga@latest/data/{id / 100 (去小数点)}/{id}.json
```

Javascript 例：

```javascript
`https://cdn.jsdelivr.net/gh/developer-haku/bangumi_ga@latest/data/${parseInt(parseInt(id) / 100)}/${id}.json`
```

以id`276788`为例生成出以下url

```bash
https://cdn.jsdelivr.net/gh/developer-haku/bangumi_ga@latest/data/2767/276788.json
```

数据的格式就到[番组计划官方API](https://github.com/bangumi/api)的文档中进行查看。
