import IDocument from "./IDocument";

export default interface ICompany {
    id: string;
    fantasy_name: string;
    open_date: Date;
    end_date: Date;
    responsibleDocument: IDocument;
    responsibleName: string;
}
