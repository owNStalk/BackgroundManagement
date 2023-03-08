//日期格式化
const dateFormat = (date) => {
        const getDate = new Date(date);
        const [year, month, day] = [getDate.getFullYear(),getDate.getMonth()+1,getDate.getDate()];
        //处理日期数据,如果为个位数需要加0
        function format(unit) {
                return (unit < 10) ? ('0' + unit) : unit
        }
        return year + '-' + format(month) + '-' + format(day);
}

export default dateFormat