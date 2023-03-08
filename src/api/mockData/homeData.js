export default {
        getHomeData: () => {
                return {
                        //状态码,200代表请求成功
                        code: 200,
                        //数据对象
                        data: {
                                //目标数据
                                tableData: [
                                        {
                                                itemName: 'CONTRAPTION',
                                                todaySold: 9,
                                                monthSold: 233,
                                                totalSold: 1432,
                                        },
                                        {
                                                itemName: 'BROKEN MYTH',
                                                todaySold: 12,
                                                monthSold: 137,
                                                totalSold: 1631,
                                        },
                                        {
                                                itemName: 'BONESAW',
                                                todaySold: 10,
                                                monthSold: 169,
                                                totalSold: 1232,
                                        },
                                        {
                                                itemName: 'SORROWBLADE',
                                                todaySold: 24,
                                                monthSold: 189,
                                                totalSold: 2130,
                                        },
                                        {
                                                itemName: 'BREAKING POINT',
                                                todaySold: 18,
                                                monthSold: 167,
                                                totalSold: 1820,
                                        }
                                ],
                        }
                }
        },
        getSoldData: () => {
                return {
                
                }
        }
}