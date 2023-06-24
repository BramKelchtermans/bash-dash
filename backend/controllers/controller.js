class Controller {
    static successResponseData(res, data) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        return res.status(200).json(data);
    }
    static errorResponseMsg(res, msg) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        return res.status(500).json({
            "msg": msg
        })
    }

    static paginateOptions(req, order = [['id', 'ASC']], where = {}) {
        let page = 1;
        try {
            page = parseInt(req.query.page);
        } catch (e) { }

        let perPage = 25;
        try {
            perPage = parseInt(req.query.page);
        } catch (e) {

        }

        return {
            page: page,
            paginate: perPage,
            where: where,
            order: order
        }
    }
}
export default Controller;