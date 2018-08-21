import { Request, Response, NextFunction } from "express";

class UserController {
  public getAllUser (req: Request, res: Response, next: NextFunction): any {
    return [{name: 'carlos'}]
  }

}