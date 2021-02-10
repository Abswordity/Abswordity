export const playSound = (isMuted, soundCallback) => {
    if (!isMuted){
        soundCallback()
    }
}