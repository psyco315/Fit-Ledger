import mongoose from "mongoose";

const trackSchema = new mongoose.Schema({
    date:{
        type: String,
        required: [true, 'Date required']
    },
    trackValue:{
        type: Number,
        required: [true, 'Value required']
    }
})

const bodyTrackSchema = new mongoose.Schema({
    date:{
        type: String,
        required: [true, 'Date required']
    },
    trackValue:{
        type: Number,
        required: [true, 'Value required']
    },
    bodyPart:{
        type: String,
        required: [true, 'Body part required']
    }
})

const WeightModel = mongoose.model('WeightSchema', trackSchema, 'WeightTrack')
const HeightModel = mongoose.model('HeightSchema', trackSchema, 'HeightTrack')
const BodyModel = mongoose.model('BodySchema', bodyTrackSchema, 'BodyTrack')

export {
    WeightModel, HeightModel, BodyModel
}
