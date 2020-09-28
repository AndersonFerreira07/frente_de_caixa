export function getValidUntil(minutes) {
    const duration = minutes * 60 * 1000;
    const validUntil = new Date();
    validUntil.setTime(validUntil.getTime() + duration);
    return validUntil;
}
