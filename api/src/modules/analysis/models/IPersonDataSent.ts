import IPerson from "../../people/models/IPerson";

export default interface IDataSent {
    person: IPerson;
    field: string;
    oldValue: string;
    newValue: string;
}
