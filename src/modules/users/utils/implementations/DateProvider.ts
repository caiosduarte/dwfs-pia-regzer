import { min } from "date-fns";
import dayjs from "dayjs";
import utc from "dayjs/locale/plugin/utc";
import IDateProvider from "../IDateProvider";

//dayjs.extend(utc);

export default class DateProvider implements IDateProvider {
    addDays(days: number): Date {
        return dayjs().add(days, "days").toDate();
    }

    addMinutes(minutes: number): Date {
        return dayjs().add(minutes, "minutes").toDate();
    }
}
