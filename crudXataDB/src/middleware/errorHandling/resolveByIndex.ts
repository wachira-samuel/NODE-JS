import { NextFunction, Response, Request } from "express";
import { request } from "http";

type UserData = {
  userID: number;
  userName: string;
  displayName: string;
};

// extend Request Object to include userFoundIndex
interface CustomRequest extends Request {
  userFoundIndex?: number;
  parsedId?:number;
}

const resolveUserByIndex = (userData: Array<UserData>) => {
    //pass your parameter needed to your midddleware
    //return a callback function of your with your functionality
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const {
      params: { id },
    } = req;
    const parsedID: number = parseInt(id);

    const {body} = req

    const findIndex = userData.findIndex(
      (userObj) => userObj.userID === parsedID
    );

    if (isNaN(parsedID)) {
      res.status(400).json({
        message: "ID not a number",
      });
    } else if (findIndex === -1) {
      res.status(404).json({
        message: "User unavailable",
      });
    } else {
      //bind the foundIndex into the request
      req.userFoundIndex = findIndex;
      req.parsedId = parsedID
      req.body = body
      next(); // passes the function to the next middleware
    }
  };
};

export { resolveUserByIndex, CustomRequest, UserData };
