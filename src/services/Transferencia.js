import axios from "axios";

class Transferencia {
    constructor () {
        this.baseURL = process.env.REACT_APP_BACKEND_URL;
    }

    async getTransfers () {
        const res = await axios.get(this.baseURL + "/transferencia");
        return res;
    }

    async getTransfersByDate (startDate, endDate) {
        const params = {
            data_inicial: new Date(startDate).toISOString().replaceAll("T", " "),
            data_final: new Date(endDate).toISOString().replaceAll("T", " ")
        }
        const res = await axios.get(this.baseURL + "/transferencia", {
            params
        });
        return res;
    }

    async getTransfersByOperator (operatorName) {
        const params = {
            nome_operador: operatorName
        }
        const res = await axios.get(this.baseURL + "/transferencia", {
            params
        });
        return res;
    }

    async getTransfersByAllFilters (startDate, endDate, operatorName) {
        const params = {
            data_inicial: new Date(startDate).toISOString().replaceAll("T", " "),
            data_final: new Date(endDate).toISOString().replaceAll("T", " "),
            nome_operador: operatorName
        }
        const res = await axios.get(this.baseURL + "/transferencia", {
            params
        });
        return res;
    }
}

const transferencia = new Transferencia();

export default transferencia;