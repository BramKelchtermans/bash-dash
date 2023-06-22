class Controller {
    static successResponseData(res, data) {
        return res.status(200).json({
            status: 200,
            msg: 'success',
            data: data
        });
    }
    static errorResponseMsg(res, msg) {
        return res.status(500).json({
            "status": "server_error",
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