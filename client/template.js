Template.pages.helpers({
    items: function () {
        return this.pagination.getPage();
    },
    item: function (__index__) {
        let parentData = Template.parentData(),
            __count__ = parentData ? (parentData.count ? parentData.count() : parentData.length) : 0;
        return _.extend(this, {__index__, __count__});
    },
    data: function () {
        return this;
    },
    itemTemp: function () {
        return Template.instance().data.pagination.itemTemplate || 'masterItem';
    }
});

Template.pagesNav.onCreated(function () {
    let {data} = this;
    this.templateName = data.templateName || 'defaultPagesEntry';
});
Template.pagesNav.helpers({
    context: function () {
        return _.extend(this.pagination, this.extendData);
    },
    pagesGt1: function () {
        return this.totalPages() > 1;
    },
    buttons: function () {
        let self = this, beginPage, endPage, ref, pageCount = self.totalPages(), buttons = [];
        let thisPage = self.page();
        if (self.showPageNumsNav) {
            ref = self.getPageRange();
            beginPage = ref[0];
            endPage = ref[1];
        }

        let addButton = function (flg, label, extremity, routePage, baseClass, className) {
            if (!flg) {
                return;
            }

            if (baseClass == null) {
                baseClass = '';
            } else {
                baseClass = ' ' + baseClass;
            }
            className = (className || "disabled") + baseClass;

            buttons.push({
                label: label,
                "class": parseInt(extremity) === parseInt(self.page()) ? className : baseClass,
                path: routePage || ''
            });
        };

        // 第一页
        addButton(self.show1st, self.firstLabel, 1, 1, "extremity");
        // 前一页
        addButton(self.showPrev, self.prevLabel, 1, (parseInt(thisPage) - 1) || 1, "neighbor");

        if (self.showPageNumsNav) { // bootstrap风格页码条
            while (beginPage++ <= endPage) {
                //query = $.query.load(location.href).set("page", beginPage).toString();
                addButton(true, beginPage, beginPage, beginPage, "pagenum", "active");
            }
        } else if (self.pageInfoPosition === 'middle') { // 手动输入页码
            addButton(true, thisPage + '/' + self.totalPages());
        }
        // 下一页
        let next = parseInt(thisPage) + 1;
        (next > pageCount) && (next = pageCount);
        addButton(self.showNext, self.nextLabel, pageCount, next, "neighbor");
        // 最后一页
        addButton(self.showLast, self.lastLabel, pageCount, pageCount, "extremity");

        return buttons;
    },
    data: function () {
        let {liClass, pagesInfoClass} = Template.parentData(), {pagination} = Template.instance().data;
        return _.extend(this, {
            pathValid: _.isNumber(this.path),
            liClass,
            pagesInfoClass,
            currentPage: pagination.page() || '',
            totalPage: pagination.totalPages() || ''
        });
    },
    templateName: function () {
        return Template.instance().templateName;
    }
});
Template.pagesNav.events({
    'click .pagination .pager[data]': function (event, temp) {
        event.preventDefault();
        let $t = $(event.target),
            self = Template.instance().data.pagination,
            pageCount = self.totalPages();

        if (!$t.hasClass('disabled') && !$t.hasClass('active')) {
            temp.$(event.target).addClass(self.clickDownClass);
            let page = this.path;
            if (page > pageCount) {
                page = pageCount;
            }
            self.page(page);
        }
    },
    'blur input[name=currentPage]': function (event) {
        event.preventDefault();
        let self = Template.instance().data.pagination,
            page = parseInt(event.currentTarget.value) || self();
        event.currentTarget.value = self.page(page);
    },
    'keyup input[name=currentPage]': function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            let self = Template.instance().data.pagination,
                page = parseInt(event.currentTarget.value) || self.page();
            self.page(page);
        }
    }
});