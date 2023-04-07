//under /interface? or /public?

interface Tag {
    name: string
}

const state = {
    Default: 'default',
    Done: 'done',
    Expire: 'expire',
    Periodical: 'periodical',
    Pending: 'pending'
} as const

type State = typeof state[keyof typeof state]

class Todo {
    //interface? or class?

    title:string
    text:string
    state: State
    expire_date: null|number
    tag?: Tag[] 

    constructor(title:string, text:string, state:State, expire_date:number|null, tag?:Tag[]){
        this.title = title
        this.text = text
        this.state = state
        this.expire_date = expire_date
        if(typeof tag !== undefined){
            this.tag = tag
        }

    }
}

export default Todo

