import Vue from 'vue'
import moment from 'moment'

const mixin = Vue.mixin({
    methods: {
        showMsg(msg, isSuccess = true) {
            Vue.swal({ titleText: msg, 'icon': isSuccess ? 'success' : 'error' });
        },
        formatDate(date, format = 'DD/MM/YYYY') {
            if (date) {
                return moment(String(date)).format(format)
            }

            return date;
        },
        formatHour(hour, format = 'hh:mm') {
            if (hour) {
                return moment(String(hour)).format(format)
            }

            return hour;
        }
    }
});

export default mixin