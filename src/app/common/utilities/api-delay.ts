import { delay } from "rxjs"


export const MIN_MILLISECONDS = 8 + Math.random() * 10
export const MAX_MILLISECONDS = 3000 - MIN_MILLISECONDS
export const apiDelay = 
  delay(MIN_MILLISECONDS + Math.random() * MAX_MILLISECONDS)
