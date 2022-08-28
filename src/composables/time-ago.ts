import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

export function useTimeAgo() {

    function humanReadableTime(timestamp: number) {
        return timeAgo.format(timestamp)
    }

    return {
        humanReadableTime,
    }
}