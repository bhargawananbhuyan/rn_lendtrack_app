export default function getAvatar(text:string) {
    return `${text?.split(" ")[0][0]}${text?.split(" ")[1][0]}`
}