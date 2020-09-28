import request from '@/utils/request'

export function match() {
  return request({
    url: '/api-tupu/qc/match',
    method: 'get'
  })
}
