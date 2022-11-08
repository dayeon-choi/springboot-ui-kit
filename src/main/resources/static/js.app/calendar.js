var calendar = {
    init: function() {
        var _this = this;

        _this.makeUpDatepicker();
    },

    makeUpDatepicker: function() {
        let picker = $('#datepicker').daterangepicker({
                    locale: {
                        "separator": " ~ ",
                        "format": "YYYY.MM.DD",
                        "daysOfWeek": ["<span style='color: #EA4E50;'>일</span>", "월", "화", "수", "목", "금", "<span style='color: #004FC5;'>토</span>"],
                        "monthNames": ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
                        "applyLabel": "선택 완료",
                    },
                    opens: "center",
                    autoApply: true,
                    linkedCalendars: false,
                });

        // 기존 캘린더 2달치 표시 -> 1달만 표시
        $('.drp-calendar.right').hide();
        $('.drp-calendar.left').addClass('single');
        $('.calendar.table').on('DOMSubtreeModified', function() {
            var el = $(".prev.available").parent().children().last();
            if (el.hasClass('next available')) { return; }
            el.addClass('next available');
            el.append('<span></span>');
        });

        calendar.setPickedTotal();

        picker.on('change', function() {
            calendar.setPickedTotal();
        });
    },

    setPickedTotal: function() {
        const startToEndArray = $('#datepicker').val().split(" ");
        const diffText = calendar.getDateDiffText(startToEndArray[0], startToEndArray[2]);
        $('#pickedTotal').html("");
        $('#pickedTotal').append(diffText);
    },

    getDateDiffText: function(start, end) {
        const diff = calendar.getDateDiff(start, end);
        return diff ? diff+"박" : "당일";
    },

    getDateDiff: function(start, end) {
        const startDate = new Date(start);
        const endDate = new Date(end);

        return Math.abs((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    },
};

calendar.init();