const requestConfig = {
    // request_prefix: 'http://10.35.4.106:9999',
    request_prefix:'http://192.168.43.2:9999',
    fetch_menu: '/fzzx/jjd/diclist', //初始化选择菜单
    fetch_list: '/fzzx/jjd/data/', //查询数据
    fetch_list_byid: '/fzzx/jjd/selectid?id=', //根据id查询数据
    del_case_byid: '/fzzx/jjd/deleteid?id=', //根据id删除一条记录
    edit: '/fzzx/jjd/edit', //编辑，id不为空就是更新
    valcode_img: '/kaptch', //验证码图片
    login_submit: '/login_submit' //登录
}

export { requestConfig }
