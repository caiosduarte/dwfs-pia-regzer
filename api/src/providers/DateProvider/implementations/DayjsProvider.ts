import { min } from "date-fns";
import dayjs from "dayjs";
import utc from "dayjs/locale/plugin/utc";
import IDateProvider from "../../../modules/users/providers/IDateProvider";

//dayjs.extend(utc);

export default class DayjsProvider implements IDateProvider {
    private static INSTANCE: DayjsProvider;
    private constructor() {}
    static getInstance(): DayjsProvider {
        if (!DayjsProvider.INSTANCE) {
            DayjsProvider.INSTANCE = new DayjsProvider();
        }
        return DayjsProvider.INSTANCE;
    }

    addDays(days: number): Date {
        return dayjs().add(days, "days").toDate();
    }

    addMinutes(minutes: number): Date {
        return dayjs().add(minutes, "minutes").toDate();
    }
}
