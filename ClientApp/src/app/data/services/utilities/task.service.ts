export class Task{
    static async DelayAsync(ms:number) {
        // return await for better async stack trace support in case of errors.
        return await new Promise(resolve => setTimeout(resolve, ms));
    }
}