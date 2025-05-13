import { NextFunction, Request, Response } from "express"

export const asyncHandler = <T = Response>(fn: (req: Request, res: Response, next: NextFunction) => Promise<T>) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await fn(req, res, next)
        } catch (error: any) {
            res.status(error.code || 500).json({
                success: false,
                message: error.message,
                data: null
            })
        }
    }
}