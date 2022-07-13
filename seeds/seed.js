const DB = require('../models/index')

DB.sequelize.sync({force: true}).then(async function() {
    try {
        await DB.Band.create({
            name: 'test_band_1',
            genre: 'super cool',
            available_start_time: "2022-07-13T00:00:00",
            end_time: "2022-07-13T06:00:00"
        })

        await DB.Event.create({
            name: 'Lollapalooza',
            date: "2022-07-13",
            start_time: "2022-07-13T12:00:00",
            end_time: "2022-07-13T13:00:00"
        })

        await DB.Meet_Greet.create({
            event_id: 1,
            band_id: 1,
            set_time_id: 1,
            meet_start_time: "2022-07-13T12:00:00",
            meet_end_time: "2022-07-13T13:00:00"
        })
        
        await DB.Stage.create({
            stage_name: 'Main Stage'
        })

        await DB.Stage_Event.create({
            stage_id: 1,
            event_id: 1
        })
        
        await DB.Set_Time.create({
            event_id: 1,
            stage_id: 1,
            band_id: 1,
            start_time: "2022-07-13T12:00:00",
            end_time: "2022-07-13T13:00:00"
        })

        console.log("Successfully seeded")
    } catch (error) {
        console.log(error)
    }
})