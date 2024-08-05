import { searchKeysValue } from '../../utils/filter'

/**
 * Controller
 */
class Controller {
  list = []
  lastId = 1
  
  constructor (uri) {
    this.uri = uri
  }

  index ({ keywordColumn=[]}) {
    return  {
      url: `/${this.uri}`,
      method: 'get',
      response: ({query}) => {
        const { keyword, page = 1, page_size: pageSize = 10 } = query
        const keywordFilter = keyword ? keywordColumn.reduce((item, current) => {item[current]=keyword;return item },{}) : null
        const allList = keyword ? searchKeysValue([...this.list], keywordFilter) : [...this.list]
        const pageList = allList.filter((item, index) => index < pageSize * page && index >= pageSize * (page - 1))
        return {
          code: 20000,
          data: {
            list: pageList,
            meta: {
              pagination: {
                total: allList.length,
                count: pageSize,
              },
            },
          },
        }
      },
    }
  }

  show () {
    return {
      url: `/${this.uri}/:id(\\d+)`,
      method: 'get',
      response: ({query}) => {
        const { id } = query
        const model = this.list.find(item => item.id === +id)
        return {
          code: 20000,
          data: model || null,
        }
      },
    }
  }

  store () {
    return {
      url: `/${this.uri}`,
      method: 'post',
      response: ({ body }) => {
        this.lastId += 1
        body.id = this.lastId
        this.list.push(body)
        return {
          code: 20000,
          data: body,
        }
      },
    }
  }

  update(){
    return {
      url: `/${this.uri}/:id(\\d+)`,
      method: 'patch',
      response: ({query,body}) => {
        const { id } = query
        const index = this.list.findIndex(x => x.id === +id)
        this.list.splice(index, 1, body)
        return {
          code: 20000,
          data: 'success',
        }
      },
    }
  }

  delete () {
    return {
      url: `/${this.uri}/:id(\\d+)`,
      method: 'delete',
      response: ({query}) => {
        const { id } = query
        const index = this.list.findIndex(x => x.id === +id)
        this.list.splice(index, 1)
        return {
          code: 20000,
          data: 'success',
        }
      },
    }
  }

  setList (list) {
    this.list = list
  }

  setLastId (lastId) {
    this.lastId = lastId
  }
}

export { Controller as default }
