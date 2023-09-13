const config = require('../config.json')

module.exports = {
    name: 'utc',
    description: "utc command",
    execute(msg){

        function getTime(data, method){
            let currentdate = new Date(); 
            let jamlogsX;
            let jamlogs;
            let day = 0
            let datetime;
            if (method == 1){
                jamlogsX = currentdate.getHours() *1 + data
            } else if (method == 2){
                jamlogsX = currentdate.getHours() *1 - data
            }
            
            if (jamlogsX > 23){
                while(jamlogsX > 23){
                    jamlogsX = jamlogsX - 24
                    day += 1
                }
            } else if(jamlogsX < 0){
                while(jamlogsX < 0){
                    jamlogsX = jamlogsX + 24
                    day -= 1
                }
            }else {jamlogs = jamlogsX}
          menitlogs = currentdate.getMinutes()
          detiklogs = currentdate.getSeconds()
          jamlogs = ("0" + jamlogsX).slice(-2);
          menitlogs = ("0" + menitlogs).slice(-2);
          detiklogs = ("0" + detiklogs).slice(-2);
          if(day == 0){
            datetime = jamlogs+':'+menitlogs+':'+detiklogs
          }else if(day != 0){
            datetime = day + ' day   '+ jamlogs+':'+menitlogs+':'+detiklogs
          }
          
          return datetime
        }


        if(msg.content.includes('+')){
            let onlynum = msg.content.replace(config.prefix, '').replace('utc', '').replace('+', '').trim() * 1
            msg.reply(`${getTime(onlynum, 1)} UTC :nindy_yes:`)

        } else if(msg.content.includes('-')){
            let onlynum = msg.content.replace(config.prefix, '').replace('utc', '').replace('-', '').trim() * 1
            msg.reply(`${getTime(onlynum, 2)}  UTC  :nindy_yes:`)
        
        } else{
          msg.reply(`${getTime(0, 1)}  UTC  :nindy_yes:`)
        }


    
}}
