import crypto from "crypto"
import moment from "moment"

export default function useUtils() {
  const getRandomBytes = async (length?: number) => await crypto.randomBytes(length ?? 16).toString("hex")
  const momentFormat = "MMMM Do YYYY, h:mm:ss a"
  const momentDateFormat = "MMMM Do YYYY"
  const getMoment = async () => await moment().format(momentFormat)
  const getFromNow = async (createdAt: string) => await moment(createdAt, momentFormat).fromNow()
  const getMomentDate = async () => await moment().format(momentDateFormat)
  return {
    getRandomBytes,
    getMoment,
    getFromNow,
    getMomentDate,
  }
}
