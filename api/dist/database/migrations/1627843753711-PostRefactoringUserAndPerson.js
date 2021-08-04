"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRefactoringUserAndPerson1627843753711 = void 0;
var PostRefactoringUserAndPerson1627843753711 = (function () {
    function PostRefactoringUserAndPerson1627843753711() {
        this.name = 'PostRefactoringUserAndPerson1627843753711';
    }
    PostRefactoringUserAndPerson1627843753711.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, queryRunner.query("CREATE TABLE \"temporary_user_token\" (\"user_token_id\" character(36) PRIMARY KEY NOT NULL, \"user_id\" character(36) NOT NULL, \"token\" varchar NOT NULL, \"expires_at\" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP), \"created_at\" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP))")];
                    case 1:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_user_token\"(\"user_token_id\", \"user_id\", \"token\", \"expires_at\", \"created_at\") SELECT \"user_token_id\", \"user_id\", \"token\", \"expires_at\", \"created_at\" FROM \"user_token\"")];
                    case 2:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"user_token\"")];
                    case 3:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_user_token\" RENAME TO \"user_token\"")];
                    case 4:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_person_company\" (\"person_company_id\" character(36) PRIMARY KEY NOT NULL, \"fantasy_name\" varchar, \"open_date\" date NOT NULL, \"end_date\" date, \"responsible_document_id\" character(36), \"responsible_name\" varchar)")];
                    case 5:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_person_company\"(\"person_company_id\", \"fantasy_name\", \"open_date\", \"end_date\", \"responsible_document_id\", \"responsible_name\") SELECT \"person_company_id\", \"fantasy_name\", \"open_date\", \"end_date\", \"responsible_document_id\", \"responsible_name\" FROM \"person_company\"")];
                    case 6:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"person_company\"")];
                    case 7:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_person_company\" RENAME TO \"person_company\"")];
                    case 8:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_person_individual\" (\"person_individual_id\" character(36) PRIMARY KEY NOT NULL, \"birthday\" date NOT NULL, \"gender\" character(1) NOT NULL, \"ethnicity\" varchar NOT NULL, \"father_name\" varchar, \"mother_name\" varchar, \"civil_status\" varchar NOT NULL, CONSTRAINT \"ck_gender_person_individual\" CHECK ((gender IN('M','F','O'))), CONSTRAINT \"ck_ethnicity_person_individual\" CHECK ((ethnicity IN('AFRODESCENDENTE','BRANCO','ASI\u00C1TICO','AMER\u00CDNDIO','MULATO','MULTIRRACIAL/PARDO','N\u00C3O DECLARADA'))), CONSTRAINT \"ck_civil_status_person_individual\" CHECK ((civil_status IN('SOLTEIRO','UNI\u00C3O EST\u00C1VEL','CASADO','SEPARADO','DIVORCIADO','VI\u00DAVO'))))")];
                    case 9:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_person_individual\"(\"person_individual_id\", \"birthday\", \"gender\", \"ethnicity\", \"father_name\", \"mother_name\", \"civil_status\") SELECT \"person_individual_id\", \"birthday\", \"gender\", \"ethnicity\", \"father_name\", \"mother_name\", \"civil_status\" FROM \"person_individual\"")];
                    case 10:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"person_individual\"")];
                    case 11:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_person_individual\" RENAME TO \"person_individual\"")];
                    case 12:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_document_type\" (\"documento_type_id\" character(36) PRIMARY KEY NOT NULL, \"initials\" varchar(10), \"description\" text NOT NULL, \"person_type\" character(1) NOT NULL, \"mask\" varchar, \"is_main\" boolean NOT NULL DEFAULT (false))")];
                    case 13:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_document_type\"(\"documento_type_id\", \"initials\", \"description\", \"person_type\", \"mask\", \"is_main\") SELECT \"documento_type_id\", \"initials\", \"description\", \"person_type\", \"mask\", \"is_main\" FROM \"document_type\"")];
                    case 14:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"document_type\"")];
                    case 15:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_document_type\" RENAME TO \"document_type\"")];
                    case 16:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_person\" (\"person_id\" character(36) PRIMARY KEY NOT NULL, \"type\" varchar NOT NULL, \"cellphone\" varchar, \"telephone\" varchar, \"is_valid\" boolean NOT NULL DEFAULT (false), \"valid_at\" timestamp, CONSTRAINT \"FK_403c951c5e9b776c16385a8940f\" FOREIGN KEY (\"person_id\") REFERENCES \"user\" (\"user_id\") ON DELETE NO ACTION ON UPDATE NO ACTION)")];
                    case 17:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_person\"(\"person_id\", \"type\", \"cellphone\", \"telephone\", \"is_valid\", \"valid_at\") SELECT \"person_id\", \"type\", \"cellphone\", \"telephone\", \"is_valid\", \"valid_at\" FROM \"person\"")];
                    case 18:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"person\"")];
                    case 19:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_person\" RENAME TO \"person\"")];
                    case 20:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_person_individual\" (\"person_individual_id\" character(36) PRIMARY KEY NOT NULL, \"birthday\" date NOT NULL, \"gender\" character(1) NOT NULL, \"ethnicity\" varchar NOT NULL, \"father_name\" varchar, \"mother_name\" varchar, \"civil_status\" varchar NOT NULL)")];
                    case 21:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_person_individual\"(\"person_individual_id\", \"birthday\", \"gender\", \"ethnicity\", \"father_name\", \"mother_name\", \"civil_status\") SELECT \"person_individual_id\", \"birthday\", \"gender\", \"ethnicity\", \"father_name\", \"mother_name\", \"civil_status\" FROM \"person_individual\"")];
                    case 22:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"person_individual\"")];
                    case 23:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_person_individual\" RENAME TO \"person_individual\"")];
                    case 24:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"person_data_sent\" (\"person_data_sent_id\" varchar PRIMARY KEY NOT NULL, \"field_name\" varchar NOT NULL, \"old_value\" text NOT NULL, \"new_value\" text NOT NULL, \"user_message\" text NOT NULL, \"is_valid\" boolean NOT NULL DEFAULT (0), \"valid_at\" datetime NOT NULL, \"person_id\" varchar, \"analyst_id\" varchar, \"updated_at\" datetime NOT NULL DEFAULT (datetime('now')), \"created_at\" datetime NOT NULL DEFAULT (datetime('now')))")];
                    case 25:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_document_type\" (\"initials\" varchar(10), \"description\" text NOT NULL, \"person_type\" character(1) NOT NULL, \"mask\" varchar, \"is_main\" boolean NOT NULL DEFAULT (false))")];
                    case 26:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_document_type\"(\"initials\", \"description\", \"person_type\", \"mask\", \"is_main\") SELECT \"initials\", \"description\", \"person_type\", \"mask\", \"is_main\" FROM \"document_type\"")];
                    case 27:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"document_type\"")];
                    case 28:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_document_type\" RENAME TO \"document_type\"")];
                    case 29:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_person_company\" (\"person_company_id\" character(36) PRIMARY KEY NOT NULL, \"fantasy_name\" varchar, \"open_date\" date NOT NULL, \"end_date\" date, \"responsible_name\" varchar)")];
                    case 30:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_person_company\"(\"person_company_id\", \"fantasy_name\", \"open_date\", \"end_date\", \"responsible_name\") SELECT \"person_company_id\", \"fantasy_name\", \"open_date\", \"end_date\", \"responsible_name\" FROM \"person_company\"")];
                    case 31:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"person_company\"")];
                    case 32:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_person_company\" RENAME TO \"person_company\"")];
                    case 33:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_document_type\" (\"initials\" varchar(10), \"description\" text NOT NULL, \"person_type\" character(1) NOT NULL, \"mask\" varchar, \"is_main\" boolean NOT NULL DEFAULT (false), \"document_type_id\" varchar PRIMARY KEY NOT NULL)")];
                    case 34:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_document_type\"(\"initials\", \"description\", \"person_type\", \"mask\", \"is_main\") SELECT \"initials\", \"description\", \"person_type\", \"mask\", \"is_main\" FROM \"document_type\"")];
                    case 35:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"document_type\"")];
                    case 36:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_document_type\" RENAME TO \"document_type\"")];
                    case 37:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_person_document\" (\"person_document_id\" character(36) PRIMARY KEY NOT NULL, \"person_id\" character(36) NOT NULL, \"document_type_id\" character(36) NOT NULL, \"document_number\" varchar(100) NOT NULL, \"dispatch_date\" date, \"issuing_agency\" varchar(30), \"person_name\" varchar(100) NOT NULL, \"is_main\" boolean NOT NULL DEFAULT (false), \"createdAtCreated_at\" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT \"FK_06d08640b21137b4a4ac77fa9b1\" FOREIGN KEY (\"document_type_id\") REFERENCES \"document_type\" (\"document_type_id\") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT \"FK_3d2eefc8668f687831146947b31\" FOREIGN KEY (\"person_id\") REFERENCES \"person\" (\"person_id\") ON DELETE NO ACTION ON UPDATE NO ACTION)")];
                    case 38:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_person_document\"(\"person_document_id\", \"person_id\", \"document_type_id\", \"document_number\", \"dispatch_date\", \"issuing_agency\", \"person_name\", \"is_main\") SELECT \"person_document_id\", \"person_id\", \"document_type_id\", \"document_number\", \"dispatch_date\", \"issuing_agency\", \"person_name\", \"is_main\" FROM \"person_document\"")];
                    case 39:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"person_document\"")];
                    case 40:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_person_document\" RENAME TO \"person_document\"")];
                    case 41:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_user\" (\"user_id\" character(36) PRIMARY KEY NOT NULL, \"name\" varchar NOT NULL, \"document\" varchar, \"email\" varchar NOT NULL, \"cellphone\" varchar, \"password\" varchar NOT NULL, \"is_admin\" boolean NOT NULL DEFAULT (false), \"is_valid\" boolean NOT NULL DEFAULT (true), \"is_confirmed\" boolean NOT NULL DEFAULT (false), \"created_at\" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP), \"updated_at\" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP), \"validated_at\" datetime, \"confirmed_at\" datetime, CONSTRAINT \"UQ_e12875dfb3b1d92d7d7c5377e22\" UNIQUE (\"email\"))")];
                    case 42:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_user\"(\"user_id\", \"name\", \"document\", \"email\", \"cellphone\", \"password\", \"is_admin\", \"is_valid\", \"is_confirmed\", \"created_at\", \"updated_at\") SELECT \"user_id\", \"name\", \"document\", \"email\", \"cellphone\", \"password\", \"is_admin\", \"is_valid\", \"is_confirmed\", \"created_at\", \"updated_at\" FROM \"user\"")];
                    case 43:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"user\"")];
                    case 44:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_user\" RENAME TO \"user\"")];
                    case 45:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_person_company\" (\"person_company_id\" character(36) NOT NULL, \"fantasy_name\" varchar, \"open_date\" date NOT NULL, \"end_date\" date, \"responsible_name\" varchar, \"person_id\" varchar NOT NULL, \"type\" varchar CHECK( type IN ('F','J','O','A') ) NOT NULL, \"cellphone\" varchar NOT NULL, \"telephone\" varchar NOT NULL, \"is_valid\" boolean NOT NULL DEFAULT (0), \"valid_at\" datetime NOT NULL, CONSTRAINT \"UQ_c81d4a32f21092f299bea4ab76b\" UNIQUE (\"person_id\"), PRIMARY KEY (\"person_company_id\", \"person_id\"))")];
                    case 46:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_person_company\"(\"person_company_id\", \"fantasy_name\", \"open_date\", \"end_date\", \"responsible_name\") SELECT \"person_company_id\", \"fantasy_name\", \"open_date\", \"end_date\", \"responsible_name\" FROM \"person_company\"")];
                    case 47:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"person_company\"")];
                    case 48:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_person_company\" RENAME TO \"person_company\"")];
                    case 49:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_person_individual\" (\"person_individual_id\" character(36) NOT NULL, \"birthday\" date NOT NULL, \"gender\" character(1) NOT NULL, \"ethnicity\" varchar NOT NULL, \"father_name\" varchar, \"mother_name\" varchar, \"civil_status\" varchar NOT NULL, \"person_id\" varchar NOT NULL, \"type\" varchar CHECK( type IN ('F','J','O','A') ) NOT NULL, \"cellphone\" varchar NOT NULL, \"telephone\" varchar NOT NULL, \"is_valid\" boolean NOT NULL DEFAULT (0), \"valid_at\" datetime NOT NULL, CONSTRAINT \"UQ_0b044296ce18446dc7de50e4162\" UNIQUE (\"person_id\"), PRIMARY KEY (\"person_individual_id\", \"person_id\"))")];
                    case 50:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_person_individual\"(\"person_individual_id\", \"birthday\", \"gender\", \"ethnicity\", \"father_name\", \"mother_name\", \"civil_status\") SELECT \"person_individual_id\", \"birthday\", \"gender\", \"ethnicity\", \"father_name\", \"mother_name\", \"civil_status\" FROM \"person_individual\"")];
                    case 51:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"person_individual\"")];
                    case 52:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_person_individual\" RENAME TO \"person_individual\"")];
                    case 53:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_document_type\" (\"initials\" varchar NOT NULL, \"description\" varchar NOT NULL, \"person_type\" varchar CHECK( person_type IN ('F','J','T') ) NOT NULL, \"mask\" varchar NOT NULL, \"is_main\" boolean NOT NULL, \"document_type_id\" varchar PRIMARY KEY NOT NULL)")];
                    case 54:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_document_type\"(\"initials\", \"description\", \"person_type\", \"mask\", \"is_main\", \"document_type_id\") SELECT \"initials\", \"description\", \"person_type\", \"mask\", \"is_main\", \"document_type_id\" FROM \"document_type\"")];
                    case 55:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"document_type\"")];
                    case 56:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_document_type\" RENAME TO \"document_type\"")];
                    case 57:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_person_document_file\" (\"person_document_file_id\" character(36) PRIMARY KEY NOT NULL, \"person_document_id\" character(36) NOT NULL, \"filename\" text NOT NULL, \"mimetype\" varchar NOT NULL)")];
                    case 58:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_person_document_file\"(\"person_document_file_id\", \"person_document_id\", \"filename\", \"mimetype\") SELECT \"person_document_file_id\", \"person_document_id\", \"filename\", \"mimetype\" FROM \"person_document_file\"")];
                    case 59:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"person_document_file\"")];
                    case 60:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_person_document_file\" RENAME TO \"person_document_file\"")];
                    case 61:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_person_document_file\" (\"person_document_file_id\" varchar PRIMARY KEY NOT NULL, \"person_document_id\" varchar, \"filename\" varchar NOT NULL, \"mimetype\" varchar NOT NULL)")];
                    case 62:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_person_document_file\"(\"person_document_file_id\", \"person_document_id\", \"filename\", \"mimetype\") SELECT \"person_document_file_id\", \"person_document_id\", \"filename\", \"mimetype\" FROM \"person_document_file\"")];
                    case 63:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"person_document_file\"")];
                    case 64:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_person_document_file\" RENAME TO \"person_document_file\"")];
                    case 65:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_person_document\" (\"person_document_id\" character(36) PRIMARY KEY NOT NULL, \"person_id\" character(36) NOT NULL, \"document_type_id\" character(36) NOT NULL, \"document_number\" varchar(100) NOT NULL, \"dispatch_date\" date, \"issuing_agency\" varchar(30), \"person_name\" varchar(100) NOT NULL, \"is_main\" boolean NOT NULL DEFAULT (false), \"createdAtCreated_at\" datetime NOT NULL DEFAULT (datetime('now')))")];
                    case 66:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_person_document\"(\"person_document_id\", \"person_id\", \"document_type_id\", \"document_number\", \"dispatch_date\", \"issuing_agency\", \"person_name\", \"is_main\", \"createdAtCreated_at\") SELECT \"person_document_id\", \"person_id\", \"document_type_id\", \"document_number\", \"dispatch_date\", \"issuing_agency\", \"person_name\", \"is_main\", \"createdAtCreated_at\" FROM \"person_document\"")];
                    case 67:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"person_document\"")];
                    case 68:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_person_document\" RENAME TO \"person_document\"")];
                    case 69:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_person_document\" (\"person_document_id\" varchar PRIMARY KEY NOT NULL, \"person_id\" varchar, \"document_type_id\" varchar, \"document_number\" varchar NOT NULL, \"dispatch_date\" date NOT NULL, \"issuing_agency\" varchar NOT NULL, \"person_name\" varchar NOT NULL, \"is_main\" boolean NOT NULL DEFAULT (0), \"createdAtCreated_at\" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT \"UQ_22f90f6cf4077ad225b9f14fddf\" UNIQUE (\"document_type_id\"))")];
                    case 70:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_person_document\"(\"person_document_id\", \"person_id\", \"document_type_id\", \"document_number\", \"dispatch_date\", \"issuing_agency\", \"person_name\", \"is_main\", \"createdAtCreated_at\") SELECT \"person_document_id\", \"person_id\", \"document_type_id\", \"document_number\", \"dispatch_date\", \"issuing_agency\", \"person_name\", \"is_main\", \"createdAtCreated_at\" FROM \"person_document\"")];
                    case 71:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"person_document\"")];
                    case 72:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_person_document\" RENAME TO \"person_document\"")];
                    case 73:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_user_token\" (\"user_token_id\" varchar PRIMARY KEY NOT NULL, \"user_id\" varchar NOT NULL, \"token\" varchar NOT NULL, \"expires_at\" datetime NOT NULL, \"created_at\" datetime NOT NULL DEFAULT (datetime('now')))")];
                    case 74:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_user_token\"(\"user_token_id\", \"user_id\", \"token\", \"expires_at\", \"created_at\") SELECT \"user_token_id\", \"user_id\", \"token\", \"expires_at\", \"created_at\" FROM \"user_token\"")];
                    case 75:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"user_token\"")];
                    case 76:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_user_token\" RENAME TO \"user_token\"")];
                    case 77:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_person\" (\"person_id\" character(36) PRIMARY KEY NOT NULL, \"type\" varchar NOT NULL, \"cellphone\" varchar, \"telephone\" varchar, \"is_valid\" boolean NOT NULL DEFAULT (false), \"valid_at\" timestamp)")];
                    case 78:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_person\"(\"person_id\", \"type\", \"cellphone\", \"telephone\", \"is_valid\", \"valid_at\") SELECT \"person_id\", \"type\", \"cellphone\", \"telephone\", \"is_valid\", \"valid_at\" FROM \"person\"")];
                    case 79:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"person\"")];
                    case 80:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_person\" RENAME TO \"person\"")];
                    case 81:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_user\" (\"user_id\" varchar PRIMARY KEY NOT NULL, \"name\" varchar NOT NULL, \"document\" varchar, \"email\" varchar NOT NULL, \"cellphone\" varchar, \"password\" varchar NOT NULL, \"is_admin\" boolean NOT NULL DEFAULT (0), \"is_valid\" boolean NOT NULL DEFAULT (1), \"is_confirmed\" boolean NOT NULL DEFAULT (0), \"created_at\" datetime NOT NULL DEFAULT (datetime('now')), \"updated_at\" datetime NOT NULL DEFAULT (datetime('now')), \"validated_at\" datetime, \"confirmed_at\" datetime, CONSTRAINT \"UQ_e12875dfb3b1d92d7d7c5377e22\" UNIQUE (\"email\"))")];
                    case 82:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_user\"(\"user_id\", \"name\", \"document\", \"email\", \"cellphone\", \"password\", \"is_admin\", \"is_valid\", \"is_confirmed\", \"created_at\", \"updated_at\", \"validated_at\", \"confirmed_at\") SELECT \"user_id\", \"name\", \"document\", \"email\", \"cellphone\", \"password\", \"is_admin\", \"is_valid\", \"is_confirmed\", \"created_at\", \"updated_at\", \"validated_at\", \"confirmed_at\" FROM \"user\"")];
                    case 83:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"user\"")];
                    case 84:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_user\" RENAME TO \"user\"")];
                    case 85:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_person\" (\"person_id\" varchar PRIMARY KEY NOT NULL, \"type\" varchar NOT NULL, \"cellphone\" varchar NOT NULL, \"telephone\" varchar NOT NULL, \"is_valid\" boolean NOT NULL DEFAULT (0), \"valid_at\" datetime NOT NULL, CONSTRAINT \"UQ_ab7fa85d3ddc83703498fd7cb68\" UNIQUE (\"person_id\"))")];
                    case 86:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_person\"(\"person_id\", \"type\", \"cellphone\", \"telephone\", \"is_valid\", \"valid_at\") SELECT \"person_id\", \"type\", \"cellphone\", \"telephone\", \"is_valid\", \"valid_at\" FROM \"person\"")];
                    case 87:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"person\"")];
                    case 88:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_person\" RENAME TO \"person\"")];
                    case 89:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_person_company\" (\"person_company_id\" varchar NOT NULL, \"fantasy_name\" varchar NOT NULL, \"open_date\" date NOT NULL, \"end_date\" date, \"responsible_name\" varchar NOT NULL, \"person_id\" varchar NOT NULL, \"type\" varchar CHECK( type IN ('F','J','O','A') ) NOT NULL, \"cellphone\" varchar NOT NULL, \"telephone\" varchar NOT NULL, \"is_valid\" boolean NOT NULL DEFAULT (0), \"valid_at\" datetime NOT NULL, CONSTRAINT \"UQ_c81d4a32f21092f299bea4ab76b\" UNIQUE (\"person_id\"), CONSTRAINT \"UQ_9a3dfdefcdcee927b268f3e9f8b\" UNIQUE (\"person_company_id\"), PRIMARY KEY (\"person_company_id\", \"person_id\"))")];
                    case 90:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_person_company\"(\"person_company_id\", \"fantasy_name\", \"open_date\", \"end_date\", \"responsible_name\", \"person_id\", \"type\", \"cellphone\", \"telephone\", \"is_valid\", \"valid_at\") SELECT \"person_company_id\", \"fantasy_name\", \"open_date\", \"end_date\", \"responsible_name\", \"person_id\", \"type\", \"cellphone\", \"telephone\", \"is_valid\", \"valid_at\" FROM \"person_company\"")];
                    case 91:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"person_company\"")];
                    case 92:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_person_company\" RENAME TO \"person_company\"")];
                    case 93:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_person_individual\" (\"person_individual_id\" varchar NOT NULL, \"birthday\" datetime NOT NULL, \"gender\" varchar CHECK( gender IN ('M','F','O') ) NOT NULL, \"ethnicity\" varchar NOT NULL, \"father_name\" varchar NOT NULL, \"mother_name\" varchar NOT NULL, \"civil_status\" varchar NOT NULL, \"person_id\" varchar NOT NULL, \"type\" varchar CHECK( type IN ('F','J','O','A') ) NOT NULL, \"cellphone\" varchar NOT NULL, \"telephone\" varchar NOT NULL, \"is_valid\" boolean NOT NULL DEFAULT (0), \"valid_at\" datetime NOT NULL, CONSTRAINT \"UQ_0b044296ce18446dc7de50e4162\" UNIQUE (\"person_id\"), CONSTRAINT \"UQ_75fe79bf9be8eda468e5c7f8530\" UNIQUE (\"person_individual_id\"), PRIMARY KEY (\"person_individual_id\", \"person_id\"))")];
                    case 94:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_person_individual\"(\"person_individual_id\", \"birthday\", \"gender\", \"ethnicity\", \"father_name\", \"mother_name\", \"civil_status\", \"person_id\", \"type\", \"cellphone\", \"telephone\", \"is_valid\", \"valid_at\") SELECT \"person_individual_id\", \"birthday\", \"gender\", \"ethnicity\", \"father_name\", \"mother_name\", \"civil_status\", \"person_id\", \"type\", \"cellphone\", \"telephone\", \"is_valid\", \"valid_at\" FROM \"person_individual\"")];
                    case 95:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"person_individual\"")];
                    case 96:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_person_individual\" RENAME TO \"person_individual\"")];
                    case 97:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_person_document_file\" (\"person_document_file_id\" varchar PRIMARY KEY NOT NULL, \"person_document_id\" varchar, \"filename\" varchar NOT NULL, \"mimetype\" varchar NOT NULL, CONSTRAINT \"FK_ddb085eb95c0591462de4f706a3\" FOREIGN KEY (\"person_document_id\") REFERENCES \"person_document\" (\"person_document_id\") ON DELETE NO ACTION ON UPDATE NO ACTION)")];
                    case 98:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_person_document_file\"(\"person_document_file_id\", \"person_document_id\", \"filename\", \"mimetype\") SELECT \"person_document_file_id\", \"person_document_id\", \"filename\", \"mimetype\" FROM \"person_document_file\"")];
                    case 99:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"person_document_file\"")];
                    case 100:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_person_document_file\" RENAME TO \"person_document_file\"")];
                    case 101:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_person_document\" (\"person_document_id\" varchar PRIMARY KEY NOT NULL, \"person_id\" varchar, \"document_type_id\" varchar, \"document_number\" varchar NOT NULL, \"dispatch_date\" date NOT NULL, \"issuing_agency\" varchar NOT NULL, \"person_name\" varchar NOT NULL, \"is_main\" boolean NOT NULL DEFAULT (0), \"createdAtCreated_at\" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT \"UQ_22f90f6cf4077ad225b9f14fddf\" UNIQUE (\"document_type_id\"), CONSTRAINT \"FK_3d2eefc8668f687831146947b31\" FOREIGN KEY (\"person_id\") REFERENCES \"person\" (\"person_id\") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT \"FK_06d08640b21137b4a4ac77fa9b1\" FOREIGN KEY (\"document_type_id\") REFERENCES \"document_type\" (\"document_type_id\") ON DELETE NO ACTION ON UPDATE NO ACTION)")];
                    case 102:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_person_document\"(\"person_document_id\", \"person_id\", \"document_type_id\", \"document_number\", \"dispatch_date\", \"issuing_agency\", \"person_name\", \"is_main\", \"createdAtCreated_at\") SELECT \"person_document_id\", \"person_id\", \"document_type_id\", \"document_number\", \"dispatch_date\", \"issuing_agency\", \"person_name\", \"is_main\", \"createdAtCreated_at\" FROM \"person_document\"")];
                    case 103:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"person_document\"")];
                    case 104:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_person_document\" RENAME TO \"person_document\"")];
                    case 105:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_user_token\" (\"user_token_id\" varchar PRIMARY KEY NOT NULL, \"user_id\" varchar NOT NULL, \"token\" varchar NOT NULL, \"expires_at\" datetime NOT NULL, \"created_at\" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT \"FK_79ac751931054ef450a2ee47778\" FOREIGN KEY (\"user_id\") REFERENCES \"user\" (\"user_id\") ON DELETE NO ACTION ON UPDATE NO ACTION)")];
                    case 106:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_user_token\"(\"user_token_id\", \"user_id\", \"token\", \"expires_at\", \"created_at\") SELECT \"user_token_id\", \"user_id\", \"token\", \"expires_at\", \"created_at\" FROM \"user_token\"")];
                    case 107:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"user_token\"")];
                    case 108:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_user_token\" RENAME TO \"user_token\"")];
                    case 109:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_person\" (\"person_id\" varchar PRIMARY KEY NOT NULL, \"type\" varchar NOT NULL, \"cellphone\" varchar NOT NULL, \"telephone\" varchar NOT NULL, \"is_valid\" boolean NOT NULL DEFAULT (0), \"valid_at\" datetime NOT NULL, CONSTRAINT \"UQ_ab7fa85d3ddc83703498fd7cb68\" UNIQUE (\"person_id\"), CONSTRAINT \"FK_403c951c5e9b776c16385a8940f\" FOREIGN KEY (\"person_id\") REFERENCES \"user\" (\"user_id\") ON DELETE NO ACTION ON UPDATE NO ACTION)")];
                    case 110:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_person\"(\"person_id\", \"type\", \"cellphone\", \"telephone\", \"is_valid\", \"valid_at\") SELECT \"person_id\", \"type\", \"cellphone\", \"telephone\", \"is_valid\", \"valid_at\" FROM \"person\"")];
                    case 111:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"person\"")];
                    case 112:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_person\" RENAME TO \"person\"")];
                    case 113:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_person_company\" (\"person_company_id\" varchar NOT NULL, \"fantasy_name\" varchar NOT NULL, \"open_date\" date NOT NULL, \"end_date\" date, \"responsible_name\" varchar NOT NULL, \"person_id\" varchar NOT NULL, \"type\" varchar CHECK( type IN ('F','J','O','A') ) NOT NULL, \"cellphone\" varchar NOT NULL, \"telephone\" varchar NOT NULL, \"is_valid\" boolean NOT NULL DEFAULT (0), \"valid_at\" datetime NOT NULL, CONSTRAINT \"UQ_c81d4a32f21092f299bea4ab76b\" UNIQUE (\"person_id\"), CONSTRAINT \"UQ_9a3dfdefcdcee927b268f3e9f8b\" UNIQUE (\"person_company_id\"), CONSTRAINT \"FK_69b4a66cc3b24c51267e2c44768\" FOREIGN KEY (\"person_id\") REFERENCES \"user\" (\"user_id\") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT \"FK_7da75ef700b766ecea3b1a7f0ca\" FOREIGN KEY (\"person_company_id\") REFERENCES \"person\" (\"person_id\") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY (\"person_company_id\", \"person_id\"))")];
                    case 114:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_person_company\"(\"person_company_id\", \"fantasy_name\", \"open_date\", \"end_date\", \"responsible_name\", \"person_id\", \"type\", \"cellphone\", \"telephone\", \"is_valid\", \"valid_at\") SELECT \"person_company_id\", \"fantasy_name\", \"open_date\", \"end_date\", \"responsible_name\", \"person_id\", \"type\", \"cellphone\", \"telephone\", \"is_valid\", \"valid_at\" FROM \"person_company\"")];
                    case 115:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"person_company\"")];
                    case 116:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_person_company\" RENAME TO \"person_company\"")];
                    case 117:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_person_individual\" (\"person_individual_id\" varchar NOT NULL, \"birthday\" datetime NOT NULL, \"gender\" varchar CHECK( gender IN ('M','F','O') ) NOT NULL, \"ethnicity\" varchar NOT NULL, \"father_name\" varchar NOT NULL, \"mother_name\" varchar NOT NULL, \"civil_status\" varchar NOT NULL, \"person_id\" varchar NOT NULL, \"type\" varchar CHECK( type IN ('F','J','O','A') ) NOT NULL, \"cellphone\" varchar NOT NULL, \"telephone\" varchar NOT NULL, \"is_valid\" boolean NOT NULL DEFAULT (0), \"valid_at\" datetime NOT NULL, CONSTRAINT \"UQ_0b044296ce18446dc7de50e4162\" UNIQUE (\"person_id\"), CONSTRAINT \"UQ_75fe79bf9be8eda468e5c7f8530\" UNIQUE (\"person_individual_id\"), CONSTRAINT \"FK_27d04911dd7036b980d2cf11636\" FOREIGN KEY (\"person_id\") REFERENCES \"user\" (\"user_id\") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT \"FK_6ffe10839f581769aa801882859\" FOREIGN KEY (\"person_individual_id\") REFERENCES \"person\" (\"person_id\") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY (\"person_individual_id\", \"person_id\"))")];
                    case 118:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_person_individual\"(\"person_individual_id\", \"birthday\", \"gender\", \"ethnicity\", \"father_name\", \"mother_name\", \"civil_status\", \"person_id\", \"type\", \"cellphone\", \"telephone\", \"is_valid\", \"valid_at\") SELECT \"person_individual_id\", \"birthday\", \"gender\", \"ethnicity\", \"father_name\", \"mother_name\", \"civil_status\", \"person_id\", \"type\", \"cellphone\", \"telephone\", \"is_valid\", \"valid_at\" FROM \"person_individual\"")];
                    case 119:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"person_individual\"")];
                    case 120:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_person_individual\" RENAME TO \"person_individual\"")];
                    case 121:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_person_data_sent\" (\"person_data_sent_id\" varchar PRIMARY KEY NOT NULL, \"field_name\" varchar NOT NULL, \"old_value\" text NOT NULL, \"new_value\" text NOT NULL, \"user_message\" text NOT NULL, \"is_valid\" boolean NOT NULL DEFAULT (0), \"valid_at\" datetime NOT NULL, \"person_id\" varchar, \"analyst_id\" varchar, \"updated_at\" datetime NOT NULL DEFAULT (datetime('now')), \"created_at\" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT \"FK_110699897ddf3d01e9ae708e8e9\" FOREIGN KEY (\"person_id\") REFERENCES \"person\" (\"person_id\") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT \"FK_cffb270571916505dcf84d8f250\" FOREIGN KEY (\"analyst_id\") REFERENCES \"user\" (\"user_id\") ON DELETE NO ACTION ON UPDATE NO ACTION)")];
                    case 122:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_person_data_sent\"(\"person_data_sent_id\", \"field_name\", \"old_value\", \"new_value\", \"user_message\", \"is_valid\", \"valid_at\", \"person_id\", \"analyst_id\", \"updated_at\", \"created_at\") SELECT \"person_data_sent_id\", \"field_name\", \"old_value\", \"new_value\", \"user_message\", \"is_valid\", \"valid_at\", \"person_id\", \"analyst_id\", \"updated_at\", \"created_at\" FROM \"person_data_sent\"")];
                    case 123:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"person_data_sent\"")];
                    case 124:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_person_data_sent\" RENAME TO \"person_data_sent\"")];
                    case 125:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"query-result-cache\" (\"id\" integer PRIMARY KEY AUTOINCREMENT NOT NULL, \"identifier\" varchar, \"time\" bigint NOT NULL, \"duration\" integer NOT NULL, \"query\" text NOT NULL, \"result\" text NOT NULL)")];
                    case 126:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    PostRefactoringUserAndPerson1627843753711.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, queryRunner.query("DROP TABLE \"query-result-cache\"")];
                    case 1:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"person_data_sent\" RENAME TO \"temporary_person_data_sent\"")];
                    case 2:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"person_data_sent\" (\"person_data_sent_id\" varchar PRIMARY KEY NOT NULL, \"field_name\" varchar NOT NULL, \"old_value\" text NOT NULL, \"new_value\" text NOT NULL, \"user_message\" text NOT NULL, \"is_valid\" boolean NOT NULL DEFAULT (0), \"valid_at\" datetime NOT NULL, \"person_id\" varchar, \"analyst_id\" varchar, \"updated_at\" datetime NOT NULL DEFAULT (datetime('now')), \"created_at\" datetime NOT NULL DEFAULT (datetime('now')))")];
                    case 3:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"person_data_sent\"(\"person_data_sent_id\", \"field_name\", \"old_value\", \"new_value\", \"user_message\", \"is_valid\", \"valid_at\", \"person_id\", \"analyst_id\", \"updated_at\", \"created_at\") SELECT \"person_data_sent_id\", \"field_name\", \"old_value\", \"new_value\", \"user_message\", \"is_valid\", \"valid_at\", \"person_id\", \"analyst_id\", \"updated_at\", \"created_at\" FROM \"temporary_person_data_sent\"")];
                    case 4:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_person_data_sent\"")];
                    case 5:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"person_individual\" RENAME TO \"temporary_person_individual\"")];
                    case 6:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"person_individual\" (\"person_individual_id\" varchar NOT NULL, \"birthday\" datetime NOT NULL, \"gender\" varchar CHECK( gender IN ('M','F','O') ) NOT NULL, \"ethnicity\" varchar NOT NULL, \"father_name\" varchar NOT NULL, \"mother_name\" varchar NOT NULL, \"civil_status\" varchar NOT NULL, \"person_id\" varchar NOT NULL, \"type\" varchar CHECK( type IN ('F','J','O','A') ) NOT NULL, \"cellphone\" varchar NOT NULL, \"telephone\" varchar NOT NULL, \"is_valid\" boolean NOT NULL DEFAULT (0), \"valid_at\" datetime NOT NULL, CONSTRAINT \"UQ_0b044296ce18446dc7de50e4162\" UNIQUE (\"person_id\"), CONSTRAINT \"UQ_75fe79bf9be8eda468e5c7f8530\" UNIQUE (\"person_individual_id\"), PRIMARY KEY (\"person_individual_id\", \"person_id\"))")];
                    case 7:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"person_individual\"(\"person_individual_id\", \"birthday\", \"gender\", \"ethnicity\", \"father_name\", \"mother_name\", \"civil_status\", \"person_id\", \"type\", \"cellphone\", \"telephone\", \"is_valid\", \"valid_at\") SELECT \"person_individual_id\", \"birthday\", \"gender\", \"ethnicity\", \"father_name\", \"mother_name\", \"civil_status\", \"person_id\", \"type\", \"cellphone\", \"telephone\", \"is_valid\", \"valid_at\" FROM \"temporary_person_individual\"")];
                    case 8:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_person_individual\"")];
                    case 9:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"person_company\" RENAME TO \"temporary_person_company\"")];
                    case 10:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"person_company\" (\"person_company_id\" varchar NOT NULL, \"fantasy_name\" varchar NOT NULL, \"open_date\" date NOT NULL, \"end_date\" date, \"responsible_name\" varchar NOT NULL, \"person_id\" varchar NOT NULL, \"type\" varchar CHECK( type IN ('F','J','O','A') ) NOT NULL, \"cellphone\" varchar NOT NULL, \"telephone\" varchar NOT NULL, \"is_valid\" boolean NOT NULL DEFAULT (0), \"valid_at\" datetime NOT NULL, CONSTRAINT \"UQ_c81d4a32f21092f299bea4ab76b\" UNIQUE (\"person_id\"), CONSTRAINT \"UQ_9a3dfdefcdcee927b268f3e9f8b\" UNIQUE (\"person_company_id\"), PRIMARY KEY (\"person_company_id\", \"person_id\"))")];
                    case 11:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"person_company\"(\"person_company_id\", \"fantasy_name\", \"open_date\", \"end_date\", \"responsible_name\", \"person_id\", \"type\", \"cellphone\", \"telephone\", \"is_valid\", \"valid_at\") SELECT \"person_company_id\", \"fantasy_name\", \"open_date\", \"end_date\", \"responsible_name\", \"person_id\", \"type\", \"cellphone\", \"telephone\", \"is_valid\", \"valid_at\" FROM \"temporary_person_company\"")];
                    case 12:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_person_company\"")];
                    case 13:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"person\" RENAME TO \"temporary_person\"")];
                    case 14:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"person\" (\"person_id\" varchar PRIMARY KEY NOT NULL, \"type\" varchar NOT NULL, \"cellphone\" varchar NOT NULL, \"telephone\" varchar NOT NULL, \"is_valid\" boolean NOT NULL DEFAULT (0), \"valid_at\" datetime NOT NULL, CONSTRAINT \"UQ_ab7fa85d3ddc83703498fd7cb68\" UNIQUE (\"person_id\"))")];
                    case 15:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"person\"(\"person_id\", \"type\", \"cellphone\", \"telephone\", \"is_valid\", \"valid_at\") SELECT \"person_id\", \"type\", \"cellphone\", \"telephone\", \"is_valid\", \"valid_at\" FROM \"temporary_person\"")];
                    case 16:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_person\"")];
                    case 17:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"user_token\" RENAME TO \"temporary_user_token\"")];
                    case 18:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"user_token\" (\"user_token_id\" varchar PRIMARY KEY NOT NULL, \"user_id\" varchar NOT NULL, \"token\" varchar NOT NULL, \"expires_at\" datetime NOT NULL, \"created_at\" datetime NOT NULL DEFAULT (datetime('now')))")];
                    case 19:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"user_token\"(\"user_token_id\", \"user_id\", \"token\", \"expires_at\", \"created_at\") SELECT \"user_token_id\", \"user_id\", \"token\", \"expires_at\", \"created_at\" FROM \"temporary_user_token\"")];
                    case 20:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_user_token\"")];
                    case 21:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"person_document\" RENAME TO \"temporary_person_document\"")];
                    case 22:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"person_document\" (\"person_document_id\" varchar PRIMARY KEY NOT NULL, \"person_id\" varchar, \"document_type_id\" varchar, \"document_number\" varchar NOT NULL, \"dispatch_date\" date NOT NULL, \"issuing_agency\" varchar NOT NULL, \"person_name\" varchar NOT NULL, \"is_main\" boolean NOT NULL DEFAULT (0), \"createdAtCreated_at\" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT \"UQ_22f90f6cf4077ad225b9f14fddf\" UNIQUE (\"document_type_id\"))")];
                    case 23:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"person_document\"(\"person_document_id\", \"person_id\", \"document_type_id\", \"document_number\", \"dispatch_date\", \"issuing_agency\", \"person_name\", \"is_main\", \"createdAtCreated_at\") SELECT \"person_document_id\", \"person_id\", \"document_type_id\", \"document_number\", \"dispatch_date\", \"issuing_agency\", \"person_name\", \"is_main\", \"createdAtCreated_at\" FROM \"temporary_person_document\"")];
                    case 24:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_person_document\"")];
                    case 25:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"person_document_file\" RENAME TO \"temporary_person_document_file\"")];
                    case 26:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"person_document_file\" (\"person_document_file_id\" varchar PRIMARY KEY NOT NULL, \"person_document_id\" varchar, \"filename\" varchar NOT NULL, \"mimetype\" varchar NOT NULL)")];
                    case 27:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"person_document_file\"(\"person_document_file_id\", \"person_document_id\", \"filename\", \"mimetype\") SELECT \"person_document_file_id\", \"person_document_id\", \"filename\", \"mimetype\" FROM \"temporary_person_document_file\"")];
                    case 28:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_person_document_file\"")];
                    case 29:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"person_individual\" RENAME TO \"temporary_person_individual\"")];
                    case 30:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"person_individual\" (\"person_individual_id\" character(36) NOT NULL, \"birthday\" date NOT NULL, \"gender\" character(1) NOT NULL, \"ethnicity\" varchar NOT NULL, \"father_name\" varchar, \"mother_name\" varchar, \"civil_status\" varchar NOT NULL, \"person_id\" varchar NOT NULL, \"type\" varchar CHECK( type IN ('F','J','O','A') ) NOT NULL, \"cellphone\" varchar NOT NULL, \"telephone\" varchar NOT NULL, \"is_valid\" boolean NOT NULL DEFAULT (0), \"valid_at\" datetime NOT NULL, CONSTRAINT \"UQ_0b044296ce18446dc7de50e4162\" UNIQUE (\"person_id\"), PRIMARY KEY (\"person_individual_id\", \"person_id\"))")];
                    case 31:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"person_individual\"(\"person_individual_id\", \"birthday\", \"gender\", \"ethnicity\", \"father_name\", \"mother_name\", \"civil_status\", \"person_id\", \"type\", \"cellphone\", \"telephone\", \"is_valid\", \"valid_at\") SELECT \"person_individual_id\", \"birthday\", \"gender\", \"ethnicity\", \"father_name\", \"mother_name\", \"civil_status\", \"person_id\", \"type\", \"cellphone\", \"telephone\", \"is_valid\", \"valid_at\" FROM \"temporary_person_individual\"")];
                    case 32:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_person_individual\"")];
                    case 33:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"person_company\" RENAME TO \"temporary_person_company\"")];
                    case 34:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"person_company\" (\"person_company_id\" character(36) NOT NULL, \"fantasy_name\" varchar, \"open_date\" date NOT NULL, \"end_date\" date, \"responsible_name\" varchar, \"person_id\" varchar NOT NULL, \"type\" varchar CHECK( type IN ('F','J','O','A') ) NOT NULL, \"cellphone\" varchar NOT NULL, \"telephone\" varchar NOT NULL, \"is_valid\" boolean NOT NULL DEFAULT (0), \"valid_at\" datetime NOT NULL, CONSTRAINT \"UQ_c81d4a32f21092f299bea4ab76b\" UNIQUE (\"person_id\"), PRIMARY KEY (\"person_company_id\", \"person_id\"))")];
                    case 35:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"person_company\"(\"person_company_id\", \"fantasy_name\", \"open_date\", \"end_date\", \"responsible_name\", \"person_id\", \"type\", \"cellphone\", \"telephone\", \"is_valid\", \"valid_at\") SELECT \"person_company_id\", \"fantasy_name\", \"open_date\", \"end_date\", \"responsible_name\", \"person_id\", \"type\", \"cellphone\", \"telephone\", \"is_valid\", \"valid_at\" FROM \"temporary_person_company\"")];
                    case 36:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_person_company\"")];
                    case 37:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"person\" RENAME TO \"temporary_person\"")];
                    case 38:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"person\" (\"person_id\" character(36) PRIMARY KEY NOT NULL, \"type\" varchar NOT NULL, \"cellphone\" varchar, \"telephone\" varchar, \"is_valid\" boolean NOT NULL DEFAULT (false), \"valid_at\" timestamp)")];
                    case 39:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"person\"(\"person_id\", \"type\", \"cellphone\", \"telephone\", \"is_valid\", \"valid_at\") SELECT \"person_id\", \"type\", \"cellphone\", \"telephone\", \"is_valid\", \"valid_at\" FROM \"temporary_person\"")];
                    case 40:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_person\"")];
                    case 41:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"user\" RENAME TO \"temporary_user\"")];
                    case 42:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"user\" (\"user_id\" character(36) PRIMARY KEY NOT NULL, \"name\" varchar NOT NULL, \"document\" varchar, \"email\" varchar NOT NULL, \"cellphone\" varchar, \"password\" varchar NOT NULL, \"is_admin\" boolean NOT NULL DEFAULT (false), \"is_valid\" boolean NOT NULL DEFAULT (true), \"is_confirmed\" boolean NOT NULL DEFAULT (false), \"created_at\" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP), \"updated_at\" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP), \"validated_at\" datetime, \"confirmed_at\" datetime, CONSTRAINT \"UQ_e12875dfb3b1d92d7d7c5377e22\" UNIQUE (\"email\"))")];
                    case 43:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"user\"(\"user_id\", \"name\", \"document\", \"email\", \"cellphone\", \"password\", \"is_admin\", \"is_valid\", \"is_confirmed\", \"created_at\", \"updated_at\", \"validated_at\", \"confirmed_at\") SELECT \"user_id\", \"name\", \"document\", \"email\", \"cellphone\", \"password\", \"is_admin\", \"is_valid\", \"is_confirmed\", \"created_at\", \"updated_at\", \"validated_at\", \"confirmed_at\" FROM \"temporary_user\"")];
                    case 44:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_user\"")];
                    case 45:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"person\" RENAME TO \"temporary_person\"")];
                    case 46:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"person\" (\"person_id\" character(36) PRIMARY KEY NOT NULL, \"type\" varchar NOT NULL, \"cellphone\" varchar, \"telephone\" varchar, \"is_valid\" boolean NOT NULL DEFAULT (false), \"valid_at\" timestamp, CONSTRAINT \"FK_403c951c5e9b776c16385a8940f\" FOREIGN KEY (\"person_id\") REFERENCES \"user\" (\"user_id\") ON DELETE NO ACTION ON UPDATE NO ACTION)")];
                    case 47:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"person\"(\"person_id\", \"type\", \"cellphone\", \"telephone\", \"is_valid\", \"valid_at\") SELECT \"person_id\", \"type\", \"cellphone\", \"telephone\", \"is_valid\", \"valid_at\" FROM \"temporary_person\"")];
                    case 48:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_person\"")];
                    case 49:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"user_token\" RENAME TO \"temporary_user_token\"")];
                    case 50:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"user_token\" (\"user_token_id\" character(36) PRIMARY KEY NOT NULL, \"user_id\" character(36) NOT NULL, \"token\" varchar NOT NULL, \"expires_at\" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP), \"created_at\" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP))")];
                    case 51:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"user_token\"(\"user_token_id\", \"user_id\", \"token\", \"expires_at\", \"created_at\") SELECT \"user_token_id\", \"user_id\", \"token\", \"expires_at\", \"created_at\" FROM \"temporary_user_token\"")];
                    case 52:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_user_token\"")];
                    case 53:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"person_document\" RENAME TO \"temporary_person_document\"")];
                    case 54:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"person_document\" (\"person_document_id\" character(36) PRIMARY KEY NOT NULL, \"person_id\" character(36) NOT NULL, \"document_type_id\" character(36) NOT NULL, \"document_number\" varchar(100) NOT NULL, \"dispatch_date\" date, \"issuing_agency\" varchar(30), \"person_name\" varchar(100) NOT NULL, \"is_main\" boolean NOT NULL DEFAULT (false), \"createdAtCreated_at\" datetime NOT NULL DEFAULT (datetime('now')))")];
                    case 55:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"person_document\"(\"person_document_id\", \"person_id\", \"document_type_id\", \"document_number\", \"dispatch_date\", \"issuing_agency\", \"person_name\", \"is_main\", \"createdAtCreated_at\") SELECT \"person_document_id\", \"person_id\", \"document_type_id\", \"document_number\", \"dispatch_date\", \"issuing_agency\", \"person_name\", \"is_main\", \"createdAtCreated_at\" FROM \"temporary_person_document\"")];
                    case 56:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_person_document\"")];
                    case 57:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"person_document\" RENAME TO \"temporary_person_document\"")];
                    case 58:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"person_document\" (\"person_document_id\" character(36) PRIMARY KEY NOT NULL, \"person_id\" character(36) NOT NULL, \"document_type_id\" character(36) NOT NULL, \"document_number\" varchar(100) NOT NULL, \"dispatch_date\" date, \"issuing_agency\" varchar(30), \"person_name\" varchar(100) NOT NULL, \"is_main\" boolean NOT NULL DEFAULT (false), \"createdAtCreated_at\" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT \"FK_3d2eefc8668f687831146947b31\" FOREIGN KEY (\"person_id\") REFERENCES \"person\" (\"person_id\") ON DELETE NO ACTION ON UPDATE NO ACTION)")];
                    case 59:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"person_document\"(\"person_document_id\", \"person_id\", \"document_type_id\", \"document_number\", \"dispatch_date\", \"issuing_agency\", \"person_name\", \"is_main\", \"createdAtCreated_at\") SELECT \"person_document_id\", \"person_id\", \"document_type_id\", \"document_number\", \"dispatch_date\", \"issuing_agency\", \"person_name\", \"is_main\", \"createdAtCreated_at\" FROM \"temporary_person_document\"")];
                    case 60:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_person_document\"")];
                    case 61:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"person_document_file\" RENAME TO \"temporary_person_document_file\"")];
                    case 62:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"person_document_file\" (\"person_document_file_id\" character(36) PRIMARY KEY NOT NULL, \"person_document_id\" character(36) NOT NULL, \"filename\" text NOT NULL, \"mimetype\" varchar NOT NULL)")];
                    case 63:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"person_document_file\"(\"person_document_file_id\", \"person_document_id\", \"filename\", \"mimetype\") SELECT \"person_document_file_id\", \"person_document_id\", \"filename\", \"mimetype\" FROM \"temporary_person_document_file\"")];
                    case 64:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_person_document_file\"")];
                    case 65:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"person_document_file\" RENAME TO \"temporary_person_document_file\"")];
                    case 66:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"person_document_file\" (\"person_document_file_id\" character(36) PRIMARY KEY NOT NULL, \"person_document_id\" character(36) NOT NULL, \"filename\" text NOT NULL, \"mimetype\" varchar NOT NULL, CONSTRAINT \"FK_ddb085eb95c0591462de4f706a3\" FOREIGN KEY (\"person_document_id\") REFERENCES \"person_document\" (\"person_document_id\") ON DELETE NO ACTION ON UPDATE NO ACTION)")];
                    case 67:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"person_document_file\"(\"person_document_file_id\", \"person_document_id\", \"filename\", \"mimetype\") SELECT \"person_document_file_id\", \"person_document_id\", \"filename\", \"mimetype\" FROM \"temporary_person_document_file\"")];
                    case 68:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_person_document_file\"")];
                    case 69:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"document_type\" RENAME TO \"temporary_document_type\"")];
                    case 70:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"document_type\" (\"initials\" varchar(10), \"description\" text NOT NULL, \"person_type\" character(1) NOT NULL, \"mask\" varchar, \"is_main\" boolean NOT NULL DEFAULT (false), \"document_type_id\" varchar PRIMARY KEY NOT NULL)")];
                    case 71:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"document_type\"(\"initials\", \"description\", \"person_type\", \"mask\", \"is_main\", \"document_type_id\") SELECT \"initials\", \"description\", \"person_type\", \"mask\", \"is_main\", \"document_type_id\" FROM \"temporary_document_type\"")];
                    case 72:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_document_type\"")];
                    case 73:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"person_individual\" RENAME TO \"temporary_person_individual\"")];
                    case 74:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"person_individual\" (\"person_individual_id\" character(36) PRIMARY KEY NOT NULL, \"birthday\" date NOT NULL, \"gender\" character(1) NOT NULL, \"ethnicity\" varchar NOT NULL, \"father_name\" varchar, \"mother_name\" varchar, \"civil_status\" varchar NOT NULL)")];
                    case 75:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"person_individual\"(\"person_individual_id\", \"birthday\", \"gender\", \"ethnicity\", \"father_name\", \"mother_name\", \"civil_status\") SELECT \"person_individual_id\", \"birthday\", \"gender\", \"ethnicity\", \"father_name\", \"mother_name\", \"civil_status\" FROM \"temporary_person_individual\"")];
                    case 76:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_person_individual\"")];
                    case 77:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"person_company\" RENAME TO \"temporary_person_company\"")];
                    case 78:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"person_company\" (\"person_company_id\" character(36) PRIMARY KEY NOT NULL, \"fantasy_name\" varchar, \"open_date\" date NOT NULL, \"end_date\" date, \"responsible_name\" varchar)")];
                    case 79:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"person_company\"(\"person_company_id\", \"fantasy_name\", \"open_date\", \"end_date\", \"responsible_name\") SELECT \"person_company_id\", \"fantasy_name\", \"open_date\", \"end_date\", \"responsible_name\" FROM \"temporary_person_company\"")];
                    case 80:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_person_company\"")];
                    case 81:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"user\" RENAME TO \"temporary_user\"")];
                    case 82:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"user\" (\"user_id\" character(36) PRIMARY KEY NOT NULL, \"name\" varchar NOT NULL, \"document\" varchar, \"email\" varchar NOT NULL, \"cellphone\" varchar, \"password\" varchar NOT NULL, \"is_admin\" boolean NOT NULL DEFAULT (false), \"is_valid\" boolean NOT NULL DEFAULT (true), \"is_confirmed\" boolean NOT NULL DEFAULT (false), \"created_at\" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP), \"updated_at\" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT \"UQ_e12875dfb3b1d92d7d7c5377e22\" UNIQUE (\"email\"))")];
                    case 83:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"user\"(\"user_id\", \"name\", \"document\", \"email\", \"cellphone\", \"password\", \"is_admin\", \"is_valid\", \"is_confirmed\", \"created_at\", \"updated_at\") SELECT \"user_id\", \"name\", \"document\", \"email\", \"cellphone\", \"password\", \"is_admin\", \"is_valid\", \"is_confirmed\", \"created_at\", \"updated_at\" FROM \"temporary_user\"")];
                    case 84:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_user\"")];
                    case 85:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"person_document\" RENAME TO \"temporary_person_document\"")];
                    case 86:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"person_document\" (\"person_document_id\" character(36) PRIMARY KEY NOT NULL, \"person_id\" character(36) NOT NULL, \"document_type_id\" character(36) NOT NULL, \"document_number\" varchar(100) NOT NULL, \"dispatch_date\" date, \"issuing_agency\" varchar(30), \"person_name\" varchar(100) NOT NULL, \"is_main\" boolean NOT NULL DEFAULT (false), CONSTRAINT \"FK_06d08640b21137b4a4ac77fa9b1\" FOREIGN KEY (\"document_type_id\") REFERENCES \"document_type\" (\"document_type_id\") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT \"FK_3d2eefc8668f687831146947b31\" FOREIGN KEY (\"person_id\") REFERENCES \"person\" (\"person_id\") ON DELETE NO ACTION ON UPDATE NO ACTION)")];
                    case 87:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"person_document\"(\"person_document_id\", \"person_id\", \"document_type_id\", \"document_number\", \"dispatch_date\", \"issuing_agency\", \"person_name\", \"is_main\") SELECT \"person_document_id\", \"person_id\", \"document_type_id\", \"document_number\", \"dispatch_date\", \"issuing_agency\", \"person_name\", \"is_main\" FROM \"temporary_person_document\"")];
                    case 88:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_person_document\"")];
                    case 89:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"document_type\" RENAME TO \"temporary_document_type\"")];
                    case 90:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"document_type\" (\"initials\" varchar(10), \"description\" text NOT NULL, \"person_type\" character(1) NOT NULL, \"mask\" varchar, \"is_main\" boolean NOT NULL DEFAULT (false))")];
                    case 91:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"document_type\"(\"initials\", \"description\", \"person_type\", \"mask\", \"is_main\") SELECT \"initials\", \"description\", \"person_type\", \"mask\", \"is_main\" FROM \"temporary_document_type\"")];
                    case 92:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_document_type\"")];
                    case 93:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"person_company\" RENAME TO \"temporary_person_company\"")];
                    case 94:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"person_company\" (\"person_company_id\" character(36) PRIMARY KEY NOT NULL, \"fantasy_name\" varchar, \"open_date\" date NOT NULL, \"end_date\" date, \"responsible_document_id\" character(36), \"responsible_name\" varchar)")];
                    case 95:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"person_company\"(\"person_company_id\", \"fantasy_name\", \"open_date\", \"end_date\", \"responsible_name\") SELECT \"person_company_id\", \"fantasy_name\", \"open_date\", \"end_date\", \"responsible_name\" FROM \"temporary_person_company\"")];
                    case 96:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_person_company\"")];
                    case 97:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"document_type\" RENAME TO \"temporary_document_type\"")];
                    case 98:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"document_type\" (\"documento_type_id\" character(36) PRIMARY KEY NOT NULL, \"initials\" varchar(10), \"description\" text NOT NULL, \"person_type\" character(1) NOT NULL, \"mask\" varchar, \"is_main\" boolean NOT NULL DEFAULT (false))")];
                    case 99:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"document_type\"(\"initials\", \"description\", \"person_type\", \"mask\", \"is_main\") SELECT \"initials\", \"description\", \"person_type\", \"mask\", \"is_main\" FROM \"temporary_document_type\"")];
                    case 100:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_document_type\"")];
                    case 101:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"person_data_sent\"")];
                    case 102:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"person_individual\" RENAME TO \"temporary_person_individual\"")];
                    case 103:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"person_individual\" (\"person_individual_id\" character(36) PRIMARY KEY NOT NULL, \"birthday\" date NOT NULL, \"gender\" character(1) NOT NULL, \"ethnicity\" varchar NOT NULL, \"father_name\" varchar, \"mother_name\" varchar, \"civil_status\" varchar NOT NULL, CONSTRAINT \"ck_gender_person_individual\" CHECK ((gender IN('M','F','O'))), CONSTRAINT \"ck_ethnicity_person_individual\" CHECK ((ethnicity IN('AFRODESCENDENTE','BRANCO','ASI\u00C1TICO','AMER\u00CDNDIO','MULATO','MULTIRRACIAL/PARDO','N\u00C3O DECLARADA'))), CONSTRAINT \"ck_civil_status_person_individual\" CHECK ((civil_status IN('SOLTEIRO','UNI\u00C3O EST\u00C1VEL','CASADO','SEPARADO','DIVORCIADO','VI\u00DAVO'))))")];
                    case 104:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"person_individual\"(\"person_individual_id\", \"birthday\", \"gender\", \"ethnicity\", \"father_name\", \"mother_name\", \"civil_status\") SELECT \"person_individual_id\", \"birthday\", \"gender\", \"ethnicity\", \"father_name\", \"mother_name\", \"civil_status\" FROM \"temporary_person_individual\"")];
                    case 105:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_person_individual\"")];
                    case 106:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"person\" RENAME TO \"temporary_person\"")];
                    case 107:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"person\" (\"person_id\" character(36) PRIMARY KEY NOT NULL, \"type\" varchar NOT NULL, \"cellphone\" varchar, \"telephone\" varchar, \"is_valid\" boolean NOT NULL DEFAULT (false), \"valid_at\" timestamp, CONSTRAINT \"ck_type_person\" CHECK ((type IN ('F','J','O','A'))), CONSTRAINT \"FK_403c951c5e9b776c16385a8940f\" FOREIGN KEY (\"person_id\") REFERENCES \"user\" (\"user_id\") ON DELETE NO ACTION ON UPDATE NO ACTION)")];
                    case 108:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"person\"(\"person_id\", \"type\", \"cellphone\", \"telephone\", \"is_valid\", \"valid_at\") SELECT \"person_id\", \"type\", \"cellphone\", \"telephone\", \"is_valid\", \"valid_at\" FROM \"temporary_person\"")];
                    case 109:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_person\"")];
                    case 110:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"document_type\" RENAME TO \"temporary_document_type\"")];
                    case 111:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"document_type\" (\"documento_type_id\" character(36) PRIMARY KEY NOT NULL, \"initials\" varchar(10), \"description\" text NOT NULL, \"person_type\" character(1) NOT NULL, \"mask\" varchar, \"is_main\" boolean NOT NULL DEFAULT (false), CONSTRAINT \"ck_person_type_document_type\" CHECK ((person_type IN ('F','J','T'))))")];
                    case 112:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"document_type\"(\"documento_type_id\", \"initials\", \"description\", \"person_type\", \"mask\", \"is_main\") SELECT \"documento_type_id\", \"initials\", \"description\", \"person_type\", \"mask\", \"is_main\" FROM \"temporary_document_type\"")];
                    case 113:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_document_type\"")];
                    case 114:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"person_individual\" RENAME TO \"temporary_person_individual\"")];
                    case 115:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"person_individual\" (\"person_individual_id\" character(36) PRIMARY KEY NOT NULL, \"birthday\" date NOT NULL, \"gender\" character(1) NOT NULL, \"ethnicity\" varchar NOT NULL, \"father_name\" varchar, \"mother_name\" varchar, \"civil_status\" varchar NOT NULL, CONSTRAINT \"ck_gender_person_individual\" CHECK ((gender IN('M','F','O'))), CONSTRAINT \"ck_ethnicity_person_individual\" CHECK ((ethnicity IN('AFRODESCENDENTE','BRANCO','ASI\u00C1TICO','AMER\u00CDNDIO','MULATO','MULTIRRACIAL/PARDO','N\u00C3O DECLARADA'))), CONSTRAINT \"ck_civil_status_person_individual\" CHECK ((civil_status IN('SOLTEIRO','UNI\u00C3O EST\u00C1VEL','CASADO','SEPARADO','DIVORCIADO','VI\u00DAVO'))), CONSTRAINT \"FK_6ffe10839f581769aa801882859\" FOREIGN KEY (\"person_individual_id\") REFERENCES \"person\" (\"person_id\") ON DELETE CASCADE ON UPDATE CASCADE)")];
                    case 116:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"person_individual\"(\"person_individual_id\", \"birthday\", \"gender\", \"ethnicity\", \"father_name\", \"mother_name\", \"civil_status\") SELECT \"person_individual_id\", \"birthday\", \"gender\", \"ethnicity\", \"father_name\", \"mother_name\", \"civil_status\" FROM \"temporary_person_individual\"")];
                    case 117:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_person_individual\"")];
                    case 118:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"person_company\" RENAME TO \"temporary_person_company\"")];
                    case 119:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"person_company\" (\"person_company_id\" character(36) PRIMARY KEY NOT NULL, \"fantasy_name\" varchar, \"open_date\" date NOT NULL, \"end_date\" date, \"responsible_document_id\" character(36), \"responsible_name\" varchar, CONSTRAINT \"FK_b1c35629b5d9eaab44f7a28b008\" FOREIGN KEY (\"responsible_document_id\") REFERENCES \"person_document\" (\"person_document_id\") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT \"FK_7da75ef700b766ecea3b1a7f0ca\" FOREIGN KEY (\"person_company_id\") REFERENCES \"person\" (\"person_id\") ON DELETE CASCADE ON UPDATE CASCADE)")];
                    case 120:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"person_company\"(\"person_company_id\", \"fantasy_name\", \"open_date\", \"end_date\", \"responsible_document_id\", \"responsible_name\") SELECT \"person_company_id\", \"fantasy_name\", \"open_date\", \"end_date\", \"responsible_document_id\", \"responsible_name\" FROM \"temporary_person_company\"")];
                    case 121:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_person_company\"")];
                    case 122:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"user_token\" RENAME TO \"temporary_user_token\"")];
                    case 123:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"user_token\" (\"user_token_id\" character(36) PRIMARY KEY NOT NULL, \"user_id\" character(36) NOT NULL, \"token\" varchar NOT NULL, \"expires_at\" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP), \"created_at\" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT \"FK_79ac751931054ef450a2ee47778\" FOREIGN KEY (\"user_id\") REFERENCES \"user\" (\"user_id\") ON DELETE CASCADE ON UPDATE CASCADE)")];
                    case 124:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"user_token\"(\"user_token_id\", \"user_id\", \"token\", \"expires_at\", \"created_at\") SELECT \"user_token_id\", \"user_id\", \"token\", \"expires_at\", \"created_at\" FROM \"temporary_user_token\"")];
                    case 125:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_user_token\"")];
                    case 126:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return PostRefactoringUserAndPerson1627843753711;
}());
exports.PostRefactoringUserAndPerson1627843753711 = PostRefactoringUserAndPerson1627843753711;
