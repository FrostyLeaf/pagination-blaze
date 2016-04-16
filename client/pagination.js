/**
 * Created on 2016/4/15.
 * @fileoverview 请填写简要的文件说明.
 * @author joc (Firstname Lastname)
 */

class _MonkeyPagination extends MonkeyPagination {
    constructor (name, settings) {
        super(name, settings);
        let self = this;
        self.pickSettings(_.extend({
            maxButtonCount: 10,
            showPrev: true,
            showNext: true,
            show1st: false,
            showLast: false,
            prevLabel: '<',
            nextLabel: '>',
            firstLabel: '«',
            lastLabel: '»',
            showPageNumsNav: false,
            pagesNavTempl: 'pagesNav',
            pagesInfoTempl: 'pagesInfo',
            pageInfoPosition: 'middle'
        }, settings));
    }

    getPageRange () {
        let self = this, beginPage, endPage, pageCount = self.totalPages();
        beginPage = Math.max(0, self.page() - Math.ceil(self.maxButtonCount / 2));
        endPage = beginPage + self.maxButtonCount - 1;
        if (endPage >= pageCount) {
            endPage = pageCount - 1;
            beginPage = Math.max(0, endPage - this.maxButtonCount + 1);
        }
        return [beginPage, endPage];
    }
}

MonkeyPagination = _MonkeyPagination;