import "dotenv/config"
const getEazyOtpApiKey=()=>{
    return process.env.EAZY_OTP_API_KEY;
}
export {
    getEazyOtpApiKey
}