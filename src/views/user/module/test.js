import {ElMessageBox} from "element-plus";

const dialogCloseTip = (done) => {
        ElMessageBox.confirm('确认关闭?')
                .then(() => {
                        done()
                        fromInit()
                })
                .catch(() => {
                        // catch error
                })
}

export default dialogCloseTip