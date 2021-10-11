const http = require('http');
const fs = require('fs');
const qs = require('querystring');

const MY_PORT = 3000;
const MY_HOST = `http://localhost:${MY_PORT}`;

http.createServer((req, res) => {
    const url = new URL(req.url, MY_HOST);
    if (url.pathname.includes('/api')) {
        dataBandle(req, res, url);
    } else
        staticBandle(req, res, url);
}).listen(3000, () => {
    console.log("服务器成功开启")
})

function dataBandle(req, res, url) {
    if (req.method === "GET") {
        const obj = qs.parse(url.search.slice(1));
        fn(req, res, obj);
    } else if (req.method === "POST") {
        str = "";
        req.on('data', (b) => {
            str += b;
        })
        req.on('end', () => {
            const obj = qs.parse(str);
            fn(req, res, obj);
        })
    }
}

function fn(req, res, obj) {
    switch (obj.type) {
        case 'xsg':
            xsg(req, res, obj);
            break;
        case 'zxwz':
            zxwz(req, res, obj);
            break;
        case 'product':
            product(req, res, obj);
            break;
        case 'more':
            more(req, res, obj);
            break;
        case 'brand':
            brand(req, res, obj);
            break;
        case 'banner':
            banner(req, res, obj);
            break;
        case 'merchant':
            merchant(req, res, obj);
            break;
        case 'news':
            news(req, res, obj);
            break;
        case 'read':
            reads(req, res, obj);
            break;
        case 'eva':
            eva(req, res, obj);
            break;
        case 'link':
            link(req, res, obj);
            break;
        case 'sitems':
            sitems(req, res, obj);
            break;
        case 'listPro':
            listPro(req, res, obj);
            break;
        default:
            error(req, res);
    }
}

function rf(url, res, type) {
    fs.readFile(url, 'utf-8', (err, data) => {
        let obj = {};
        if (err) {
            obj.code = 1;
            obj.title = type + "数据获取失败";
            obj.data = {}
        } else {
            obj.code = 0;
            obj.title = type + "数据获取成功";
            obj.data = JSON.parse(data);
        }
        res.write(JSON.stringify(obj));
        res.end()
    })
}

function listPro(req, res, ajaxData) {
    rf('./databases/detail.json', res, "列表页产品");

}

function sitems(req, res, ajaxData) {
    rf('./databases/list.json', res, "列表页");
}

function link(req, res, ajaxData) {
    rf('./databases/link.json', res, "链接");
}

function eva(req, res, ajaxData) {
    rf('./databases/evaluate.json', res, "评价");
}

function news(req, res, ajaxData) {
    rf('./databases/news.json', res, "新闻")
}

function reads(req, res, ajaxData) {
    rf('./databases/read.json', res, "阅读")

}

function merchant(req, res, ajaxData) {
    rf('./databases/merchant.json', res, "推荐商家")
}

function banner(req, res, ajaxData) {
    rf('./databases/banner.json', res, "轮播图")
}

function xsg(req, res, data) {
    rf('./databases/xsg.json', res, "限时购")
}

function zxwz(req, res, ajaxData) {
    rf('./databases/doctor.json', res, "在线问诊")

}

function product(req, res, ajaxData) {
    rf('./databases/product.json', res, "产品")
}

function more(req, res, ajaxData) {
    rf('./databases/more.json', res, "更多内容")
}

function brand(req, res, ajaxData) {
    rf('./databases/brand.json', res, "品牌信息")
}

function error(req, res) {
    res.write("NOTFOUND");
    res.end();
}

function staticBandle(req, res, url) {
    fs.readFile('./dist' + url.pathname, (err, data) => {
        if (err)
            res.write('NOTFOUND');
        else {
            res.write(data);
        }
        res.end()
    })
}