export interface Alert {
    time: {
        hour: string,
        minute: string,
        timeOfDay: string
    },
    day: boolean[]
}