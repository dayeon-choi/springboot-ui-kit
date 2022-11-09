var calendar = {
    init: function() {
        var _this = this;

        _this.makeUpDatepicker();
    },

    /* 날짜 범위 선택기 */
    makeUpDatepicker: function() {
        // 초기화
        $('#date-range-picker')
            .val(calendar.getDateNow() + " ~ " + calendar.getDateNow())
            .on('click', function() {
                $('.daterangepicker').show();
            });
        $('#date-range-picker-container').on('click', function() {
            $('#date-range-picker').trigger('click');
        });

        // 기본 옵션 사용
        let picker = $('#date-range-picker').daterangepicker({
                    locale: {
                        "separator": " ~ ",
                        "format": "YYYY.MM.DD",
                        "daysOfWeek": ["<span style='color: #EA4E50;'>일</span>", "월", "화", "수", "목", "금", "<span style='color: #004FC5;'>토</span>"],
                        "monthNames": ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
                        "applyLabel": " 선택 완료",
                    },
                    opens: "center",
                    linkedCalendars: false,
                    autoUpdateInput: false,
                });

        // input 옆 날짜 계산 표시
        picker.on('change', function() {
            calendar.setPickedTotal();
        });
        calendar.setPickedTotal();

        // 기존 캘린더 2달치 표시 -> 1달만 표시
        $('.drp-calendar.right').hide();
        $('.drp-calendar.left').addClass('single');
        $('.calendar.table').on('DOMSubtreeModified', function() {
            var el = $(".prev.available").parent().children().last();
            if (el.hasClass('next available')) { return; }
            el.addClass('next available');
            el.append('<span></span>');
        });

        // 선택 완료 버튼
        $('.drp-calendar.left').append('<button type="button" id="apply-button" class="apply-button applyBtn"></button>');
        $('.drp-selected').on('DOMSubtreeModified', function() {
            calendar.setApplyButtonText();
        });
        $('#apply-button').on('click', function() {
            calendar.onApplyButtonClick();
            calendar.setPickedTotal();
        });
    },

    onApplyButtonClick: function() {
        $('#date-range-picker').val($('.drp-selected').text());
        $('.daterangepicker').hide();
    },

    setPickedTotal: function() {
        const startToEndArray = $('#date-range-picker').val().split(" ");
        const diffText = calendar.getDateDiffText(startToEndArray[0], startToEndArray[2]);
        $('#picked-total').html("").append(diffText);
    },

    setApplyButtonText: function() {
        const startToEndArray = $('.drp-selected').text().split(" ");
        const diffText = calendar.getDateDiffText(startToEndArray[0], startToEndArray[2]);
        $('#apply-button').html("").append(diffText+" 선택 완료");
        return diffText;
    },

    getDatePickerDiffText: function() {
        const startToEndArray = $('#date-range-picker').val().split(" ");
        const diffText = calendar.getDateDiffText(startToEndArray[0], startToEndArray[2]);
        return diffText;
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

    getDateNow: function() {
        const date = new Date();
        const dateText = date.getFullYear() + "." + (date.getMonth()+1) + "." + ('00'+date.getDate()).slice(-2);
        return dateText;
    },
};

calendar.init();