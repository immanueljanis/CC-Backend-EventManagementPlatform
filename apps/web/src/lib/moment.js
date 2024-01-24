import moment from "moment"

export const formatTanggal = (date) => {
    return moment(date).format('LL')
}

export const formatJam = (date) => {
    return moment(date).format('LT')
}