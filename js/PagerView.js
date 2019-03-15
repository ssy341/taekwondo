/**
 * @author ideawu@163.com
 * @class
 * 分页控件, 使用原生的JavaScript代码编写. 重写onclick方法, 获取翻页事件,
 * 可用来向服务器端发起AJAX请求.
 *
 * @param {String} id: HTML节点的id属性值, 控件将显示在该节点中.
 * @returns {PagerView}: 返回分页控件实例.
 *
 * @example
 * ### HTML:
 * &lt;div id="pager"&gt;&lt;/div&gt;
 *
 * ### JavaScript:
 * var pager = new PagerView('pager');
 * pager.index = 3; // 当前是第3页
 * pager.size = 16; // 每页显示16条记录
 * pager.itemCount = 100; // 一共有100条记录
 *
 * pager.onclick = function(index){
 *	alert('click on page: ' + index);
 *	// display data...
 * };
 *
 * pager.render();
 * 
 */
var PagerView = function(id,divid,dir){
	var self = this;
	this.id = id;
    this.containerDiv = divid;
    this._dir = dir;

	this._pageCount = 0; // 总页数
	this._start = 1; // 起始页码
	this._end = 1; // 结束页码

	/**
	 * 当前控件所处的HTML节点引用.
	 * @type DOMElement
	 */
	this.container = null;
	/**
	 * 当前页码, 从1开始
	 * @type int
	 */
	this.index = 1;
	/**
	 * 每页显示记录数
	 * @type int
	 */
	this.size = 5;
	/**
	 * 显示的分页按钮数量
	 * @type int
	 */
	this.maxButtons = 9;
	/**
	 * 记录总数
	 * @type int
	 */
	this.itemCount = 0;

	/**
	 * 控件使用者重写本方法, 获取翻页事件, 可用来向服务器端发起AJAX请求.
	 * 如果要取消本次翻页事件, 重写回调函数返回 false.
	 * @param {int} index: 被点击的页码.
	 * @returns {Boolean} 返回false表示取消本次翻页事件.
	 * @event
	 */
	this.onclick = function(index){
		return true;
	};

	/**
	 * 内部方法.
	 */
	this._onclick = function(index){
		var old = self.index;

		self.index = index;
		if(self.onclick(index) !== false){
			self.render();
		}else{
			self.index = old;
		}
	};

	/**
	 * 在显示之前计算各种页码变量的值.
	 */
	this._calculate = function(){
		self._pageCount = parseInt(Math.ceil(self.itemCount / self.size));
		self.index = parseInt(self.index);
		if(self.index > self._pageCount){
			self.index = self._pageCount;
		}
		if(self.index < 1){
			self.index = 1;
		}

		self._start = Math.max(1, self.index - parseInt(self.maxButtons/2));
		self._end = Math.min(self._pageCount, self._start + self.maxButtons - 1);
		self._start = Math.max(1, self._end - self.maxButtons + 1);
	};

	/**
	 * 渲染控件.
	 */
	this.render = function(){
		var div = document.getElementById(self.id);
		div.view = self;
		self.container = div;

		self._calculate();

		var str = '';
		str += '<div class="PagerView">\n';
		if(self._pageCount > 1){
			if(self.index != 1){
				str += '<a href="javascript://1"><span>|&lt;</span></a>';
				str += '<a href="javascript://' + (self.index-1) + '"><span>&lt;&lt;</span></a>';
			}else{
				str += '<span>|&lt;</span>';
				str += '<span>&lt;&lt;</span>';
			}
		}
		for(var i=self._start; i<=self._end; i++){
			if(i == this.index){
				str += '<span class="on">' + i + "</span>";
			}else{
				str += '<a href="javascript://' + i + '"><span>' + i + '</span></a>';
			}
		}
		if(self._pageCount > 1){
			if(self.index != self._pageCount){
				str += '<a href="javascript://' + (self.index+1) + '"><span>&gt;&gt;</span></a>';
				str += '<a href="javascript://' + self._pageCount + '"><span>&gt;|</span></a>';
			}else{
				str += '<span>&gt;&gt;</span>';
				str += '<span>&gt;|</span>';
			}
		}
		str += ' 一共' + self._pageCount + '页, ' + self.itemCount + '条记录 ';
		str += '</div><!-- /.pagerView -->\n';

		self.container.innerHTML = str;

		var a_list = self.container.getElementsByTagName('a');
		for(var i=0; i<a_list.length; i++){
			a_list[i].onclick = function(){
				var index = this.getAttribute('href');
				if(index != undefined && index != ''){
					index = parseInt(index.replace('javascript://', ''));
					self._onclick(index)
				}
				return false;
			};
		}
	};

    this.getJson = function(url,index){

        var sumCount = self.itemCount;
        //起始位
        var start = (index - 1) * self.size;
        //结束位
        //最后一个的下标
        var end = start + 5;
        if (sumCount == index) {
            end = sumCount - 1;
        }
        $.get(url, function (data) {
            if(typeof data != 'object'){
                data = JSON.parse(data);
            }
            var tmp = [];
            var j = 0;
            for (var i = start; i < end; i++) {
                tmp[j] = data[i];
                j++;
            }
            $("#"+self.containerDiv).empty();
            $.each(tmp, function (key, val) {
               if(typeof val != 'undefined'){
                    $("#"+self.containerDiv).append(self.toDiv(val.date, val.url, val.title, val.short, val.logo, val.from, val.author));
                }
            });
        });
    };

    this.getNoteJson = function(url,index){

        var sumCount = self.itemCount;
        //起始位
        var start = (index - 1) * self.size;
        //结束位
        //最后一个的下标
        var end = start + 5;
        if (sumCount == index) {
            end = sumCount - 1;
        }
        $.get(url, function (data) {
            if(typeof data != 'object'){
                data = JSON.parse(data);
            }
            var tmpdata= data.data;
            var tmp = [];
            var j = 0;
            for (var i = start; i < end; i++) {
                tmp[j] = tmpdata[i];
                j++;
            }
            $("#"+self.containerDiv).empty();
            $.each(tmp, function (key, val) {
                if(typeof val != 'undefined'){
                    $("#"+self.containerDiv).append(self.toNoteDiv(val.date,val.content));
                }
            });
        });
    };

    //组装div
    this.toDiv =  function (date, url, title, short, logo, from, author) {
        var divstr = '<div class="blogContent"><div class="hover_slideshow">';

        if ("false" != logo) {
            divstr += '<img src="/images/'+self._dir+'/' + logo + '" alt="" width="660" height="240" />';
        }
        divstr += '</div>';
        divstr += '<div class="blog_box">';
        divstr += '<div class="grid_7">';
        divstr += '<h3><a href="' + url + '" title="' + title + '">' + title + '</a></h3>';
        divstr += '<span>' + date + '</span>';
        divstr += '<p><a href="' + from + '" title="' + author + '" target="_blanck">' + author + '</a></p>';
        divstr += '<p>' + short + '</p></div>';
        divstr += '<div class="clearnospacing"></div>';
        divstr += '</div>';
        divstr += '<div class="clear"></div></div>';
        return divstr;
    }

    //通知div
    this.toNoteDiv =  function (date, content) {
        var divstr = '<div class="blogContent"><div class="hover_slideshow">';
        divstr += '</div>';
        divstr += '<div class="blog_box">';
        divstr += '<div class="grid_7">';
        divstr += '<h2>通知</h2>';
        divstr += '<span>' + date + '</span>';
        divstr += '<p style="text-indent: 2em">' + content + '</p></div>';
        divstr += '<div class="clearnospacing"></div>';
        divstr += '</div>';
        divstr += '<div class="clear"></div></div>';
        return divstr;
    }

}
