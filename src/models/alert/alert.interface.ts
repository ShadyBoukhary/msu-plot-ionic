export interface Alert {
    time: {
        hour: string,
        minute: string,
        timeOfDay: string
    },
    day: string[],
    state: boolean,
    lot: string,
    repeat: boolean,
    $key?:string
}