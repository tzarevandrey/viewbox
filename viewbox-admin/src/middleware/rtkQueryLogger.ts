import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit';

const rtkQueryLogger: Middleware<any> = () => next => action => {
  if (isRejectedWithValue(action)) {
    console.log('error');
  }

  return next(action);
}

export default rtkQueryLogger;