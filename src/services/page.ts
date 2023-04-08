import request from '@/utils/request';

export async function postDetailRank() {
  return await request.post('/vital/screen/detail_rank');
}
