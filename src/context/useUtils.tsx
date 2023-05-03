import crypto from "crypto"
import moment from "moment"

export default function useUtils() {
  const getRandomBytes = async (length?: number) => await crypto.randomBytes(length ?? 16).toString("hex")
  const momentFormat = "MMMM Do YYYY, h:mm:ss a"
  const getMoment = async () => await moment().format(momentFormat)
  const getFromNow = async (createdAt: string) => await moment(createdAt, momentFormat).fromNow()

  return {
    getRandomBytes,
    getMoment,
    getFromNow,
  }
}
