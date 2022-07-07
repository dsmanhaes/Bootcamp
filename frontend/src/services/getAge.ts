export function getAge (birthDate: string): number {
    const birthMs = new Date(birthDate).getTime();
    const ageMs = Date.now() - birthMs;
    const ageDate = new Date(ageMs)

    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
