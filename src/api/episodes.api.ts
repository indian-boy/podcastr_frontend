import { AxiosResponse } from 'axios'

import ApiSortOrder from '@enums/api/ApiSortOrder.enum'
import { EpisodeModel } from '@models/episode'
import apiService from '@shared/services/api.service'
import { RemoveEmptiesFromObject } from '@utils/helpers/RemoveEmptiesFromObject'

const resourcePath = 'episodes'

export async function getEpisodes(params: {
  _limit?: number
  _sort?: string
  _order?: ApiSortOrder
}): Promise<AxiosResponse<EpisodeModel[]>> {
  return apiService.get<Array<EpisodeModel>>(resourcePath, {
    params: { ...RemoveEmptiesFromObject(params) },
  })
}

export async function getEpisodeById(id: string): Promise<AxiosResponse<EpisodeModel>> {
  return apiService.get<EpisodeModel>(`${resourcePath}/${id}`)
}
