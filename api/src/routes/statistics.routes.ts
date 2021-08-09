import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { getConnection } from "typeorm";
import { isDate, format } from "date-fns";
import User from "../entities/User";

const statisticsRouter = Router();

statisticsRouter.get("/", ensureAuthenticated, async (request, response) => {
    const { startDate: startDateQuery, finalDate: finalDateQuery } =
        request.query;

    let startDate = startDateQuery;
    let finalDate = finalDateQuery;

    if (!isDate(startDateQuery) || !isDate(startDateQuery)) {
        const today = new Date();
        finalDate = today.toISOString();
        today.setDate(today.getDate() - 30);
        startDate = today.toISOString();
    }

    const queryBuilder = getConnection().createQueryBuilder();

    const stats = await queryBuilder
        .select("COUNT(1) as new")
        .addSelect((subQuery) => {
            return subQuery
                .select("COUNT(1)")
                .from(User, "userValidate")
                .where("user.id = userValidate.id")
                .andWhere("userValidate.validatedAt IS NULL");
        }, "toValidate")
        .addSelect((subQuery) => {
            return subQuery
                .select("COUNT(1)")
                .from(User, "userConfirm")
                .where("user.id = userConfirm.id")
                .andWhere("userConfirm.validatedAt IS NOT NULL")
                .andWhere("userConfirm.confirmedAt IS NULL");
        }, "toConfirm")
        .from(User, "user")
        .where("user.createdAt between :startDate and :finalDate", {
            startDate,
            finalDate,
        })
        .getRawOne();

    return response.json(stats);
});

export default statisticsRouter;
