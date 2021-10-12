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
        case 'register':
            register(req, res, obj);
            break;
        case 'login':
            login(req, res, obj);
            break;
        case 'detail':
            detail(req, res, obj);
            break;
        case 'getGoods':
            getGoods(req, res, obj);
            break;
        default:
            error(req, res);
    }
}

function getGoods(req, res, ajaxData) {
    rf('./databases/detail.json', res, "购物车数据");
}

function detail(req, res, ajaxData) {
    fs.readFile("./databases/detail.json", "utf-8", (err, data) => {
        let obj = {};
        if (err) {
            obj.code = 1;
            obj.title = "产品详情数据获取失败";
            obj.data = {}
        } else {
            obj.code = 0;
            obj.title = "产品详情数据获取成功";
            const idx = JSON.parse(data).findIndex(value => value.ID === ajaxData.id)
            obj.data = JSON.parse(data)[idx];
        }
        res.write(JSON.stringify(obj));
        res.end()
    })
}

function login(req, res, ajaxData) {
    fs.readFile("./databases/user.json", "utf-8", (err, data) => {
        const userObj = err ? [] : (data ? JSON.parse(data) : [])
        const obj = {};
        const idx = userObj.findIndex(value => value.username === ajaxData.username);
        if (idx === -1) {
            obj.code = 1;
            obj.title = "登录失败，该用户不存在！";
            obj.data = "NOTDATA";
            res.write(JSON.stringify(obj));
            res.end();
        } else {
            if (userObj[idx].password === ajaxData.password) {
                obj.code = 0;
                obj.title = "登录成功";
                obj.data = userObj[idx];
            } else {
                obj.code = 2;
                obj.title = "登录失败，密码不正确！";
                obj.data = "Incorrect Password";
            }
            res.write(JSON.stringify(obj));
            res.end();
        }
    })
}

function register(req, res, ajaxData) {
    fs.readFile("./databases/user.json", "utf-8", (err, data) => {
        const userObj = err ? [] : (data ? JSON.parse(data) : [])
        const obj = {};
        if (userObj.some(value => value.username === ajaxData.username)) {
            obj.code = 0;
            obj.title = "注册失败，用户名重复！";
            obj.data = {};
            res.write(JSON.stringify(obj));
            res.end();
        } else {
            userObj.push({
                username: ajaxData.username,
                password: ajaxData.password,
                phoneNumber: ajaxData.phoneNumber
            })
            fs.writeFile("./databases/user.json", JSON.stringify(userObj), err => {
                obj.code = 1;
                obj.title = "注册成功";
                obj.data = {
                    username: ajaxData.username,
                    password: ajaxData.password,
                    phoneNumber: ajaxData.phoneNumber
                };

                res.write(JSON.stringify(obj));
                res.end();
            })
        }
    })
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