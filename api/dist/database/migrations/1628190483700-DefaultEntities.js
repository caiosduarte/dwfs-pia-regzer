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
exports.DefaultEntities1628190483700 = void 0;
var DefaultEntities1628190483700 = (function () {
    function DefaultEntities1628190483700() {
        this.name = "DefaultEntities1628190483700";
    }
    DefaultEntities1628190483700.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, queryRunner.query("CREATE TABLE \"user_token\" (\"user_token_id\" varchar PRIMARY KEY NOT NULL, \"user_id\" varchar NOT NULL, \"token\" varchar NOT NULL, \"expires_at\" datetime NOT NULL, \"created_at\" datetime NOT NULL DEFAULT (datetime('now')))")];
                    case 1:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"user\" (\"user_id\" varchar PRIMARY KEY NOT NULL, \"name\" varchar NOT NULL, \"document\" varchar, \"email\" varchar NOT NULL, \"cellphone\" varchar, \"password\" varchar NOT NULL, \"is_admin\" boolean NOT NULL DEFAULT (0), \"validated_at\" datetime, \"confirmed_at\" datetime, \"created_at\" datetime NOT NULL DEFAULT (datetime('now')), \"updated_at\" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT \"UQ_71fdad8489d3d818ec393e6eb14\" UNIQUE (\"document\"), CONSTRAINT \"UQ_e12875dfb3b1d92d7d7c5377e22\" UNIQUE (\"email\"), CONSTRAINT \"UQ_65964723c91566b00580a6cf222\" UNIQUE (\"cellphone\"))")];
                    case 2:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"person\" (\"person_id\" varchar PRIMARY KEY NOT NULL, \"type\" varchar CHECK( type IN ('F','J','O','A') ) NOT NULL, \"cellphone\" varchar, \"telephone\" varchar, \"validated_at\" datetime, \"fantasy_name\" varchar, \"open_date\" date, \"end_date\" date, \"responsible_name\" varchar, \"birthday\" datetime, \"gender\" varchar CHECK( gender IN ('M','F','O') ), \"ethnicity\" varchar CHECK( ethnicity IN ('AFRODESCENDENTE','BRANCO','ASI\u00C1TICO','AMER\u00CDNDIO','MULATO','MULTIRRACIAL/PARDO','N\u00C3O DECLARADA') ) DEFAULT ('N\u00C3O DECLARADA'), \"mother_name\" varchar, \"father_name\" varchar, \"civil_status\" varchar CHECK( civil_status IN ('SOLTEIRO','UNI\u00C3O EST\u00C1VEL','CASADO','SEPARADO','DIVORCIADO','VI\u00DAVO') ), CONSTRAINT \"REL_403c951c5e9b776c16385a8940\" UNIQUE (\"person_id\"))")];
                    case 3:
                        _a.sent();
                        return [4, queryRunner.query("CREATE INDEX \"IDX_7968479009dcf6ffc61af19ae2\" ON \"person\" (\"type\") ")];
                    case 4:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"document_type\" (\"document_type_id\" varchar PRIMARY KEY NOT NULL, \"initials\" varchar NOT NULL, \"description\" varchar NOT NULL, \"person_type\" varchar CHECK( person_type IN ('F','J','T') ) NOT NULL, \"mask\" varchar NOT NULL, \"is_main\" boolean NOT NULL)")];
                    case 5:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"person_document_file\" (\"person_document_file_id\" varchar PRIMARY KEY NOT NULL, \"person_document_id\" varchar NOT NULL, \"filename\" varchar NOT NULL, \"mimetype\" varchar NOT NULL)")];
                    case 6:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"person_document\" (\"person_document_id\" varchar PRIMARY KEY NOT NULL, \"document_number\" varchar NOT NULL, \"dispatch_date\" date NOT NULL, \"issuing_agency\" varchar NOT NULL, \"person_name\" varchar NOT NULL, \"is_main\" boolean NOT NULL DEFAULT (0), \"person_id\" varchar, \"document_type_id\" varchar, \"createdAtCreated_at\" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT \"REL_06d08640b21137b4a4ac77fa9b\" UNIQUE (\"document_type_id\"))")];
                    case 7:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_user_token\" (\"user_token_id\" varchar PRIMARY KEY NOT NULL, \"user_id\" varchar NOT NULL, \"token\" varchar NOT NULL, \"expires_at\" datetime NOT NULL, \"created_at\" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT \"FK_79ac751931054ef450a2ee47778\" FOREIGN KEY (\"user_id\") REFERENCES \"user\" (\"user_id\") ON DELETE CASCADE ON UPDATE CASCADE)")];
                    case 8:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_user_token\"(\"user_token_id\", \"user_id\", \"token\", \"expires_at\", \"created_at\") SELECT \"user_token_id\", \"user_id\", \"token\", \"expires_at\", \"created_at\" FROM \"user_token\"")];
                    case 9:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"user_token\"")];
                    case 10:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_user_token\" RENAME TO \"user_token\"")];
                    case 11:
                        _a.sent();
                        return [4, queryRunner.query("DROP INDEX \"IDX_7968479009dcf6ffc61af19ae2\"")];
                    case 12:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_person\" (\"person_id\" varchar PRIMARY KEY NOT NULL, \"type\" varchar CHECK( type IN ('F','J','O','A') ) NOT NULL, \"cellphone\" varchar, \"telephone\" varchar, \"validated_at\" datetime, \"fantasy_name\" varchar, \"open_date\" date, \"end_date\" date, \"responsible_name\" varchar, \"birthday\" datetime, \"gender\" varchar CHECK( gender IN ('M','F','O') ), \"ethnicity\" varchar CHECK( ethnicity IN ('AFRODESCENDENTE','BRANCO','ASI\u00C1TICO','AMER\u00CDNDIO','MULATO','MULTIRRACIAL/PARDO','N\u00C3O DECLARADA') ) DEFAULT ('N\u00C3O DECLARADA'), \"mother_name\" varchar, \"father_name\" varchar, \"civil_status\" varchar CHECK( civil_status IN ('SOLTEIRO','UNI\u00C3O EST\u00C1VEL','CASADO','SEPARADO','DIVORCIADO','VI\u00DAVO') ), CONSTRAINT \"REL_403c951c5e9b776c16385a8940\" UNIQUE (\"person_id\"), CONSTRAINT \"FK_403c951c5e9b776c16385a8940f\" FOREIGN KEY (\"person_id\") REFERENCES \"user\" (\"user_id\") ON DELETE CASCADE ON UPDATE CASCADE)")];
                    case 13:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_person\"(\"person_id\", \"type\", \"cellphone\", \"telephone\", \"validated_at\", \"fantasy_name\", \"open_date\", \"end_date\", \"responsible_name\", \"birthday\", \"gender\", \"ethnicity\", \"mother_name\", \"father_name\", \"civil_status\") SELECT \"person_id\", \"type\", \"cellphone\", \"telephone\", \"validated_at\", \"fantasy_name\", \"open_date\", \"end_date\", \"responsible_name\", \"birthday\", \"gender\", \"ethnicity\", \"mother_name\", \"father_name\", \"civil_status\" FROM \"person\"")];
                    case 14:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"person\"")];
                    case 15:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_person\" RENAME TO \"person\"")];
                    case 16:
                        _a.sent();
                        return [4, queryRunner.query("CREATE INDEX \"IDX_7968479009dcf6ffc61af19ae2\" ON \"person\" (\"type\") ")];
                    case 17:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_person_document_file\" (\"person_document_file_id\" varchar PRIMARY KEY NOT NULL, \"person_document_id\" varchar NOT NULL, \"filename\" varchar NOT NULL, \"mimetype\" varchar NOT NULL, CONSTRAINT \"FK_ddb085eb95c0591462de4f706a3\" FOREIGN KEY (\"person_document_id\") REFERENCES \"person_document\" (\"person_document_id\") ON DELETE CASCADE ON UPDATE CASCADE)")];
                    case 18:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_person_document_file\"(\"person_document_file_id\", \"person_document_id\", \"filename\", \"mimetype\") SELECT \"person_document_file_id\", \"person_document_id\", \"filename\", \"mimetype\" FROM \"person_document_file\"")];
                    case 19:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"person_document_file\"")];
                    case 20:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_person_document_file\" RENAME TO \"person_document_file\"")];
                    case 21:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"temporary_person_document\" (\"person_document_id\" varchar PRIMARY KEY NOT NULL, \"document_number\" varchar NOT NULL, \"dispatch_date\" date NOT NULL, \"issuing_agency\" varchar NOT NULL, \"person_name\" varchar NOT NULL, \"is_main\" boolean NOT NULL DEFAULT (0), \"person_id\" varchar, \"document_type_id\" varchar, \"createdAtCreated_at\" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT \"REL_06d08640b21137b4a4ac77fa9b\" UNIQUE (\"document_type_id\"), CONSTRAINT \"FK_3d2eefc8668f687831146947b31\" FOREIGN KEY (\"person_id\") REFERENCES \"person\" (\"person_id\") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT \"FK_06d08640b21137b4a4ac77fa9b1\" FOREIGN KEY (\"document_type_id\") REFERENCES \"document_type\" (\"document_type_id\") ON DELETE CASCADE ON UPDATE CASCADE)")];
                    case 22:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"temporary_person_document\"(\"person_document_id\", \"document_number\", \"dispatch_date\", \"issuing_agency\", \"person_name\", \"is_main\", \"person_id\", \"document_type_id\", \"createdAtCreated_at\") SELECT \"person_document_id\", \"document_number\", \"dispatch_date\", \"issuing_agency\", \"person_name\", \"is_main\", \"person_id\", \"document_type_id\", \"createdAtCreated_at\" FROM \"person_document\"")];
                    case 23:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"person_document\"")];
                    case 24:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"temporary_person_document\" RENAME TO \"person_document\"")];
                    case 25:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DefaultEntities1628190483700.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, queryRunner.query("ALTER TABLE \"person_document\" RENAME TO \"temporary_person_document\"")];
                    case 1:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"person_document\" (\"person_document_id\" varchar PRIMARY KEY NOT NULL, \"document_number\" varchar NOT NULL, \"dispatch_date\" date NOT NULL, \"issuing_agency\" varchar NOT NULL, \"person_name\" varchar NOT NULL, \"is_main\" boolean NOT NULL DEFAULT (0), \"person_id\" varchar, \"document_type_id\" varchar, \"createdAtCreated_at\" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT \"REL_06d08640b21137b4a4ac77fa9b\" UNIQUE (\"document_type_id\"))")];
                    case 2:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"person_document\"(\"person_document_id\", \"document_number\", \"dispatch_date\", \"issuing_agency\", \"person_name\", \"is_main\", \"person_id\", \"document_type_id\", \"createdAtCreated_at\") SELECT \"person_document_id\", \"document_number\", \"dispatch_date\", \"issuing_agency\", \"person_name\", \"is_main\", \"person_id\", \"document_type_id\", \"createdAtCreated_at\" FROM \"temporary_person_document\"")];
                    case 3:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_person_document\"")];
                    case 4:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"person_document_file\" RENAME TO \"temporary_person_document_file\"")];
                    case 5:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"person_document_file\" (\"person_document_file_id\" varchar PRIMARY KEY NOT NULL, \"person_document_id\" varchar NOT NULL, \"filename\" varchar NOT NULL, \"mimetype\" varchar NOT NULL)")];
                    case 6:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"person_document_file\"(\"person_document_file_id\", \"person_document_id\", \"filename\", \"mimetype\") SELECT \"person_document_file_id\", \"person_document_id\", \"filename\", \"mimetype\" FROM \"temporary_person_document_file\"")];
                    case 7:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_person_document_file\"")];
                    case 8:
                        _a.sent();
                        return [4, queryRunner.query("DROP INDEX \"IDX_7968479009dcf6ffc61af19ae2\"")];
                    case 9:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"person\" RENAME TO \"temporary_person\"")];
                    case 10:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"person\" (\"person_id\" varchar PRIMARY KEY NOT NULL, \"type\" varchar CHECK( type IN ('F','J','O','A') ) NOT NULL, \"cellphone\" varchar, \"telephone\" varchar, \"validated_at\" datetime, \"fantasy_name\" varchar, \"open_date\" date, \"end_date\" date, \"responsible_name\" varchar, \"birthday\" datetime, \"gender\" varchar CHECK( gender IN ('M','F','O') ), \"ethnicity\" varchar CHECK( ethnicity IN ('AFRODESCENDENTE','BRANCO','ASI\u00C1TICO','AMER\u00CDNDIO','MULATO','MULTIRRACIAL/PARDO','N\u00C3O DECLARADA') ) DEFAULT ('N\u00C3O DECLARADA'), \"mother_name\" varchar, \"father_name\" varchar, \"civil_status\" varchar CHECK( civil_status IN ('SOLTEIRO','UNI\u00C3O EST\u00C1VEL','CASADO','SEPARADO','DIVORCIADO','VI\u00DAVO') ), CONSTRAINT \"REL_403c951c5e9b776c16385a8940\" UNIQUE (\"person_id\"))")];
                    case 11:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"person\"(\"person_id\", \"type\", \"cellphone\", \"telephone\", \"validated_at\", \"fantasy_name\", \"open_date\", \"end_date\", \"responsible_name\", \"birthday\", \"gender\", \"ethnicity\", \"mother_name\", \"father_name\", \"civil_status\") SELECT \"person_id\", \"type\", \"cellphone\", \"telephone\", \"validated_at\", \"fantasy_name\", \"open_date\", \"end_date\", \"responsible_name\", \"birthday\", \"gender\", \"ethnicity\", \"mother_name\", \"father_name\", \"civil_status\" FROM \"temporary_person\"")];
                    case 12:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_person\"")];
                    case 13:
                        _a.sent();
                        return [4, queryRunner.query("CREATE INDEX \"IDX_7968479009dcf6ffc61af19ae2\" ON \"person\" (\"type\") ")];
                    case 14:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE \"user_token\" RENAME TO \"temporary_user_token\"")];
                    case 15:
                        _a.sent();
                        return [4, queryRunner.query("CREATE TABLE \"user_token\" (\"user_token_id\" varchar PRIMARY KEY NOT NULL, \"user_id\" varchar NOT NULL, \"token\" varchar NOT NULL, \"expires_at\" datetime NOT NULL, \"created_at\" datetime NOT NULL DEFAULT (datetime('now')))")];
                    case 16:
                        _a.sent();
                        return [4, queryRunner.query("INSERT INTO \"user_token\"(\"user_token_id\", \"user_id\", \"token\", \"expires_at\", \"created_at\") SELECT \"user_token_id\", \"user_id\", \"token\", \"expires_at\", \"created_at\" FROM \"temporary_user_token\"")];
                    case 17:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"temporary_user_token\"")];
                    case 18:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"person_document\"")];
                    case 19:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"person_document_file\"")];
                    case 20:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"document_type\"")];
                    case 21:
                        _a.sent();
                        return [4, queryRunner.query("DROP INDEX \"IDX_7968479009dcf6ffc61af19ae2\"")];
                    case 22:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"person\"")];
                    case 23:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"user\"")];
                    case 24:
                        _a.sent();
                        return [4, queryRunner.query("DROP TABLE \"user_token\"")];
                    case 25:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return DefaultEntities1628190483700;
}());
exports.DefaultEntities1628190483700 = DefaultEntities1628190483700;
