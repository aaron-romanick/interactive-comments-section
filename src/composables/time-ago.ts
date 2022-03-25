import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import type { IUseTimeAgo } from '../interfaces/IUseTimeAgo.ts'

TimeAgo.addDefaultLocale(en)
const timeAgo: TimeAgo = new TimeAgo('en-US')

export function useTimeAgo(): IUseTimeAgo {

    function humanReadableTime(timestamp: number): string {
        return timeAgo.format(timestamp)
    }

    return {
        humanReadableTime,
    }
}