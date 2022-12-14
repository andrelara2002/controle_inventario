class ChamadosApi {
    constructor() {
        this.url = 'http://192.168.15.149:8000/chamados'
    }


    fetchData = async callback => {
        let response = []

        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        await fetch(this.url, { method: 'GET', headers })
            .then(async res => res.json().then(parsed => response = [parsed, undefined]))
            .catch(err => response = [undefined, err])

        callback && callback(response)
        return callback
    }

    createData = async ({ os, description, opening_date, schedule_date, created_by }, callback) => {
        let response = []

        let headers = new Headers()
        headers.append('Content-Type', 'application/json')

        let schedule = new Date()
        if (!schedule_date) {
            schedule = schedule.setDate(schedule.getDate() + 15)
            schedule = new Date(schedule)
        }
        else { schedule = schedule_date }

        await fetch(this.url, {
            method: 'POST', headers,
            body: JSON.stringify({
                os: os ? os : '00',
                description: description ? description : "Nenhuma",
                opening_date: new Date(),
                ending_date: undefined,
                schedule_date: schedule,
                status: 1,
                created_by
            })
        })
            .then(async res => res.json().then(parsed => response = [parsed, undefined]))
            .catch(err => response = [undefined, err])

        callback && callback(response)
        return callback
    }
}
