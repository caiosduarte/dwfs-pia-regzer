import IDocument from "./IDocument";
import IPerson from "./IPerson";

export default interface ICompany {
    person: IPerson;
    fantasyName: string;
    openDate: Date;
    endDate: Date;
    // responsibleDocument: IDocument;
    responsibleName: string;
}
