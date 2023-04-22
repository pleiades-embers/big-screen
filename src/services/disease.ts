import request from '@/utils/request';

//词云
export async function getWordsCloud() {
    return await request.get('/vital/screen/wordsCloud');
}
//传染病各国感染情况
export async function getCityRankByWord(query) {
    return await request.get(`/vital/screen/cityRankByWord?wordName=${query}`);
}

//传染病趋势图
export async function getRiseRank(params) {
    return await request.get(`/vital/screen/riseRank?wordName=${params.wordName}&timeType=${params.timeType}`);
}


