export default interface IStorageProvider {
    save(folder: string, file: string, mimetype?: string): Promise<string>;
    delete(folder: string, file: string): Promise<void>;
}
