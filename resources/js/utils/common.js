//Common functions, that can be used in any component
import moment from "moment";

export const formatDate = (date, full) => {
    let d = moment(new Date(date))._d,
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hours = (d.getHours() < 10 ? '0' : '') + d.getHours(),
        minutes = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes(),
        seconds = (d.getSeconds() < 10 ? '0' : '') + d.getSeconds();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    if (full) {
        return [year, month, day].join('-').concat(' ' + [hours, minutes, seconds].join(':'));
    } else {
        return [year, month, day].join('-').concat(' ' + [hours, minutes].join(':'));
    }

    // if (full) {
    //     return moment(new Date(date)).format("YYYY-MM-DD hh:mm:ss");
    //     // return moment(date).format("YYYY-MM-DD hh:mm:ss ZZ");
    // } else {
    //     return moment(new Date(date)).format("YYYY-MM-DD hh:mm");
    // }
}

export function refreshPage() {
    window.location.reload(false);
}

export function strEncodeUTF16(str) {
    var buf = new ArrayBuffer(str.length*2);
    var bufView = new Uint16Array(buf);
    for (var i=0, strLen=str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return bufView;
}
