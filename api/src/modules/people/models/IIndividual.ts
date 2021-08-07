import IDocument from "./IDocument";
import IPerson from "./IPerson";

export default interface IIndividual extends IPerson {
    // person: IPerson;
    birthday: Date;
    gender: string;
    ethnicity: string;
    motherName: string;
    fatherName: string;
    civilStatus: string;
}
