import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import IAnalysis from "../modules/analysis/models/IAnalysis";
import IPersonDataSent from "../modules/analysis/models/IPersonDataSent";
import { Dated } from "./Embedded";
import Person from "./Person";
import User from "./User";

@Entity({ name: "person_data_sent" })
export default class PersonDataSent implements IPersonDataSent, IAnalysis {
    @PrimaryColumn({ name: "person_data_sent_id" })
    id: string;

    @ManyToOne((type) => Person, { eager: true })
    @JoinColumn({ name: "person_id" })
    person: Person;

    @Column({ name: "field_name" })
    field: string;

    @Column({ name: "old_value", type: "text" })
    oldValue: string;

    @Column({ name: "new_value", type: "text" })
    newValue: string;

    // TODO: Dados abaixo são para análise
    @ManyToOne((type) => User, { eager: true })
    @JoinColumn({ name: "analyst_id" /* , referencedColumnName: "user_id" */ })
    analyst: User;

    @Column({ name: "user_message", type: "text" })
    userMessage: string;

    @Column({ name: "is_valid", default: false })
    isValid: boolean;

    @Column({ name: "valid_at" })
    validAt: Date;

    // Dados de data para a tabela
    @Column((type) => Dated, { prefix: false })
    dated: Dated;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}
