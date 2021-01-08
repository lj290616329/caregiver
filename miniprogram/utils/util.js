function fnTime(d){
  console.log(d);
  if(d==""||d==null){
		d = new Date();
	}
  if (typeof d === "string") {
    d = new Date(d.replace(/-/g, "/"));
  }
  console.log(d)
  
  let ptime = d.getTime();
  const twentyFourHours = 24 * 60 * 60 * 1000;
  const fortyEightHours = 24 * 60 * 60 * 1000 * 2;
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const today = `${year}-${month}-${day}`; 
  const todayTime = new Date(today).getTime();
  const yesterdayTime = new Date(todayTime - twentyFourHours).getTime();
  const lastYesterdayTime = new Date(todayTime - fortyEightHours).getTime();

  if( ptime >= todayTime ){
      return '今天';
  }
  else if( ptime < todayTime && yesterdayTime <= ptime ){
      return '昨天';
  }
  else if( ptime < yesterdayTime && lastYesterdayTime <= ptime ){
      return '前天';
  }
  else{
      return d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate();
  }
}
module.exports = {
  fnTime
}