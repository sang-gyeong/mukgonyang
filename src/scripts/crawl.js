const axios = require('axios');
const cheerio = require('cheerio');

const getHTML = async sikdangCd => {
  const formData = new FormData();
  formData.append('sikdang_cd', sikdangCd);

  try {
    return await axios({
      method: 'POST',
      url: 'https://www.konyang.ac.kr/prog/sikdan/listDirect.do',
      data: formData,
    });
  } catch (err) {
    console.log(err);
  }
};

const parsing = async sikdangCd => {
  const html = await getHTML(sikdangCd);
  const $ = cheerio.load(html.data);
  const $days = $('table.basic_table > thead > tr > th');
  const $breakfasts = $('table.basic_table > tbody > tr:nth-child(1) > td');
  const $lunchs = $('table.basic_table > tbody > tr:nth-child(2) > td');
  const $dinners = $('table.basic_table > tbody > tr:nth-child(3) > td');

  let list = [];

  for (let i = 0; i < $days.length; i++) {
    const day = $($days[i]).text();
    const breakfast = $($breakfasts[i]).html();
    const lunch = $($lunchs[i]).html();
    const dinner = $($dinners[i]).html();

    list.push({
      day,
      breakfast,
      lunch,
      dinner,
    });
  }

  console.log(list);
};

parsing('03');

// 건양회관 01
// 죽헌정보관 03
