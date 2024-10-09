const asyncWrapper = (func)=>{
    return async (req, res, next)=>{
        try {
            await func(req, res, next)
        } catch (error) {
            next(error) // This forwards the error to the next middleware 
        }
    }
}

export default asyncWrapper