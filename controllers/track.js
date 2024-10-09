import asyncWrapper from "../middleware/async.js"
import { WeightModel, HeightModel, BodyModel } from "../models/track.js"

const getWeightData = asyncWrapper(
    async (req, res)=>{
        let data = await WeightModel.find({}).sort({ date: 1 })
        res.status(200).json({data})
    }
)

const getHeightData = asyncWrapper(
    async (req, res)=>{
        const data = await HeightModel.find({}).sort({ date: 1 })
        res.status(200).json({data})
    }
)

const getBodyData = asyncWrapper(
    async (req, res)=>{
        const { key } = req.query
        const data = await BodyModel.find({ bodyPart: `${key}` }).sort({ date: 1 })
        res.status(200).json({data})
    }
)

const postWeightData = asyncWrapper(
    async (req, res)=>{
        const { date, trackValue } = req.body

        if(!date){
            return res.status(400).json({success: false, msg:"Date not provided"})
        }

        if(!trackValue){
            return res.status(400).json({success: false, msg:"trackValue not provided"})
        }

        const task = await WeightModel.create(req.body)

        // const weightEntry = new WeightModel({
        //     date,
        //     trackValue,
        // });
        // await weightEntry.save();

        // const data = await WeightModel.create(req.body)
        res.status(200).json({task})
    }
)

const postHeightData = asyncWrapper(
    async (req, res)=>{
        const { date, trackValue } = req.body

        if(!date){
            return res.status(400).json({success: false, msg:"Date not provided"})
        }

        if(!trackValue){
            return res.status(400).json({success: false, msg:"trackValue not provided"})
        }

        const heightEntry = new HeightModel({
            date,
            trackValue,
        });
        await heightEntry.save();

        // const data = await WeightModel.create(req.body)
        res.status(200).json({heightEntry})
    }
)

const postBodyData = asyncWrapper(
    async (req, res)=>{
        const { date, trackValue } = req.body
        const { key } = req.query

        if(!date){
            return res.status(400).json({success: false, msg:"Date not provided"})
        }

        if(!trackValue){
            return res.status(400).json({success: false, msg:"trackValue not provided"})
        }

        const bodyEntry = new BodyModel({
            date,
            trackValue,
            bodyPart: key
        });
        await bodyEntry.save();

        // const data = await WeightModel.create(req.body)
        res.status(200).json({bodyEntry})
    }
)

export {getWeightData, postWeightData, getHeightData, postHeightData, getBodyData, postBodyData}